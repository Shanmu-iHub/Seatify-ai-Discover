export interface Institution {
  id: string;
  slug: string;
  name: string;
  type: "school" | "college";
  yearFounded: number;
  location: string;
  affiliation: string;
  accreditation: string;
  description: string;
  students: number;
  faculty: number;
  campusSize: string;
  facilities: string[];
  image: string;
  courses: Course[];
}

export interface Course {
  id: string;
  slug: string;
  courseName: string;
  duration: string;
  fees: string;
  eligibility: string;
  description: string;
  subjects: string[];
  careerOpportunities: string[];
  admissionProcess: string[];
  institutionId: string;
}

export const institutions: Institution[] = [
  {
    id: "1",
    slug: "abc-international-school",
    name: "ABC International School",
    type: "school",
    yearFounded: 2002,
    location: "Chennai, Tamil Nadu",
    affiliation: "CBSE",
    accreditation: "NAAC A+",
    description: "ABC International School is a premier educational institution offering world-class education with a focus on holistic development. Our state-of-the-art campus provides students with the best learning environment.",
    students: 2500,
    faculty: 180,
    campusSize: "25 Acres",
    facilities: ["Smart Classrooms", "Science Labs", "Sports Complex", "Library", "Auditorium"],
    image: "",
    courses: [],
  },
  {
    id: "2",
    slug: "delhi-public-school",
    name: "Delhi Public School",
    type: "school",
    yearFounded: 1995,
    location: "New Delhi, Delhi",
    affiliation: "CBSE",
    accreditation: "NAAC A",
    description: "Delhi Public School is one of India's most prestigious school chains, known for academic excellence and all-round student development.",
    students: 4200,
    faculty: 320,
    campusSize: "40 Acres",
    facilities: ["Olympic Pool", "Robotics Lab", "Performing Arts Center", "Library", "Playground"],
    image: "",
    courses: [],
  },
  {
    id: "3",
    slug: "greenfield-academy",
    name: "Greenfield Academy",
    type: "school",
    yearFounded: 2010,
    location: "Bangalore, Karnataka",
    affiliation: "ICSE",
    accreditation: "NAAC A",
    description: "Greenfield Academy focuses on experiential learning and creativity, blending technology with traditional education methods.",
    students: 1800,
    faculty: 140,
    campusSize: "18 Acres",
    facilities: ["Innovation Hub", "Art Studio", "Science Labs", "Sports Arena", "Cafeteria"],
    image: "",
    courses: [],
  },
  {
    id: "4",
    slug: "iit-tech-university",
    name: "IIT Tech University",
    type: "college",
    yearFounded: 1985,
    location: "Mumbai, Maharashtra",
    affiliation: "UGC",
    accreditation: "NAAC A++",
    description: "IIT Tech University is a leading institution for technology and engineering education, producing top industry professionals and researchers.",
    students: 8500,
    faculty: 600,
    campusSize: "120 Acres",
    facilities: ["Research Centers", "Innovation Lab", "Library", "Hostels", "Sports Complex", "Incubation Center"],
    image: "",
    courses: [],
  },
  {
    id: "5",
    slug: "national-engineering-college",
    name: "National Engineering College",
    type: "college",
    yearFounded: 1998,
    location: "Hyderabad, Telangana",
    affiliation: "AICTE",
    accreditation: "NAAC A+",
    description: "National Engineering College offers cutting-edge engineering programs with strong industry partnerships and placement records.",
    students: 5200,
    faculty: 380,
    campusSize: "75 Acres",
    facilities: ["Advanced Labs", "Workshop", "Digital Library", "Hostels", "Gym", "Cafeteria"],
    image: "",
    courses: [],
  },
  {
    id: "6",
    slug: "sunrise-college-arts",
    name: "Sunrise College of Arts & Science",
    type: "college",
    yearFounded: 2005,
    location: "Pune, Maharashtra",
    affiliation: "UGC",
    accreditation: "NAAC A",
    description: "Sunrise College offers diverse undergraduate and postgraduate programs in arts, science, and commerce with excellent faculty.",
    students: 3800,
    faculty: 250,
    campusSize: "50 Acres",
    facilities: ["Seminar Halls", "Computer Labs", "Library", "Hostels", "Cultural Center"],
    image: "",
    courses: [],
  },
];

