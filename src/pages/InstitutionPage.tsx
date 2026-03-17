import { useParams, Link } from "react-router-dom";
import { getInstitutionBySlug } from "@/data/mockData";
import { InfoGrid } from "@/components/InfoGrid";
import { CourseCard } from "@/components/CourseCard";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Shield, Award } from "lucide-react";
import { motion } from "framer-motion";

const InstitutionPage = () => {
  const { slug } = useParams();
  const institution = getInstitutionBySlug(slug || "");

  if (!institution) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Institution not found</h1>
        <Link to="/schools" className="mt-4 text-primary hover:underline">← Back to institutions</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Link to="/schools" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to institutions
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Banner */}
        <div className="mb-8 rounded-2xl gradient-primary p-8 md:p-12">
          <Badge className="mb-3 bg-background/20 text-primary-foreground border-0 capitalize">{institution.type}</Badge>
          <h1 className="mb-2 text-3xl font-bold text-primary-foreground md:text-4xl">{institution.name}</h1>
          <div className="flex flex-wrap gap-4 text-primary-foreground/80 text-sm">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{institution.location}</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Founded {institution.yearFounded}</span>
            <span className="flex items-center gap-1"><Shield className="h-4 w-4" />{institution.affiliation}</span>
            <span className="flex items-center gap-1"><Award className="h-4 w-4" />{institution.accreditation}</span>
          </div>
        </div>

        {/* Quick Info */}
        <InfoGrid institution={institution} />

        {/* About */}
        <div className="mt-8 rounded-xl border bg-card p-6">
          <h2 className="mb-3 text-lg font-semibold">About</h2>
          <p className="text-muted-foreground leading-relaxed">{institution.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {institution.facilities.map(f => (
              <Badge key={f} variant="secondary">{f}</Badge>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="mt-12">
          <h2 className="mb-2 text-2xl font-bold">Courses</h2>
          <p className="mb-6 text-muted-foreground">{institution.courses.length} courses available</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {institution.courses.map((c, i) => (
              <CourseCard key={c.id} course={c} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InstitutionPage;
