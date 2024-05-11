// import React, { useState } from "react";
// import PersonalInfoForm from "./PersonalInfoForm";
// import FileUploadForm from "./FileUploadForm";
// import EducationForm from "./EducationForm";
// import ExperienceForm from "./ExperienceForm";
// import DemographicsForm from "./DemographicsForm";
// import { SignupData, EducationEntry, ExperienceEntry } from "../types/types";
// import { signup } from "../services/authService"; 
// import { useAuth } from "../contexts/AuthContext";

// interface MultiStepFormProps {
//   initialData?: { email: string; password: string };
// }

// const MultiStepForm: React.FC<MultiStepFormProps> = ({ initialData }) => {
//   const [step, setStep] = useState(1);
//   const [signupData, setFormData] = useState<SignupData>({
//     email: initialData?.email || "",
//     password: initialData?.password || "",
//     first_name: "",
//     last_name: "",
//     phone: "",
//     linkedin: "",
//     website: "",
//     github: "",
//     street_address: "",
//     city: "",
//     state: "",
//     zip_code: "",
//     education: [],
//     experience: [],
//     sponsorship: "",
//     legally_authorized: "",
//     gender: "",
//     race: "",
//     veteran: "",
//     disability: "",
//     resumeFile: undefined,
//     coverLetterFile: undefined
//   });

//   const nextStep = () => {
//     if (canProceed()) {
//       setStep(prevStep => prevStep + 1);
//     } else {
//       alert("Please complete all required fields before moving to the next step.");
//     }
//   };

//   const prevStep = () => {
//     setStep(prevStep => Math.max(prevStep - 1, 1));
//   };

//   // Centralized validation checks
//   const canProceed = () => {
//     switch(step) {
//       case 1:
//         // Check if all required personal info fields are filled
//         return Object.entries(signupData).slice(2, 10).every(([key, value]) => value.trim() !== '');
//       case 2:
//         // No validation needed for file uploads in this context
//         return true;
//       case 3:
//         // Ensure there is at least one education entry
//         return signupData.education.length > 0;
//       case 4:
//         // Ensure there is at least one experience entry
//         return signupData.experience.length > 0;
//       case 5:
//         // Ensure all demographic information is selected
//         return signupData.gender && signupData.race && signupData.veteran && signupData.disability;
//       default:
//         return true;
//     }
//   };

//   const handleChange = (input: keyof SignupData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData(prevSignUpData => ({ ...prevSignUpData, [input]: e.target.value }));
//   };

//   const handleArrayChange = (arrayName: keyof Pick<SignupData, 'education' | 'experience'>, value: EducationEntry[] | ExperienceEntry[]) => {
//     setFormData(prevSignUpData => ({ ...prevSignUpData, [arrayName]: value }));
//   };

//   const { login } = useAuth();

//   const setFileData = (fileType: keyof Pick<SignupData, 'resumeFile' | 'coverLetterFile'>, file: File) => {
//     setFormData({ ...signupData, [fileType]: file });
//   };

  

//   const handleFormSubmission = async () => {
//     console.log("Final Submission Data:", signupData);

//     const formDataToSubmit = new FormData();
//     Object.entries(signupData).forEach(([key, value]) => {
//       if (value !== undefined && value !== null && key !== 'education' && key !== 'experience' && key !== 'resumeFile' && key !== 'coverLetterFile') {
//         formDataToSubmit.append(key, value.toString());
//       }
//     });

//     if (signupData.resumeFile) {
//       formDataToSubmit.append('resume', signupData.resumeFile);
//     }
//     if (signupData.coverLetterFile) {
//       formDataToSubmit.append('coverLetter', signupData.coverLetterFile);
//     }

//     formDataToSubmit.append('education', JSON.stringify(signupData.education));
//     formDataToSubmit.append('experience', JSON.stringify(signupData.experience));

//     const entries = Array.from(formDataToSubmit.entries());
//     entries.forEach(pair => {
//         console.log(`${pair[0]}: ${pair[1]}`);
//     });

//     try {
//       const response = await signup(formDataToSubmit);
//       console.log("Signup successful, response:", response);

//       if (response.access_token) {
//         login(signupData.email, signupData.password);
//       }
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//     };

