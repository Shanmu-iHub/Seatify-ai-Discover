import { useParams, Link } from "react-router-dom";
import { getCourseBySlug, institutions } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, IndianRupee, CheckCircle, Briefcase, BookOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";

const CourseDetail = () => {
  const { slug } = useParams();
  const course = getCourseBySlug(slug || "");
  const institution = course ? institutions.find(i => i.courses.some(c => c.slug === course.slug)) : null;

  if (!course) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-black">Course not found</h1>
        <Button asChild variant="link" className="mt-4 text-primary">
          <Link to="/schools">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to institutions
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container max-w-5xl py-12 lg:py-20">
        {institution && (
          <Link
            to={`/institution/${institution.slug}`}
            className="group mb-12 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </div>
            Back to {institution.name}
          </Link>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                Program Detail
              </div>
              <h1 className="mb-6 text-3xl font-extrabold md:text-4xl lg:text-5xl tracking-tight leading-tight">
                {course.courseName}
              </h1>

              {/* Enhanced Overview Cards */}
              <div className="mb-10 grid gap-5 sm:grid-cols-3">
                {[
                  { icon: Clock, label: "Duration", val: course.duration },
                  { icon: IndianRupee, label: "Program Fees", val: course.fees },
                  { icon: CheckCircle, label: "Eligibility", val: course.eligibility },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border bg-card p-5 shadow-sm ring-1 ring-border/50 transition-all hover:shadow-md">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-1">{item.label}</div>
                    <div className="text-sm font-bold tracking-tight">{item.val}</div>
                  </div>
                ))}
              </div>

              {/* Detailed Content regions */}
              <div className="space-y-8">
                <section>
                  <h2 className="mb-3 flex items-center gap-2 text-xl font-bold tracking-tight">
                    <FileText className="h-6 w-6 text-primary" /> Overview
                  </h2>
                  <p className="text-base leading-relaxed text-muted-foreground/80">
                    {course.description}
                  </p>
                </section>

                <section>
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-black tracking-tight">
                    <BookOpen className="h-7 w-7 text-primary" /> Curriculum Focus
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {course.subjects.map(s => (
                      <Badge key={s} variant="secondary" className="rounded-xl px-5 py-2 text-sm font-bold bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </section>

                {course.careerOpportunities.length > 0 && (
                  <section>
                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-black tracking-tight">
                      <Briefcase className="h-7 w-7 text-primary" /> Career Path
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {course.careerOpportunities.map(c => (
                        <div key={c} className="flex items-center gap-4 rounded-2xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-sm font-bold text-foreground/80">{c}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            <aside className="w-full lg:w-80">
              <div className="sticky top-24 space-y-8">
                {/* Modern Admission Process Card */}
                <div className="rounded-[2.5rem] border bg-card p-8 shadow-sm">
                  <h3 className="mb-6 text-xl font-black tracking-tight">Admission Steps</h3>
                  <div className="space-y-6">
                    {course.admissionProcess.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
                          0{i + 1}
                        </div>
                        <span className="text-sm font-bold leading-relaxed text-muted-foreground/90">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <Button size="lg" className="w-full rounded-2xl gradient-primary border-0 text-white font-black h-14 shadow-xl shadow-primary/25 hover:shadow-2xl transition-all">
                      Enroll Today
                    </Button>
                  </div>
                </div>

                {/* Info Card */}
                <div className="rounded-[2.5rem] gradient-hero p-8 text-white">
                  <h4 className="mb-4 text-lg font-black">Need Guidance?</h4>
                  <p className="text-sm font-medium text-white/80 leading-relaxed">
                    Our educational counselors are available to help you choose the right path for your future.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;
