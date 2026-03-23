import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { RefreshCw, CheckCircle2, XCircle, Loader2, Clock, ChevronDown, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const isDev = import.meta.env.DEV;
const API_URL = import.meta.env.VITE_API_URL || (isDev ? "http://localhost:3001" : "");

export function SyncButton() {
    const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
    const [log, setLog] = useState<string[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [lastSync, setLastSync] = useState<string | null>(null);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const logRef = useRef<HTMLDivElement>(null);

    const stopPolling = () => {
        if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
        }
    };

    const startPolling = () => {
        stopPolling();
        pollRef.current = setInterval(async () => {
            try {
                const res = await fetch(`${API_URL}/api/sync-log`);
                const data = await res.json();
                setLog(data.log || []);
                if (data.lastSyncTime) setLastSync(data.lastSyncTime);
                if (!data.running) {
                    setStatus("done");
                    stopPolling();
                }
            } catch {
                setStatus("error");
                stopPolling();
            }
        }, 1000);
    };

    const handleSync = async () => {
        if (status === "running") return;
        setStatus("running");
        setLog([]);
        setExpanded(true);

        try {
            const res = await fetch(`${API_URL}/api/sync`, { method: "POST" });
            const data = await res.json();
            if (data.success) {
                startPolling();
            } else {
                setLog([data.message]);
                setStatus("error");
            }
        } catch {
            setLog(["❌ Cannot connect to the sync server. Run: npm run server"]);
            setStatus("error");
        }
    };

    // Auto-scroll log to bottom
    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [log]);

    useEffect(() => () => stopPolling(), []);

    const buttonConfig = {
        idle: {
            label: "Sync from Sheet",
            icon: <RefreshCw className="h-4 w-4" />,
            class: "bg-primary text-primary-foreground hover:bg-primary/90",
        },
        running: {
            label: "Syncing...",
            icon: <Loader2 className="h-4 w-4 animate-spin" />,
            class: "bg-amber-500 text-white cursor-not-allowed",
        },
        done: {
            label: "Sync Complete",
            icon: <CheckCircle2 className="h-4 w-4" />,
            class: "bg-green-600 text-white hover:bg-green-700",
        },
        error: {
            label: "Retry Sync",
            icon: <XCircle className="h-4 w-4" />,
            class: "bg-red-600 text-white hover:bg-red-700",
        },
    }[status];

    const getLineColor = (line: string) => {
        if (line.includes("✅") || line.includes("✓")) return "text-green-400";
        if (line.includes("✗") || line.includes("ERROR") || line.includes("Failed")) return "text-red-400";
        if (line.includes("▶") || line.includes("Working")) return "text-amber-400";
        if (line.includes("╔") || line.includes("╚") || line.includes("║")) return "text-blue-400";
        return "text-slate-300";
    };

    return (
        <div className="flex flex-col items-end gap-2">
            {/* Sync Button */}
            <div className="flex items-center gap-2">
                {lastSync && status === "done" && (
                    <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                        <Clock className="h-3 w-3" />
                        Last sync: {new Date(lastSync).toLocaleTimeString()}
                    </span>
                )}
                <motion.button
                    id="sync-button"
                    whileTap={{ scale: 0.95 }}
                    onClick={status === "running" ? undefined : handleSync}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-md transition-all duration-200 ${buttonConfig.class}`}
                >
                    {buttonConfig.icon}
                    {buttonConfig.label}
                </motion.button>
                {log.length > 0 && (
                    <button
                        onClick={() => setExpanded((e) => !e)}
                        className="rounded-lg border p-2 text-muted-foreground hover:bg-muted"
                    >
                        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                )}
            </div>

            {/* Live Log Panel Overlay */}
            {createPortal(
                <AnimatePresence>
                    {expanded && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl flex flex-col max-h-[90vh]"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900/50 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor] ${status === "running" ? "animate-pulse text-amber-400 bg-amber-400" : status === "done" ? "text-green-400 bg-green-400" : "text-red-400 bg-red-400"}`} />
                                        <div>
                                            <h3 className="font-semibold text-slate-200">Automation Agent v2.0</h3>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {status === "running" ? "Processing institutions live..." : status === "done" ? "Sync completed successfully" : "Agent failed or stopped"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-mono text-slate-500">{log.length} lines</span>
                                        <button
                                            onClick={() => setExpanded(false)}
                                            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Log terminal */}
                                <div
                                    ref={logRef}
                                    className="flex-1 overflow-y-auto p-5 font-mono text-[13px] leading-relaxed bg-[#0a0a0e] text-slate-300"
                                >
                                    {log.length === 0 && status === "running" && (
                                        <div className="text-slate-500 flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" /> Starting agent...
                                        </div>
                                    )}
                                    {log.map((line, i) => (
                                        <div key={i} className={`break-words ${getLineColor(line)}`}>
                                            {line}
                                        </div>
                                    ))}
                                    {status === "running" && log.length > 0 && (
                                        <div className="mt-3 flex items-center gap-2 text-slate-500 pb-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Working...</span>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                {status !== "running" && (
                                    <div className="border-t border-slate-800 bg-slate-900/50 p-4 flex justify-end">
                                        <button
                                            onClick={() => setExpanded(false)}
                                            className="bg-slate-800 text-slate-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition shadow-sm border border-slate-700"
                                        >
                                            Close Terminal
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
