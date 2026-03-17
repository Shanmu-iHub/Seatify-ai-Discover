import axios from "axios";
import * as cheerio from "cheerio";
import Groq from "groq-sdk";
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GSCRIPT_URL = process.env.GSCRIPT_URL;

const groq = new Groq({ apiKey: GROQ_API_KEY });

// ─── KEY DIRECTORY DOMAINS ────────────────────────────────────────────────────
const SCHOOL_DIRECTORIES = [
    "yellowslate.com",
    "edustoke.com",
    "nexschools.com",
    "schools.org.in",
    "schoolsearchlist.com",
    "allschoolscolleges.com",
];

const COLLEGE_DIRECTORIES = [
    "collegedunia.com",
    "shiksha.com",
    "careers360.com",
    "getmyuni.com",
    "collegedekho.com",
    "collegesearch.in",
    "zollege.in",
];

// ─── WEB SCRAPER ──────────────────────────────────────────────────────────────
async function scrapeUrl(url) {
    try {
        const resp = await axios.get(url, {
            timeout: 10000,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });
        const $ = cheerio.load(resp.data);

        // Remove clutter
        $("script, style, nav, footer, header, iframe, img, svg, noscript").remove();

        // Extract meaningful text
        const text = $("body").text().replace(/\s+/g, " ").trim();
        return text.slice(0, 4000); // more per source for richer data
    } catch {
        return null;
    }
}

// Build slug from name (e.g., "SNS Academy" -> "sns-academy")
function toSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Try multiple URL patterns for each directory to find the detail page
function buildDirectUrls(name, domain, type, location) {
    const slug = toSlug(name);
    const urls = [];

    if (domain === "yellowslate.com") {
        // If location is provided, try that city first
        const cities = ["coimbatore", "chennai", "bangalore", "mumbai", "delhi", "hyderabad", "pune", "kolkata"];
        if (location) {
            const city = location.split(",")[0].trim().toLowerCase();
            if (!cities.includes(city)) cities.unshift(city);
        }
        for (const city of cities) {
            urls.push(`https://yellowslate.com/${type}/${city}/${slug}`);
            urls.push(`https://yellowslate.com/${type}/${city}/${slug}-${city}`);
        }
    } else if (domain === "edustoke.com") {
        urls.push(`https://www.edustoke.com/school/${slug}`);
    } else if (domain === "collegedunia.com") {
        urls.push(`https://collegedunia.com/${slug}`);
    } else if (domain === "shiksha.com") {
        urls.push(`https://www.shiksha.com/college/${slug}`);
    } else if (domain === "careers360.com") {
        urls.push(`https://www.careers360.com/colleges/${slug}`);
    }

    return urls;
}

