import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { institutions, allCourses } from "@/data/mockData";

interface SearchBarProps {
  onClose?: () => void;
}

export const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const instResults = institutions
      .filter(i => i.name.toLowerCase().includes(q))
      .map(i => ({ type: "institution" as const, label: i.name, sublabel: `${i.type} · ${i.location}`, path: `/institution/${i.slug}` }));
    const courseResults = allCourses
      .filter(c => c.courseName.toLowerCase().includes(q))
      .map(c => ({ type: "course" as const, label: c.courseName, sublabel: `${c.duration} · ${c.fees}`, path: `/course/${c.slug}` }));
    return [...instResults, ...courseResults].slice(0, 8);
  }, [query]);

  const handleSelect = (path: string) => {
    navigate(path);
    setQuery("");
    onClose?.();
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search schools, colleges, courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          autoFocus
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-lg border bg-card shadow-lg">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => handleSelect(r.path)}
              className="flex w-full flex-col items-start px-4 py-3 text-left transition-colors hover:bg-accent first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="text-sm font-medium">{r.label}</span>
              <span className="text-xs text-muted-foreground">{r.sublabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
