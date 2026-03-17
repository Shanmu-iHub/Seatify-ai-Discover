import data from "./mockData.json";

export interface Course {
  id: string;
  slug: string;
  courseName: string;
  duration: string;
  fees: string;
  eligibility: string;
  description: string;
  subjects: string[];
  careerOpportunities: string[];
  admissionProcess: string[];
  institutionId: string;
}

export interface Institution {
  id: string;
  slug: string;
  name: string;
  type: "school" | "college";
  yearFounded: number;
  location: string;
  affiliation: string;
  accreditation: string;
  description: string;
  students: number;
  faculty: number;
  campusSize: string;
  facilities: string[];
  image: string;
  courses: Course[];
}

export const institutions = data.institutions as Institution[];

export const allCourses = institutions.flatMap(inst => inst.courses);

export const getInstitutionBySlug = (slug: string) => institutions.find(i => i.slug === slug);
export const getCourseBySlug = (slug: string) => allCourses.find(c => c.slug === slug);
export const getSchools = () => institutions.filter(i => i.type === "school");
export const getColleges = () => institutions.filter(i => i.type === "college");

