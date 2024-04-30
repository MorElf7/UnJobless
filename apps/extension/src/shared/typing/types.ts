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

export type AdditionType = Array<[string, string, HTMLInputElement | HTMLTextAreaElement]>;


export type PopupProps = {
    type: number;
}

export type Achievement = {
    start_date: string;
    end_date: string;
}

export type Education = Achievement & {
    school: string;
    major: string;
    degree: string;
    gpa: number;
}

export type Experience = Achievement & {
    position: string;
    company: string;
    location: string;
    current: boolean;
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

export type Response = {
    [key: string]: any; 
}

export type Request = {
    method: string;
    [key: string]: any;
  }
