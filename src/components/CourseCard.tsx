import { Link } from "react-router-dom";
import { Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/data/mockData";
import { motion } from "framer-motion";

interface Props {
  course: Course;
  index?: number;
}

export const CourseCard = ({ course, index = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
  >
    <Link to={`/course/${course.slug}`} className="group block">
      <div className="rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <h3 className="mb-2 text-base font-semibold group-hover:text-primary transition-colors">{course.courseName}</h3>
        <div className="mb-3 space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>{course.eligibility}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </div>
    </Link>
  </motion.div>
);
