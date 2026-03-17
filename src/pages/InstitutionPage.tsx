import { useParams, Link } from "react-router-dom";
import { getInstitutionBySlug } from "@/data/mockData";
import { InfoGrid } from "@/components/InfoGrid";
import { CourseCard } from "@/components/CourseCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";

const InstitutionPage = () => {
  const { slug } = useParams();
  const institution = getInstitutionBySlug(slug || "");

  if (!institution) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-black">Institution not found</h1>
        <Button asChild variant="link" className="mt-4 text-primary">
          <Link to="/schools">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to institutions
          </Link>
        </Button>
      </div>
    );
  }

  const backPath = institution.type === "school" ? "/schools" : "/colleges";
  const backLabel = institution.type === "school" ? "Back to Schools" : "Back to Colleges";

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-12 lg:py-16">
        <Link to={backPath} className="group mb-12 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-all">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          {backLabel}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Enhanced Banner */}
          <div className="relative mb-10 overflow-hidden rounded-[2rem] gradient-primary p-8 md:p-12 lg:p-14 shadow-xl shadow-primary/20 animate-float">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(255,255,255,0.2),transparent)]" />
            <div className="relative z-10 flex flex-col items-start">
              <Badge className="mb-5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md border-0">
                {institution.type}
              </Badge>
              <h1 className="mb-5 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl tracking-tight leading-tight">
                {institution.name}
              </h1>
              <div className="flex flex-wrap gap-5 text-white/90 text-[13px] font-bold">
                <span className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"><MapPin className="h-3.5 w-3.5" /></div>
                  {institution.location}
                </span>
                <span className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"><Calendar className="h-3.5 w-3.5" /></div>
                  Est. {institution.yearFounded}
                </span>
                <span className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"><Shield className="h-3.5 w-3.5" /></div>
                  {institution.affiliation}
                </span>
                {institution.accreditation && institution.accreditation !== "None" && (
                  <span className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"><Award className="h-4 w-4" /></div>
                    {institution.accreditation}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* About Section */}
              <div className="mb-12 rounded-[2rem] border bg-card p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-black tracking-tight">About {institution.name}</h2>
                <p className="text-lg leading-relaxed text-muted-foreground/90">
                  {institution.description}
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  {institution.facilities.map(f => (
                    <Badge key={f} variant="secondary" className="rounded-xl px-4 py-1.5 text-xs font-bold bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Courses/Programs Section */}
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">{institution.type === 'school' ? 'Grade Levels' : 'Available Programs'}</h2>
                    <p className="text-muted-foreground font-medium">{institution.courses.length} educational pathways discovered</p>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {institution.courses.map((c, i) => (
                    <CourseCard key={c.id} course={c} index={i} />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Quick Info Sidebar */}
              <div className="sticky top-24 space-y-6">
                <InfoGrid institution={institution} />

                {/* Contact CTA */}
                <div className="rounded-[2rem] gradient-hero p-8 text-white shadow-xl shadow-primary/20">
                  <h3 className="mb-4 text-xl font-black">Direct Admissions</h3>
                  <p className="mb-6 text-sm font-medium text-white/80">Connect with our admissions team to learn more about the enrollment process.</p>
                  <Button className="w-full rounded-2xl bg-white text-primary font-black hover:bg-white/90">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InstitutionPage;
