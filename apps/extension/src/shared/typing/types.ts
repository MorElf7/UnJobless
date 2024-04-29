export type Profile = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    linkedin: string;
    website: string;
    github: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
    resumeUrl: string;
    resumeFileName: string;
    coverLetterUrl: string;
    coverLetterFileName: string;
    education: Education[];
    experience: Experience[];
    sponsorship: string;
    legally_authorized: string;
    gender: string;
    race: string;
    veteran: string;
    disability: string;
}

export type PopupProps = {
    type: number;
}

type Achievement = {
    name: string;
    location: string;
    start_date: string;
    end_date: string;
}

export type Education = Achievement & {
    major: string;
    degree: string;
    gpa: number;
}

export type Experience = Achievement & {
    position: string;
    description: string;
}

export type FileResponse = {
    status: number;
    arrayBuffer: number[];
    filename: string;
    type: string;
}

export type EventListener<T> = {
    (data: T): void;
}