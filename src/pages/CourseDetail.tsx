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
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/schools" className="mt-4 text-primary hover:underline">← Back to institutions</Link>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      {institution && (
        <Link to={`/institution/${institution.slug}`} className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to {institution.name}
        </Link>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{course.courseName}</h1>

        {/* Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-4">
            <Clock className="mb-2 h-5 w-5 text-primary" />
            <div className="text-xs text-muted-foreground">Duration</div>
            <div className="font-semibold">{course.duration}</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <IndianRupee className="mb-2 h-5 w-5 text-primary" />
            <div className="text-xs text-muted-foreground">Fees</div>
            <div className="font-semibold">{course.fees}</div>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <CheckCircle className="mb-2 h-5 w-5 text-primary" />
            <div className="text-xs text-muted-foreground">Eligibility</div>
            <div className="font-semibold">{course.eligibility}</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 rounded-xl border bg-card p-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <FileText className="h-5 w-5 text-primary" /> Course Overview
          </h2>
          <p className="text-muted-foreground leading-relaxed">{course.description}</p>
        </div>

        {/* Subjects */}
        <div className="mb-8 rounded-xl border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="h-5 w-5 text-primary" /> Curriculum
          </h2>
          <div className="flex flex-wrap gap-2">
            {course.subjects.map(s => (
              <Badge key={s} variant="secondary" className="px-3 py-1">{s}</Badge>
            ))}
          </div>
        </div>

        {/* Career */}
        {course.careerOpportunities.length > 0 && (
          <div className="mb-8 rounded-xl border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Briefcase className="h-5 w-5 text-primary" /> Career Opportunities
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {course.careerOpportunities.map(c => (
                <div key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admission */}
        <div className="mb-8 rounded-xl border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Admission Process</h2>
          <div className="space-y-3">
            {course.admissionProcess.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {i + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <Button size="lg" className="w-full gradient-primary border-0 text-primary-foreground sm:w-auto px-12">
          Apply Now
        </Button>
      </motion.div>
    </div>
  );
};

export default CourseDetail;
