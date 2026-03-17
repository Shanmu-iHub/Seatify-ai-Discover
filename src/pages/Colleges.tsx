import { InstitutionCard } from "@/components/InstitutionCard";
import { getColleges } from "@/data/mockData";
import { motion } from "framer-motion";

const Colleges = () => {
  const colleges = getColleges();

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center md:text-left"
        >
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-3">
            Our <span className="text-primary">Colleges</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl opacity-80 leading-relaxed">
            Explore our diverse range of colleges and professional programs designed
            to equip students with industry-ready skills and technical expertise.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {colleges.map((c, i) => (
            <InstitutionCard key={c.id} institution={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Colleges;
