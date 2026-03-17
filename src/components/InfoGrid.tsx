import { Users, BookOpen, Maximize, Award } from "lucide-react";
import type { Institution } from "@/data/mockData";

interface Props {
  institution: Institution;
}

export const InfoGrid = ({ institution }: Props) => {
  const items = [
    { icon: Users, label: "Students", value: institution.students.toLocaleString() },
    { icon: BookOpen, label: "Faculty", value: institution.faculty.toString() },
    { icon: Maximize, label: "Campus", value: institution.campusSize },
    { icon: Award, label: "Facilities", value: `${institution.facilities.length}+` },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border bg-card p-4 text-center">
          <item.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
          <div className="text-xl font-bold">{item.value}</div>
          <div className="text-xs text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  );
};