// Find the actual detail page URL for a site using site: search as fallback
async function findDetailUrl(institutionName, siteDomain) {
    try {
        const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent("site:" + siteDomain + " " + institutionName)}`;
        const resp = await axios.get(searchUrl, {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 10000
        });
        const $ = cheerio.load(resp.data);

        // Find the first result link from this specific domain
        let link = "";
        $(".result__url").each((i, el) => {
            const urlText = $(el).text().trim();
            if (urlText.includes(siteDomain)) {
                link = urlText.startsWith("http") ? urlText : "https://" + urlText;
                return false; // break
            }
        });

        if (!link) {
            $(".result__a").each((i, el) => {
                const href = $(el).attr("href");
                if (href && href.includes(siteDomain)) {
                    // DuckDuckGo sometimes encodes URLs as /l/?kh=-1&uddg=URL
                    if (href.includes("uddg=")) {
                        link = decodeURIComponent(href.split("uddg=")[1].split("&")[0]);
                    } else {
                        link = href;
                    }
                    return false; // break
                }
            });
        }
        return link;
    } catch {
        return null;
    }
}

async function gatherRawData(name, type, location) {
    const directories = type === "school" ? SCHOOL_DIRECTORIES : COLLEGE_DIRECTORIES;
    const chunks = [];

    console.log(`  → Smart-searching ${directories.length} directory sites + official website...`);

    // 1. General DuckDuckGo search for broad context (includes founding year, fees, etc.)
    const searchTerm = location ? `${name} ${location}` : name;
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchTerm + " " + (type === "school" ? "school courses fees admission founded year" : "college courses fees eligibility founded year"))}`;
    const ddgText = await scrapeUrl(ddgUrl);
    if (ddgText) {
        chunks.push(`[DuckDuckGo General Results]\n${ddgText}`);
        console.log("    ✓ General search results fetched");
    }

    // 2. For each directory, try direct URLs then site-specific search
    for (const domain of directories) {
        let text = null;
        let urlUsed = null;

        // Pattern 1: Direct URLs
        const urls = buildDirectUrls(name, domain, type, location);
        for (const url of urls) {
            text = await scrapeUrl(url);
            if (text && text.length > 500) {
                urlUsed = url;
                break;
            }
        }

        // Pattern 2: Search specific site
        if (!urlUsed) {
            const dynamicUrl = await findDetailUrl(searchTerm, domain);
            if (dynamicUrl) {
                text = await scrapeUrl(dynamicUrl);
                if (text && text.length > 500) {
                    urlUsed = dynamicUrl;
                }
            }
        }

        // Pattern 3: Simple search page fallback
        if (!urlUsed) {
            let searchUrl = "";
            if (domain === "yellowslate.com") searchUrl = `https://yellowslate.com/search?q=${encodeURIComponent(searchTerm)}`;
            else if (domain === "edustoke.com") searchUrl = `https://www.edustoke.com/search?q=${encodeURIComponent(searchTerm)}`;
            else if (domain === "collegedunia.com") searchUrl = `https://collegedunia.com/search?query=${encodeURIComponent(searchTerm)}`;
            // ... add more if needed

            if (searchUrl) {
                text = await scrapeUrl(searchUrl);
                if (text && text.length > 500) {
                    urlUsed = searchUrl;
                }
            }
        }

        if (urlUsed && text) {
            chunks.push(`[${domain} - ${urlUsed}]\n${text}`);
            console.log(`    ✓ ${domain} (captured: ${urlUsed.slice(0, 50)}...)`);
        } else {
            console.log(`    - ${domain} (no data found)`);
        }
    }

    // 3. Find and scrape the official website
    console.log(`  → Searching for official website...`);
    const officialSearchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchTerm + " official website")}`;
    try {
        const resp = await axios.get(officialSearchUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
        const $ = cheerio.load(resp.data);
        const firstLink = $(".result__url").first().text().trim();
        if (firstLink) {
            const officialUrl = firstLink.startsWith("http") ? firstLink : `https://${firstLink}`;
            const isDirSite = [...SCHOOL_DIRECTORIES, ...COLLEGE_DIRECTORIES].some(d => officialUrl.includes(d));
            if (!isDirSite) {
                console.log(`  → Scraping official site: ${officialUrl}`);
                const officialText = await scrapeUrl(officialUrl);
                if (officialText) {
                    chunks.push(`[OFFICIAL WEBSITE: ${officialUrl}]\n${officialText}`);
                    console.log(`    ✓ Official website scraped`);
                }
            }
        }
    } catch (e) {
        console.log("    ✗ Failed to search for official website");
    }

    console.log(`  → Total data collected from ${chunks.length} sources`);
    return chunks.join("\n\n---\n\n").slice(0, 18000);
}

