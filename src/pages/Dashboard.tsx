import { getSchools, getColleges, allCourses, institutions } from "@/data/mockData";
import { Link } from "react-router-dom";
import { School, GraduationCap, BookOpen, Plus, Activity, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SyncButton } from "@/components/SyncButton";

const Dashboard = () => {
  const schools = getSchools();
  const colleges = getColleges();

  const stats = [
    { icon: School, label: "Total Schools", value: schools.length, color: "text-primary" },
    { icon: GraduationCap, label: "Total Colleges", value: colleges.length, color: "text-primary" },
    { icon: BookOpen, label: "Total Courses", value: allCourses.length, color: "text-primary" },
  ];

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your Seatify AI platform</p>
        </div>
        <Button className="gradient-primary border-0 text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> Add Institution
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <s.icon className={`mb-3 h-6 w-6 ${s.color}`} />
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <s.icon className="h-6 w-6 text-primary opacity-50" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Automation Control */}
      <div className="mb-12 rounded-xl border bg-gradient-to-br from-card to-accent/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Activity className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Automation Agent v2.0</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Synchronize school and college data from your Google Sheet and 17+ directory websites using Groq AI.
            </p>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <SyncButton />
        </div>
      </div>

      {/* Recent Institutions */}
      <h2 className="mb-4 text-xl font-semibold">Recent Institutions</h2>
      <div className="rounded-xl border bg-card">
        {institutions.map((inst, i) => (
          <Link
            key={inst.id}
            to={`/institution/${inst.slug}`}
            className={`flex items-center justify-between p-4 transition-colors hover:bg-accent/50 ${i < institutions.length - 1 ? "border-b" : ""
              }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                {inst.type === "school" ? (
                  <School className="h-5 w-5 text-accent-foreground" />
                ) : (
                  <GraduationCap className="h-5 w-5 text-accent-foreground" />
                )}
              </div>
              <div>
                <div className="font-medium">{inst.name}</div>
                <div className="text-sm text-muted-foreground">{inst.location} · {inst.courses.length} courses</div>
              </div>
            </div>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground capitalize">{inst.type}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
