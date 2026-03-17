import { Link } from "react-router-dom";
import { MapPin, Calendar, BookOpen, GraduationCap, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Institution } from "@/data/mockData";
import { motion } from "framer-motion";

interface Props {
  institution: Institution;
  index?: number;
}

export const InstitutionCard = ({ institution, index = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
  >
    <Link to={`/institution/${institution.slug}`} className="group block">
      <div className="rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
            {institution.type === "school" ? (
              <School className="h-6 w-6 text-accent-foreground" />
            ) : (
              <GraduationCap className="h-6 w-6 text-accent-foreground" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold group-hover:text-primary transition-colors">{institution.name}</h3>
            <span className="inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground capitalize">
              {institution.type}
            </span>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Founded {institution.yearFounded}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{institution.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{institution.courses.length} Courses</span>
          </div>
        </div>

        <Button size="sm" className="w-full gradient-primary border-0 text-primary-foreground">
          View Courses
        </Button>
      </div>
    </Link>
  </motion.div>
);
