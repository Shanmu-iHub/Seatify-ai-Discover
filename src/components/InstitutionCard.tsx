import { Link } from "react-router-dom";
import { MapPin, Calendar, BookOpen, GraduationCap, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Institution } from "@/data/mockData";
import { motion } from "framer-motion";

interface Props {
  institution: Institution;
  index?: number;
}

export const InstitutionCard = ({ institution, index = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
  >
    <Link to={`/institution/${institution.slug}`} className="group block h-full">
      <div className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm ring-1 ring-border/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5">
        <div className="relative mb-5 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shadow-inner group-hover:bg-primary/20 transition-colors">
            {institution.type === "school" ? (
              <School className="h-6 w-6 text-primary" />
            ) : (
              <GraduationCap className="h-6 w-6 text-primary" />
            )}
          </div>
          <Badge className="rounded-full bg-primary/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary border-0">
            {institution.type}
          </Badge>
        </div>

        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {institution.name}
          </h3>
          <p className="mb-5 line-clamp-2 text-xs leading-relaxed text-muted-foreground opacity-80">
            {institution.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-primary/60" />
              <span>Est. {institution.yearFounded}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary/60" />
              <span className="truncate">{institution.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 text-primary/60" />
              <span>{institution.courses.length} Programs</span>
            </div>
          </div>
        </div>

        <Button className="w-full rounded-xl bg-muted/50 text-foreground font-bold text-xs h-10 hover:bg-primary hover:text-white border-0 transition-all shadow-none">
          View Details
        </Button>
      </div>
    </Link>
  </motion.div>
);
