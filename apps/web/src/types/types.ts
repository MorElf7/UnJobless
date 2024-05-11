interface EducationEntry {
  school: string;
  major: string;
  degree: string;
  gpa?: number;
  startDate: string;
  endDate?: string;
  logo?: string;
}

interface ExperienceEntry {
  position: string;
  company: string;
  location?: string;
  current: boolean;
  description?: string;
  startDate: string;
  endDate?: string;
  logo?: string;
}

interface SignupData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  linkedin: string;
  website: string;
  github: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  sponsorship: string;
  legally_authorized: string;
  gender: string;
  race: string;
  veteran: string;
  disability: string;
  resumeFile?: File;
  coverLetterFile?: File;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
  github?: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  resumeUrl: string;
  resumeFileName: string;
  coverLetterUrl: string;
  coverLetterFileName: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  sponsorship?: string;
  legally_authorized?: string;
  gender?: string;
  race?: string;
  veteran?: string;
  disability?: string;
}

interface Option {
  name: string;
  logo: string;
}

export type { EducationEntry, ExperienceEntry, SignupData, Option, User };
