import React, { useState } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import FileUploadForm from "./FileUploadForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import DemographicsForm from "./DemographicsForm";
import { FormData, EducationEntry, ExperienceEntry } from "./types";

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    linkedin: "",
    website: "",
    github: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    education: [],
    experience: [],
    sponsorship: "",
    legally_authorized: "",
    gender: "",
    race: "",
    veteran: "",
    disability: "",
    resumeFile: undefined,
    coverLetterFile: undefined
  });

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => Math.max(prevStep - 1, 1));

  const handleChange = (input: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(formData)
    setFormData(prevFormData => ({ ...prevFormData, [input]: e.target.value }));
  };
  const handleArrayChange = (arrayName: keyof Pick<FormData, 'education' | 'experience'>, value: EducationEntry[] | ExperienceEntry[]) => {
    setFormData({ ...formData, [arrayName]: value });
  };
  const setFileData = (fileType: keyof Pick<FormData, 'resumeFile' | 'coverLetterFile'>, file: File) => {
    console.log(setFileData, fileType, file)
    setFormData({ ...formData, [fileType]: file });
  };
  const handleFormSubmission = () => {
    console.log("Final Submission Data:", formData);
  };

  switch (step) {
    case 1:
      return <PersonalInfoForm nextStep={nextStep} handleChange={handleChange} formData={formData} />;
    case 2:
      return <FileUploadForm nextStep={nextStep} prevStep={prevStep} setFileData={setFileData} formData={formData} />;
    case 3:
      return <EducationForm nextStep={nextStep} prevStep={prevStep} handleArrayChange={handleArrayChange} formData={formData} />;
    case 4:
      return <ExperienceForm nextStep={nextStep} prevStep={prevStep} handleArrayChange={handleArrayChange} formData={formData} />;
    case 5:
      return <DemographicsForm nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
    default:
      handleFormSubmission();
      return <div>Registration Complete</div>;
  }
};

export default MultiStepForm;