// ─── GROQ: Extract structured JSON from scraped data ─────────────────────────
async function researchInstitution(name, location, rawData, requestedType) {
    const systemPrompt = `You are an expert Education Data Extraction AI.
You receive scraped text for "${name}" located in "${location || 'India'}".
THIS INSTITUTION IS A ${requestedType.toUpperCase()}. 

CRITICAL RULES FOR TYPE:
- If type is "school": You MUST ONLY list school grade levels (Nursery to 12th). NEVER include B.E, B.Tech, MBA, or degree programs.
- If type is "school": Do NOT include NAAC accreditation unless it's a very rare exception. Schools usually have CBSE/ICSE affiliation instead.
- If type is "college": You MUST ONLY list degree programs (Undergraduate/Postgraduate).

JSON structure:
{
  "institution": {
    "name": "Full official name",
    "type": "${requestedType}",
    "yearFounded": 2014,
    "affiliation": "CBSE / Anna University / ICSE",
    "accreditation": "None / ISO / etc.",
    "description": "2-3 sentence description",
    "city": "City name",
    "state": "State name",
    "country": "India",
    "fullAddress": "Complete street address",
    "phone": "Phone number",
    "email": "Email address",
    "website": "Official website URL",
    "totalStudents": 2500,
    "totalFaculty": 120,
    "campusSize": "15 Acres",
    "facilities": ["List of facilities"]
  },
  "courses": [
    {
      "courseName": "Course name",
      "description": "Description",
      "duration": "Duration",
      "eligibility": "Eligibility",
      "fees": "Fees info",
      "subjects": ["List"],
      "careerOpportunities": ["List"],
      "department": "Dept",
      "entranceExam": "Exam info"
    }
  ]
}

CRITICAL RULES:
- ALL FIELDS MUST HAVE REAL VALUES. Never use "N/A", "Unknown", or "Not available".
- For yearFounded: Use factual accuracy. (e.g. SNS Academy in Coimbatore was founded in 2014).
- For COURSES (CRITICAL): Never return an empty array.
  * For SCHOOLS: List Grade Levels: "Nursery", "Kindergarten (LKG & UKG)", "Primary School (Grade 1-5)", "Middle School (Grade 6-8)", "Secondary School (Grade 9-10)", "Higher Secondary School (Grade 11-12)".
  * For COLLEGES: List Degree Programs ONLY.
- Use your training knowledge to provide correct factual information.`;

    const userPrompt = rawData
        ? `Extract information about "${name}" (${requestedType}) in "${location}":\n\n${rawData}`
        : `Provide factual details for "${name}" (${requestedType}) in "${location}". List real courses/grades and contact info.`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.2,
            max_tokens: 8000,
        });

        let text = chatCompletion.choices[0]?.message?.content || "";
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            return JSON.parse(text);
        } catch {
            const match = text.match(/\{[\s\S]*\}/);
            if (match) return JSON.parse(match[0]);
        }
        return null;
    } catch (error) {
        console.error(`  ✗ Groq error for "${name}":`, error.message);
        return null;
    }
}

// ─── Check if already processed ────────────────────────────────────────────
function isAlreadyInDB(name) {
    const mockDataPath = path.resolve("./src/data/mockData.json");
    if (!fs.existsSync(mockDataPath)) return false;
    const currentData = JSON.parse(fs.readFileSync(mockDataPath, "utf-8"));
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    return currentData.institutions.some(i => i.slug === slug);
}

// ─── Remove deleted institutions ──────────────────────────────────────────────
function syncDeletions(activeSlugs) {
    console.log("\n🗑️  Checking for deletions...");
    const mockDataPath = path.resolve("./src/data/mockData.json");
    if (!fs.existsSync(mockDataPath)) return;

    let currentData = JSON.parse(fs.readFileSync(mockDataPath, "utf-8"));
    const initialCount = currentData.institutions.length;

    // Keep only institutions whose slug is present in the sheet
    currentData.institutions = currentData.institutions.filter(inst => activeSlugs.has(inst.slug));

    const deletedCount = initialCount - currentData.institutions.length;
    if (deletedCount > 0) {
        fs.writeFileSync(mockDataPath, JSON.stringify(currentData, null, 2));
        console.log(`   ✓ Removed ${deletedCount} institution(s) from website that were deleted in sheet.`);
    } else {
        console.log(`   ✓ No deletions needed.`);
    }
}

