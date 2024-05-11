import React from "react";
import { SignupData } from "../types/types";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (
    input: keyof Pick<SignupData, "gender" | "race" | "veteran" | "disability">
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  signupData: SignupData;
}

const DemographicsForm: React.FC<Props> = ({
  nextStep,
  prevStep,
  handleChange,
  signupData,
}) => {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2>Demographic Information</h2>
      <label>
        Gender:
        <select
          value={signupData.gender}
          onChange={handleChange("gender")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Race:
        <select
          value={signupData.race}
          onChange={handleChange("race")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Race</option>
          <option value="White">White</option>
          <option value="Black or African American">
            Black or African American
          </option>
          <option value="Asian">Asian</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Veteran Status:
        <select
          value={signupData.veteran}
          onChange={handleChange("veteran")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Veteran Status</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
      <label>
        Disability Status:
        <select
          value={signupData.disability}
          onChange={handleChange("disability")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Disability Status</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DemographicsForm;
