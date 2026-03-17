import { HeroSection } from "@/components/HeroSection";
import { InstitutionCard } from "@/components/InstitutionCard";
import { getSchools, getColleges, allCourses } from "@/data/mockData";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="bg-background">
      <HeroSection />

      {/* Institutions Section */}
      <section className="container section-padding">
        <Tabs defaultValue="schools" className="w-full">
          <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Explore Institutions</h2>
              <p className="mt-2 text-base text-muted-foreground opacity-80">Discover top-rated schools and colleges curated by our advanced AI system.</p>
            </div>
            <TabsList className="h-12 w-full max-w-[320px] gap-1 rounded-xl bg-muted p-1">
              <TabsTrigger value="schools" className="flex-1 rounded-lg py-2 text-xs font-bold transition-all">Schools</TabsTrigger>
              <TabsTrigger value="colleges" className="flex-1 rounded-lg py-2 text-xs font-bold transition-all">Colleges</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="schools" className="mt-0 outline-none">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {schools.map((s, i) => (
                <InstitutionCard key={s.id} institution={s} index={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="colleges" className="mt-0 outline-none">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {colleges.map((c, i) => (
                <InstitutionCard key={c.id} institution={c} index={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Top Courses */}
      <section className="relative overflow-hidden border-y bg-muted/10">
        <div className="container section-padding">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Top Programs</h2>
            <p className="mt-2 text-base text-muted-foreground opacity-80">Highly sought-after courses across our network of institutions.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topCourses.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl border bg-card p-5 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1.5 font-bold text-base leading-snug group-hover:text-primary transition-colors">{c.courseName}</h3>
                <p className="text-xs font-medium text-muted-foreground">{c.duration} · {c.fees}</p>
                <div className="mt-4 h-0.5 w-8 rounded-full bg-primary/20 transition-all group-hover:w-full group-hover:bg-primary" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container section-padding">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">The Seatify AI Experience</h2>
          <p className="mt-2 text-base text-muted-foreground opacity-80">Our intelligent system automates data collection for maximum accuracy.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group relative text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary/70">Step 0{i + 1}</div>
              <h3 className="mb-2 text-base font-bold tracking-tight">{step.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