//   switch (step) {
//     case 1:
//       return <PersonalInfoForm nextStep={nextStep} handleChange={handleChange} signupData={signupData} />;
//     case 2:
//       return <FileUploadForm nextStep={nextStep} prevStep={prevStep} setFileData={setFileData} signupData={signupData} />;
//     case 3:
//       return <EducationForm nextStep={nextStep} prevStep={prevStep} handleArrayChange={handleArrayChange} signupData={signupData} />;
//     case 4:
//       return <ExperienceForm nextStep={nextStep} prevStep={prevStep} handleArrayChange={handleArrayChange} signupData={signupData} />;
//     case 5:
//       return <DemographicsForm nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} signupData={signupData} />;
//     default:
//       handleFormSubmission();
//       return (
//         <div className="flex items-center justify-center">
//           <p className="text-2xl font-medium">Loading...</p>
//         </div>
//       );
//   }
// };

// export default MultiStepForm;

import React, { useState } from "react";
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
  const [error, setError] = useState('');
  const [signupData, setFormData] = useState<SignupData>({
    email: initialData?.email || "",
    password: initialData?.password || "",
    first_name: "", last_name: "", phone: "", linkedin: "", website: "", github: "",
    street_address: "", city: "", state: "", zip_code: "",
    education: [], experience: [], sponsorship: "", legally_authorized: "",
    gender: "", race: "", veteran: "", disability: "",
    resumeFile: undefined, coverLetterFile: undefined
  });

  const { login } = useAuth();

  const handleChange = (input: keyof SignupData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prevSignUpData => ({ ...prevSignUpData, [input]: e.target.value }));
  };

  const handleArrayChange = (arrayName: keyof Pick<SignupData, 'education' | 'experience'>, value: any[]) => {
    setFormData(prevSignUpData => ({ ...prevSignUpData, [arrayName]: value }));
  };

  const setFileData = (fileType: keyof Pick<SignupData, 'resumeFile' | 'coverLetterFile'>, file: File) => {
    setFormData({ ...signupData, [fileType]: file });
  };

  // Centralized validation checks
  const canProceed = () => {
    switch(step) {
      case 1:
        // Check if all required personal info fields are filled
        return Object.entries(signupData).slice(2, 10).every(([key, value]) => value.trim() !== '');
      case 2:
        // No validation needed for file uploads in this context
        return true;
      case 3:
        // Ensure there is at least one education entry
        return signupData.education.length > 0;
      case 4:
        // Ensure there is at least one experience entry
        return signupData.experience.length > 0;
      case 5:
        // Ensure all demographic information is selected
        return signupData.gender && signupData.race && signupData.veteran && signupData.disability;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed()) {
      setStep(prevStep => prevStep + 1);
    } else {
      setError("Please complete all required fields before moving to the next step.");
    }
  };

  const prevStep = () => setStep(prevStep => Math.max(prevStep - 1, 1));

  const handleFormSubmission = async () => {
    setLoading(true);
    setError('');
  
    const formDataToSubmit = new FormData();
    Object.entries(signupData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && !['education', 'experience', 'resumeFile', 'coverLetterFile'].includes(key)) {
        formDataToSubmit.append(key, value.toString());
      }
    });
  
    formDataToSubmit.append('education', JSON.stringify(signupData.education));
    formDataToSubmit.append('experience', JSON.stringify(signupData.experience));
  
    try {
      const response = await signup(formDataToSubmit);
      if (response.access_token) {
        login(signupData.email, signupData.password);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setLoading(false);
  
      // Type check to determine the structure and type of the error
      if (typeof error === 'string') {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to sign up. Please try again.');
      }
    }
  
    setLoading(false);
    setStep(1); // Reset or redirect user after successful signup
  };

  const displayComponent = () => {
    switch (step) {
      case 1: return <PersonalInfoForm nextStep={nextStep} handleChange={handleChange} signupData={signupData} />;
      case 2: return <FileUploadForm nextStep={nextStep} prevStep={prevStep} setFileData={setFileData} signupData={signupData} />;
      case 3: return <EducationForm nextStep={nextStep} prevStep={prevStep} handleArrayChange={handleArrayChange} signupData={signupData} />;
      case 4: return <ExperienceForm nextStep={nextStep} prevStep={prevStep} handleArrayChange={handleArrayChange} signupData={signupData} />;
      case 5: return <DemographicsForm nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} signupData={signupData} />;
      default: 
        handleFormSubmission();
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
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default MultiStepForm;