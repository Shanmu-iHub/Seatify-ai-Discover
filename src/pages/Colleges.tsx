import { InstitutionCard } from "@/components/InstitutionCard";
import { getColleges } from "@/data/mockData";

const Colleges = () => {
  const colleges = getColleges();

  return (
    <div className="container py-12">
      <h1 className="mb-2 text-3xl font-bold">Colleges</h1>
      <p className="mb-8 text-muted-foreground">Explore top colleges and their programs</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {colleges.map((c, i) => (
          <InstitutionCard key={c.id} institution={c} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Colleges;
