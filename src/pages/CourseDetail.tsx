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
      <div className="container max-w-7xl py-12 lg:py-20">
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
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Program Detail
            </div>
            <h1 className="mb-8 text-3xl font-extrabold md:text-4xl lg:text-6xl tracking-tight leading-tight">
              {course.courseName}
            </h1>

            {/* Enhanced Overview Cards */}
            <div className="mb-14 grid gap-5 sm:grid-cols-3">
              {[
                { icon: Clock, label: "Duration", val: course.duration },
                { icon: IndianRupee, label: "Program Fees", val: course.fees },
                { icon: CheckCircle, label: "Eligibility", val: course.eligibility },
              ].map((item, i) => (
                <div key={i} className="rounded-[2rem] border bg-card p-6 shadow-sm ring-1 ring-border/50 transition-all hover:shadow-md">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-1">{item.label}</div>
                  <div className="text-base font-bold tracking-tight">{item.val}</div>
                </div>
              ))}
            </div>

            {/* Detailed Content regions */}
            <div className="space-y-20">
              <section>
                <h2 className="mb-8 flex items-center gap-3 text-3xl font-black tracking-tight text-foreground">
                  <FileText className="h-8 w-8 text-primary" /> Overview
                </h2>
                <div className="text-xl leading-relaxed text-muted-foreground/90 space-y-8 font-medium tracking-tight max-w-5xl">
                  {course.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="mb-10 flex items-center gap-3 text-3xl font-black tracking-tight text-foreground">
                  <BookOpen className="h-8 w-8 text-primary" /> Curriculum Focus
                </h2>
                <div className="flex flex-wrap gap-5">
                  {course.subjects.map(s => (
                    <Badge key={s} variant="secondary" className="rounded-2xl px-8 py-4 text-base font-bold bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all border-none">
                      {s}
                    </Badge>
                  ))}
                </div>
              </section>

              {course.careerOpportunities.length > 0 && (
                <section>
                  <h2 className="mb-10 flex items-center gap-3 text-3xl font-black tracking-tight text-foreground">
                    <Briefcase className="h-8 w-8 text-primary" /> Career Path
                  </h2>
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {course.careerOpportunities.map(c => (
                      <div key={c} className="flex items-center gap-6 rounded-[2.5rem] border bg-card p-8 transition-all hover:shadow-lg hover:border-primary/20 group">
                        <div className="h-4 w-4 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                        <span className="text-lg font-bold text-foreground/80 tracking-tight">{c}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;
