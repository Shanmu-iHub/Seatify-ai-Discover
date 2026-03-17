import { HeroSection } from "@/components/HeroSection";
import { InstitutionCard } from "@/components/InstitutionCard";
import { getSchools, getColleges, allCourses } from "@/data/mockData";
import { motion } from "framer-motion";
import { Zap, Database, BookOpen, Globe } from "lucide-react";

const steps = [
  { icon: Zap, title: "Add Institution", desc: "Register any school or college on the platform" },
  { icon: Database, title: "AI Collects Data", desc: "Our AI gathers and organizes institution data" },
  { icon: BookOpen, title: "Courses Generated", desc: "Courses and details are automatically created" },
  { icon: Globe, title: "Pages Created", desc: "Beautiful pages go live automatically" },
];

const Index = () => {
  const schools = getSchools();
  const colleges = getColleges();
  const topCourses = allCourses.slice(0, 4);

  return (
    <div>
      <HeroSection />

      {/* Featured Schools */}
      <section className="container py-20">
        <h2 className="mb-2 text-2xl font-bold">Featured Schools</h2>
        <p className="mb-8 text-muted-foreground">Top schools curated by our AI</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((s, i) => (
            <InstitutionCard key={s.id} institution={s} index={i} />
          ))}
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="container pb-20">
        <h2 className="mb-2 text-2xl font-bold">Featured Colleges</h2>
        <p className="mb-8 text-muted-foreground">Leading colleges at your fingertips</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colleges.map((c, i) => (
            <InstitutionCard key={c.id} institution={c} index={i} />
          ))}
        </div>
      </section>

      {/* Top Courses */}
      <section className="border-t bg-muted/30">
        <div className="container py-20">
          <h2 className="mb-2 text-2xl font-bold">Top Courses</h2>
          <p className="mb-8 text-muted-foreground">Popular courses across all institutions</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topCourses.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border bg-card p-5"
              >
                <h3 className="mb-1 font-semibold">{c.courseName}</h3>
                <p className="text-sm text-muted-foreground">{c.duration} · {c.fees}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20">
        <h2 className="mb-2 text-center text-2xl font-bold">How Seatify AI Works</h2>
        <p className="mb-12 text-center text-muted-foreground">Four simple steps to educational discovery</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                <step.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="mb-1 text-xs font-semibold text-primary">Step {i + 1}</div>
              <h3 className="mb-1 font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