// ─── Save institution to mockData.json (UPSERT: update if exists, add if new) ─────────
async function updateMockData(newData, forcedType) {
    const mockDataPath = path.resolve("./src/data/mockData.json");
    let currentData = { institutions: [] };
    if (fs.existsSync(mockDataPath)) {
        currentData = JSON.parse(fs.readFileSync(mockDataPath, "utf-8"));
    }

    const type = forcedType || (newData.institution.type?.toLowerCase?.() === "school" ? "school" : "college");
    const slug = newData.institution.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

    // Check if exists — if so, update in-place
    const existingIndex = currentData.institutions.findIndex(i => i.slug === slug);
    const existingId = existingIndex >= 0 ? currentData.institutions[existingIndex].id : String(currentData.institutions.length + 1);
    const isUpdate = existingIndex >= 0;

    const inst = newData.institution;
    const city = inst.city || "";
    const state = inst.state || "";
    const location = [city, state].filter(Boolean).join(", ") || inst.fullAddress || "India";

    const institution = {
        id: existingId,
        slug,
        name: inst.name || newData.institution.name,
        type,
        yearFounded: inst.yearFounded || 2000,
        location,
        affiliation: inst.affiliation || "Affiliated",
        accreditation: inst.accreditation || "Accredited",
        description: inst.description || `${inst.name} is an educational institution located in ${location}.`,
        students: inst.totalStudents || inst.students || 500,
        faculty: inst.totalFaculty || inst.faculty || 30,
        campusSize: inst.campusSize || "5 Acres",
        phone: inst.phone || "",
        email: inst.email || "",
        website: inst.website || "",
        fullAddress: inst.fullAddress || location,
        facilities: Array.isArray(inst.facilities) && inst.facilities.length > 0
            ? inst.facilities
            : ["Library", "Computer Lab", "Playground"],
        image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop",
        courses: (newData.courses || []).map((c, idx) => ({
            id: `c-${existingId}-${idx + 1}`,
            slug: c.courseName.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
            courseName: c.courseName,
            duration: c.duration || "N/A",
            fees: c.fees || "Contact Institution",
            eligibility: c.eligibility || "N/A",
            description: c.description || "",
            subjects: Array.isArray(c.subjects) ? c.subjects : [],
            careerOpportunities: Array.isArray(c.careerOpportunities) ? c.careerOpportunities : [],
            admissionProcess: ["Online Application", "Document Verification", "Counseling"],
            institutionId: existingId,
        })),
    };

    if (isUpdate) {
        currentData.institutions[existingIndex] = institution;
        console.log(`  → 🔄 UPDATED: ${institution.name} (${institution.courses.length} courses, ${institution.students} students, ${institution.faculty} faculty) ✓`);
    } else {
        currentData.institutions.push(institution);
        console.log(`  → ➕ ADDED: ${institution.name} (${institution.courses.length} courses, ${institution.students} students, ${institution.faculty} faculty) ✓`);
    }

    fs.writeFileSync(mockDataPath, JSON.stringify(currentData, null, 2));
}

// ─── Save to Master Excel ─────────────────────────────────────────────────────
async function generateExcelReport(newData) {
    const masterFile = "Master_Content.xlsx";
    const workbook = new ExcelJS.Workbook();
    if (fs.existsSync(masterFile)) await workbook.xlsx.readFile(masterFile);

    const sheetTitle = newData.institution.name.slice(0, 30);
    const existingSheet = workbook.getWorksheet(sheetTitle);
    if (existingSheet) workbook.removeWorksheet(existingSheet.id);

    const sheet = workbook.addWorksheet(sheetTitle);
    sheet.addRow(["Institution Info", ""]);
    sheet.addRow(["Name", newData.institution.name]);
    sheet.addRow(["Type", newData.institution.type]);
    sheet.addRow(["Founded", newData.institution.yearFounded]);
    sheet.addRow(["Affiliation", newData.institution.affiliation]);
    sheet.addRow(["Accreditation", newData.institution.accreditation]);
    sheet.addRow(["City", newData.institution.city]);
    sheet.addRow(["State", newData.institution.state]);
    sheet.addRow(["Phone", newData.institution.phone]);
    sheet.addRow(["Email", newData.institution.email]);
    sheet.addRow(["Website", newData.institution.website]);
    sheet.addRow([]);

    const header = sheet.addRow(["Course", "Duration", "Fees", "Eligibility", "Department", "Subjects", "Career Opportunities", "Description"]);
    header.eachCell(cell => {
        cell.font = { bold: true };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF4472C4" } };
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    });
    sheet.columns = [
        { key: 0, width: 30 }, { key: 1, width: 12 }, { key: 2, width: 18 },
        { key: 3, width: 28 }, { key: 4, width: 20 }, { key: 5, width: 40 },
        { key: 6, width: 40 }, { key: 7, width: 50 },
    ];

    (newData.courses || []).forEach(c =>
        sheet.addRow([
            c.courseName,
            c.duration,
            c.fees,
            c.eligibility,
            c.department || "",
            (c.subjects || []).join(", "),
            (c.careerOpportunities || []).join(", "),
            c.description,
        ])
    );

    await workbook.xlsx.writeFile(masterFile);
    console.log(`  → Master_Content.xlsx updated ✓`);
}

