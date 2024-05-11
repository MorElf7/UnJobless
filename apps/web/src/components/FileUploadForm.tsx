import React, { useEffect, useRef, useMemo } from "react";
import { SignupData } from "../types/types";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  setFileData: (fileType: "resumeFile" | "coverLetterFile", file: File) => void;
  signupData: SignupData;
}

const FileUploadForm: React.FC<Props> = ({
  nextStep,
  prevStep,
  setFileData,
  signupData,
}) => {
  const { resumeFile, coverLetterFile } = signupData;

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);

  const dataTransfer = new DataTransfer();

  useEffect(() => {
    if (resumeInputRef.current && resumeFile) {
      dataTransfer.items.add(resumeFile);
      resumeInputRef.current.files = dataTransfer.files;
      dataTransfer.items.clear();
    }
  }, [dataTransfer, resumeFile]);

  useEffect(() => {
    if (coverLetterInputRef.current && coverLetterFile) {
      dataTransfer.items.add(coverLetterFile);
      coverLetterInputRef.current.files = dataTransfer.files;
      dataTransfer.items.clear();
    }
  }, [dataTransfer, coverLetterFile]);

  const handleFileChange =
    (fileType: "resumeFile" | "coverLetterFile") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setFileData(fileType, file);
      }
    };

  const continueNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    nextStep();
  };

  const goBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div>
        <label
          htmlFor="resumeInput"
          className="block text-sm font-medium text-gray-700"
        >
          Resume (PDF):
        </label>
        <input
          id="resumeInput"
          type="file"
          ref={resumeInputRef}
          onChange={handleFileChange("resumeFile")}
          accept=".pdf"
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-green-50 file:text-green-700
          hover:file:bg-green-100"
        />
      </div>
      <div>
        <label
          htmlFor="coverLetterInput"
          className="block text-sm font-medium text-gray-700"
        >
          Cover Letter (PDF):
        </label>
        <input
          id="coverLetterInput"
          type="file"
          ref={coverLetterInputRef}
          onChange={handleFileChange("coverLetterFile")}
          accept=".pdf"
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={goBack}
          className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={continueNext}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FileUploadForm;
