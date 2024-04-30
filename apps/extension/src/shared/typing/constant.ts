import { Education, Experience, Profile } from "./types";

const defaultEducation: Education[] = [
    {
        school: "Default University",
        start_date: "0000-00",
        end_date: "0000-00",
        major: "N/A",
        degree: "N/A",
        gpa: 0.0
    }
];

const defaultExperience: Experience[] = [
    {
        company: "Default Company",
        location: "Default City",
        start_date: "0000-00",
        end_date: "0000-00",
        position: "Default Position",
        description: "Default job description.",
        current: false,
    }
];

export const defaultProfile: Profile = {
    first_name: "Firstname",
    last_name: "Lastname",
    email: "email@example.com",
    phone: "000-0000-000",
    linkedin: "https://www.linkedin.com",
    website: "https://www.example.com",
    github: "https://github.com",
    street_address: "0000 Default St",
    city: "Default City",
    state: "Maine",
    zip_code: "00000",
    resumeUrl: "",
    resumeFileName: "",
    coverLetterUrl: "",
    coverLetterFileName: "",
    education: defaultEducation,
    experience: defaultExperience,
    sponsorship: "Unknown",
    legally_authorized: "Unknown",
    gender: "Unknown",
    race: "Unknown",
    veteran: "Unknown",
    disability: "Unknown"
};

const patterns = [
    "linkedin profile",
    "linkedin",
    "github profile",
    "github",
    "website",
    "Will you now or in the future require sponsorship",
    "legally authorized"
];

export const linkedInPattern = new RegExp(patterns.slice(0,2).join('|'), "i");
export const githubPattern = new RegExp(patterns.slice(2,4).join('|'), "i");
export const websitePattern = new RegExp(patterns[4], "i");
export const sponsorshipPattern = new RegExp(patterns[5], "i");
export const authorizedPattern = new RegExp(patterns[6], "i");
export const combinedPattern = new RegExp(patterns.join('|'), "i");
