import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let agentRunning = false;
let lastSyncLog = [];
let lastSyncTime = null;

// ─── GET status ──────────────────────────────────────────────────────────────
app.get("/api/status", (req, res) => {
    res.json({
        running: agentRunning,
        lastSyncTime,
        lastSyncLog,
    });
});

// ─── POST /api/sync  ── Trigger the agent ───────────────────────────────────
app.post("/api/sync", (req, res) => {
    if (agentRunning) {
        return res.json({ success: false, message: "Agent is already running..." });
    }

    agentRunning = true;
    lastSyncLog = [];
    lastSyncTime = new Date().toISOString();

    res.json({ success: true, message: "Sync started!" });

    console.log("[Server] Starting automation agent...");

    const agent = spawn("node", [path.join(__dirname, "automation-agent.js")], {
        cwd: path.join(__dirname, ".."),
        env: process.env,
    });

    agent.stdout.on("data", (data) => {
        const lines = data.toString().split("\n").filter((l) => l.trim());
        lines.forEach((line) => {
            lastSyncLog.push(line);
            console.log(`[Agent] ${line}`);
        });
    });

    agent.stderr.on("data", (data) => {
        const line = `ERROR: ${data.toString().trim()}`;
        lastSyncLog.push(line);
        console.error(`[Agent] ${line}`);
    });

    agent.on("close", (code) => {
        agentRunning = false;
        const done = `\n✅ Agent finished with exit code ${code}`;
        lastSyncLog.push(done);
        console.log(`[Server] Agent exited with code ${code}`);
    });
});

// ─── GET /api/sync-log  ── Polling endpoint for live logs ───────────────────
app.get("/api/sync-log", (req, res) => {
    res.json({
        running: agentRunning,
        log: lastSyncLog,
        lastSyncTime,
    });
});

// Serve frontend in production
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

const serverPort = process.env.PORT || PORT;

app.listen(serverPort, () => {
    console.log(`\n🚀 Seatify API Server running at http://localhost:${serverPort}`);
    console.log(`   POST /api/sync  → Trigger agent`);
    console.log(`   GET  /api/sync-log → Live logs\n`);
});