// ─── Update status via Apps Script ───────────────────────────────────────────
async function updateStatus(sheetName, name, status) {
    if (!GSCRIPT_URL) return;
    try {
        await axios.get(GSCRIPT_URL, { params: { sheet: sheetName, name, status } });
    } catch { /* optional */ }
}

// ─── Read Google Sheet tab ────────────────────────────────────────────────────
async function getSheetData(sheetName) {
    const url = `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(sheetName)}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching sheet "${sheetName}":`, error.message);
        return [];
    }
}

// ─── Process one institution ──────────────────────────────────────────────────
async function processInstitution(name, location, type, sheetName) {
    console.log(`\n▶ ${type.toUpperCase()}: ${name} (${location || 'Unknown Location'})`);

    // Step 1: Scrape from directories
    const rawData = await gatherRawData(name, type, location);
    const sourceCount = (rawData.match(/\[.*?\]/g) || []).length;
    console.log(`  → Collected data from ${sourceCount} sources`);

    // Step 2: Let Groq structure it
    console.log("  → Sending to Groq AI for extraction...");
    const structured = await researchInstitution(name, location, rawData, type);

    if (structured) {
        structured.institution.type = type;
        await updateMockData(structured, type);
        await generateExcelReport(structured);
        await updateStatus(sheetName, name, "Completed");
        console.log(`  ✅ Done: ${name}`);
    } else {
        console.log(`  ✗ Failed to extract data for: ${name}`);
        await updateStatus(sheetName, name, "Failed");
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
    console.log("\n╔══════════════════════════════════════════════════╗");
    console.log("║  🤖 Seatify Automation Agent v2.0                ║");
    console.log("║  Powered by Groq + Multi-Source Scraper           ║");
    console.log("║  Mode: FULL DYNAMIC SYNC (all entries)            ║");
    console.log("╚══════════════════════════════════════════════════╝\n");

    const activeSlugs = new Set();

    // ── Process Schools ──
    console.log("📚 Checking Schools tab...");
    const schools = await getSheetData("Schools");

    const schoolNameKey = schools.length > 0
        ? Object.keys(schools[0]).find(k => k.toLowerCase().includes("school") || k.toLowerCase().includes("name")) || Object.keys(schools[0])[0]
        : "School Name";

    const schoolLocationKey = schools.length > 0
        ? Object.keys(schools[0]).find(k => k.toLowerCase().includes("location")) || "Location"
        : "Location";

    const allSchools = schools.filter(r => r[schoolNameKey]?.trim());

    // Record active slugs
    for (const row of allSchools) {
        const slug = row[schoolNameKey].trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
        activeSlugs.add(slug);
    }

    console.log(`   Total in sheet: ${allSchools.length} school(s) — ALL will be scraped & updated`);

    for (const row of allSchools) {
        await processInstitution(row[schoolNameKey].trim(), row[schoolLocationKey]?.trim(), "school", "Schools");
    }

    // ── Process Colleges ──
    console.log("\n🏫 Checking Colleges tab...");
    const colleges = await getSheetData("Colleges");

    const collegeNameKey = colleges.length > 0
        ? Object.keys(colleges[0]).find(k => k.toLowerCase().includes("college") || k.toLowerCase().includes("name")) || Object.keys(colleges[0])[0]
        : "College Name";

    const collegeLocationKey = colleges.length > 0
        ? Object.keys(colleges[0]).find(k => k.toLowerCase().includes("location")) || "Location"
        : "Location";

    const allColleges = colleges.filter(r => r[collegeNameKey]?.trim());

    // Record active slugs
    for (const row of allColleges) {
        const slug = row[collegeNameKey].trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
        activeSlugs.add(slug);
    }

    console.log(`   Total in sheet: ${allColleges.length} college(s) — ALL will be scraped & updated`);

    for (const row of allColleges) {
        await processInstitution(row[collegeNameKey].trim(), row[collegeLocationKey]?.trim(), "college", "Colleges");
    }

    // ── Synchronize Deletions ──
    syncDeletions(activeSlugs);

    console.log("\n╔══════════════════════════════════════════════════╗");
    console.log("║  ✅ Automation Complete!                          ║");
    console.log("╚══════════════════════════════════════════════════╝\n");
}

run();