const schoolCourses: Course[] = [
  { id: "c1", slug: "grade-1", courseName: "Grade 1", duration: "1 Year", fees: "₹80,000/year", eligibility: "Age 5-6 years", description: "Foundation year focusing on literacy, numeracy, and social skills through play-based learning.", subjects: ["English", "Mathematics", "EVS", "Hindi", "Art & Craft", "Physical Education"], careerOpportunities: [], admissionProcess: ["Online Application", "Age Verification", "Interaction Round", "Admission Confirmation"], institutionId: "1" },
  { id: "c2", slug: "grade-2", courseName: "Grade 2", duration: "1 Year", fees: "₹85,000/year", eligibility: "Completed Grade 1", description: "Building on foundational skills with introduction to structured learning and critical thinking.", subjects: ["English", "Mathematics", "EVS", "Hindi", "Computer Science", "Art"], careerOpportunities: [], admissionProcess: ["Online Application", "Previous Report Card", "Interaction Round"], institutionId: "1" },
  { id: "c3", slug: "grade-3", courseName: "Grade 3", duration: "1 Year", fees: "₹85,000/year", eligibility: "Completed Grade 2", description: "Expanding knowledge with introduction to science concepts and advanced language skills.", subjects: ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Computer Science"], careerOpportunities: [], admissionProcess: ["Online Application", "Previous Report Card", "Assessment Test"], institutionId: "1" },
  { id: "c4", slug: "grade-6", courseName: "Grade 6", duration: "1 Year", fees: "₹95,000/year", eligibility: "Completed Grade 5", description: "Middle school program introducing specialized subjects and project-based learning.", subjects: ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Sanskrit", "Computer Science", "Art"], careerOpportunities: [], admissionProcess: ["Online Application", "Entrance Test", "Interview"], institutionId: "1" },
  { id: "c5", slug: "grade-10", courseName: "Grade 10 (Board)", duration: "1 Year", fees: "₹1,10,000/year", eligibility: "Completed Grade 9", description: "CBSE Board examination year with comprehensive preparation across all subjects.", subjects: ["English", "Mathematics", "Science", "Social Science", "Hindi/Sanskrit", "IT"], careerOpportunities: ["Science Stream", "Commerce Stream", "Arts Stream"], admissionProcess: ["Direct Promotion from Grade 9"], institutionId: "1" },
  { id: "c6", slug: "grade-12-science", courseName: "Grade 12 – Science", duration: "1 Year", fees: "₹1,30,000/year", eligibility: "Completed Grade 11 Science", description: "Senior secondary CBSE Board year with specialization in Science stream for competitive exam preparation.", subjects: ["Physics", "Chemistry", "Mathematics/Biology", "English", "Computer Science/PE"], careerOpportunities: ["Engineering", "Medicine", "Research", "Data Science"], admissionProcess: ["Grade 11 Report Card", "Stream Allocation"], institutionId: "1" },
];

const collegeCourses: Course[] = [
  { id: "c7", slug: "btech-cse", courseName: "B.Tech Computer Science", duration: "4 Years", fees: "₹4,50,000/year", eligibility: "12th Science with PCM (60%+)", description: "Comprehensive computer science program covering algorithms, software engineering, AI, and system design.", subjects: ["Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks", "Machine Learning", "Web Development", "Cloud Computing"], careerOpportunities: ["Software Engineer", "Data Scientist", "Product Manager", "System Architect", "DevOps Engineer"], admissionProcess: ["JEE/Entrance Exam", "Counseling Round", "Document Verification", "Fee Payment"], institutionId: "4" },
  { id: "c8", slug: "btech-ai", courseName: "B.Tech AI & Machine Learning", duration: "4 Years", fees: "₹5,00,000/year", eligibility: "12th Science with PCM (65%+)", description: "Specialized program in artificial intelligence, deep learning, and intelligent systems.", subjects: ["AI Fundamentals", "Deep Learning", "NLP", "Computer Vision", "Reinforcement Learning", "Big Data", "Neural Networks", "Ethics in AI"], careerOpportunities: ["AI Engineer", "ML Engineer", "Research Scientist", "AI Product Manager", "Data Analyst"], admissionProcess: ["JEE/Entrance Exam", "Aptitude Test", "Interview", "Admission"], institutionId: "4" },
  { id: "c9", slug: "btech-iot", courseName: "B.Tech IoT", duration: "4 Years", fees: "₹4,20,000/year", eligibility: "12th Science with PCM (60%+)", description: "Program focused on Internet of Things, embedded systems, and connected device ecosystems.", subjects: ["Embedded Systems", "Sensor Networks", "Cloud IoT", "Edge Computing", "Wireless Communication", "IoT Security", "Robotics"], careerOpportunities: ["IoT Developer", "Embedded Engineer", "Solutions Architect", "Automation Engineer"], admissionProcess: ["Entrance Exam", "Counseling", "Document Verification", "Fee Payment"], institutionId: "4" },
  { id: "c10", slug: "mba-general", courseName: "MBA General Management", duration: "2 Years", fees: "₹6,00,000/year", eligibility: "Bachelor's Degree (55%+)", description: "Comprehensive MBA program with focus on leadership, strategy, and business management.", subjects: ["Marketing", "Finance", "HR Management", "Operations", "Business Strategy", "Entrepreneurship", "Business Analytics"], careerOpportunities: ["Business Analyst", "Consultant", "Product Manager", "Operations Manager", "Entrepreneur"], admissionProcess: ["CAT/MAT Score", "Group Discussion", "Personal Interview", "Admission"], institutionId: "5" },
  { id: "c11", slug: "bsc-data-science", courseName: "B.Sc Data Science", duration: "3 Years", fees: "₹2,50,000/year", eligibility: "12th with Mathematics (55%+)", description: "Undergraduate program covering statistics, programming, machine learning and data visualization.", subjects: ["Statistics", "Python", "R Programming", "Machine Learning", "Data Visualization", "SQL", "Big Data"], careerOpportunities: ["Data Analyst", "Business Intelligence Analyst", "Junior Data Scientist", "Analytics Consultant"], admissionProcess: ["Merit Based", "Entrance Test", "Document Verification"], institutionId: "6" },
  { id: "c12", slug: "bcom-honours", courseName: "B.Com Honours", duration: "3 Years", fees: "₹1,80,000/year", eligibility: "12th Commerce (50%+)", description: "Advanced commerce program with focus on accounting, taxation and business law.", subjects: ["Accounting", "Business Law", "Taxation", "Auditing", "Economics", "Business Statistics", "Corporate Law"], careerOpportunities: ["Chartered Accountant", "Tax Consultant", "Financial Analyst", "Auditor", "Banking Professional"], admissionProcess: ["Merit Based", "Document Verification", "Fee Payment"], institutionId: "6" },
];

// Assign courses to institutions
institutions[0].courses = schoolCourses.filter(c => c.institutionId === "1");
institutions[1].courses = schoolCourses.map(c => ({ ...c, id: `d${c.id}`, institutionId: "2" })).slice(0, 4);
institutions[2].courses = schoolCourses.map(c => ({ ...c, id: `g${c.id}`, institutionId: "3" })).slice(0, 5);
institutions[3].courses = collegeCourses.filter(c => c.institutionId === "4");
institutions[4].courses = [collegeCourses.find(c => c.institutionId === "5")!];
institutions[5].courses = collegeCourses.filter(c => c.institutionId === "6");

export const allCourses = [...schoolCourses, ...collegeCourses];

export const getInstitutionBySlug = (slug: string) => institutions.find(i => i.slug === slug);
export const getCourseBySlug = (slug: string) => allCourses.find(c => c.slug === slug);
export const getSchools = () => institutions.filter(i => i.type === "school");
export const getColleges = () => institutions.filter(i => i.type === "college");
