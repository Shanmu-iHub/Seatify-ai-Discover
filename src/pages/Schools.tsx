import { useState } from "react";
import { InstitutionCard } from "@/components/InstitutionCard";
import { getSchools, getColleges } from "@/data/mockData";

const Schools = () => {
  const [tab, setTab] = useState<"school" | "college">("school");
  const items = tab === "school" ? getSchools() : getColleges();

  return (
    <div className="container py-12">
      <h1 className="mb-2 text-3xl font-bold">Institutions</h1>
      <p className="mb-8 text-muted-foreground">Browse all schools and colleges on the platform</p>

      <div className="mb-8 flex gap-1 rounded-lg border bg-muted p-1 w-fit">
        <button
          onClick={() => setTab("school")}
          className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${
            tab === "school" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Schools
        </button>
        <button
          onClick={() => setTab("college")}
          className={`rounded-md px-5 py-2 text-sm font-medium transition-all ${
            tab === "college" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Colleges
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((inst, i) => (
          <InstitutionCard key={inst.id} institution={inst} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Schools;
