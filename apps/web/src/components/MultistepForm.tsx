import React, { useState, useEffect } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import FileUploadForm from "./FileUploadForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import DemographicsForm from "./DemographicsForm";
import { SignupData } from "../types/types";
import { signup } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

interface MultiStepFormProps {
  initialData?: { email: string; password: string };
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ initialData }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [signupData, setFormData] = useState<SignupData>({
    email: initialData?.email || "",
    password: initialData?.password || "",
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
    coverLetterFile: undefined,
  });

  const { login } = useAuth();

  const handleChange =
    (input: keyof SignupData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prevSignUpData) => ({
        ...prevSignUpData,
        [input]: e.target.value,
      }));
    };

  const handleArrayChange = (
    arrayName: keyof Pick<SignupData, "education" | "experience">,
    value: any[]
  ) => {
    setFormData((prevSignUpData) => ({
      ...prevSignUpData,
      [arrayName]: value,
    }));
  };

  const setFileData = (
    fileType: keyof Pick<SignupData, "resumeFile" | "coverLetterFile">,
    file: File
  ) => {
    setFormData((prevSignUpData) => ({ ...prevSignUpData, [fileType]: file }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return (
          signupData.first_name.trim() !== "" &&
          signupData.last_name.trim() !== "" &&
          signupData.phone.trim() !== "" &&
          signupData.street_address.trim() !== "" &&
          signupData.city.trim() !== "" &&
          signupData.state.trim() !== "" &&
          signupData.zip_code.trim() !== ""
        );
      case 2:
        return true; // File uploads
      case 3:
        return signupData.education.length > 0;
      case 4:
        return true; // Experience can be empty
      case 5:
        return (
          signupData.gender &&
          signupData.race &&
          signupData.veteran &&
          signupData.disability
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed()) {
      setStep((prevStep) => prevStep + 1);
    } else {
      alert(
        "Please complete all required fields before moving to the next step."
      );
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  };

  useEffect(() => {
    if (step === 6) {
      handleFormSubmission();
    }
  }, [step]);

  const handleFormSubmission = async () => {
    setLoading(true);

    const formDataToSubmit = new FormData();
    Object.entries(signupData).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        !["education", "experience", "resumeFile", "coverLetterFile"].includes(
          key
        )
      ) {
        formDataToSubmit.append(key, value.toString());
      }
    });

    if (signupData.resumeFile) {
      formDataToSubmit.append('resume', signupData.resumeFile);
    }
    if (signupData.coverLetterFile) {
      formDataToSubmit.append('coverLetter', signupData.coverLetterFile);
    }

    formDataToSubmit.append("education", JSON.stringify(signupData.education));
    formDataToSubmit.append(
      "experience",
      JSON.stringify(signupData.experience)
    );

    const formDataArray = Array.from(formDataToSubmit.entries());

      for (let pair of formDataArray) {
        console.log(pair[0], pair[1]);
      }

    try {
      const response = await signup(formDataToSubmit);
      if (response.access_token) {
        login(signupData.email, signupData.password);
        setStep(1); // Reset or redirect user after successful signup
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayComponent = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoForm
            nextStep={nextStep}
            handleChange={handleChange}
            signupData={signupData}
          />
        );
      case 2:
        return (
          <FileUploadForm
            nextStep={nextStep}
            prevStep={prevStep}
            setFileData={setFileData}
            signupData={signupData}
          />
        );
      case 3:
        return (
          <EducationForm
            nextStep={nextStep}
            prevStep={prevStep}
            handleArrayChange={handleArrayChange}
            signupData={signupData}
          />
        );
      case 4:
        return (
          <ExperienceForm
            nextStep={nextStep}
            prevStep={prevStep}
            handleArrayChange={handleArrayChange}
            signupData={signupData}
          />
        );
      case 5:
        return (
          <DemographicsForm
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            signupData={signupData}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center">
            <p className="text-2xl font-medium">Loading...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {displayComponent()}
    </div>
  );
};

export default MultiStepForm;
