import { InstitutionCard } from "@/components/InstitutionCard";
import { getSchools } from "@/data/mockData";
import { motion } from "framer-motion";

const Schools = () => {
  const schools = getSchools();

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
            Our <span className="text-primary">Schools</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl opacity-80 leading-relaxed">
            Explore our network of premier schools, from primary to higher secondary,
            each dedicated to academic excellence and holistic development.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((inst, i) => (
            <InstitutionCard key={inst.id} institution={inst} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schools;
