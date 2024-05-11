// import React, { useState } from "react";
// import { fetchCompanies } from "../services/locationService";
// import { ExperienceEntry, Option } from "../types/types";

// interface Props {
//   nextStep: () => void;
//   prevStep: () => void;
//   handleArrayChange: (
//     arrayName: "experience",
//     value: ExperienceEntry[]
//   ) => void;
//   signupData: {
//     experience: ExperienceEntry[];
//   };
// }

// const ExperienceForm: React.FC<Props> = ({
//   nextStep,
//   prevStep,
//   handleArrayChange,
//   signupData,
// }) => {
//   const [entry, setEntry] = useState<ExperienceEntry>({
//     position: "",
//     company: "",
//     location: "",
//     current: false,
//     description: "",
//     startDate: "",
//     endDate: "",
//     logo: "",
//   });

//   const [companyOptions, setCompanyOptions] = useState<Option[]>([]);

//   const handleChange =
//     (input: keyof ExperienceEntry) =>
//     (
//       e: React.ChangeEvent<
//         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//       >
//     ) => {
//       const value =
//         input === "current"
//           ? (e.target as HTMLInputElement).checked
//           : e.target.value;
//       setEntry({ ...entry, [input]: value });
//     };

//   const handleCompanySearch = async (value: string) => {
//     if (value.length > 1) {
//       const companies = await fetchCompanies(value);
//       setCompanyOptions(companies.slice(0, 5));
//     } else {
//       setCompanyOptions([]);
//     }
//   };

//   const handleAddEntry = () => {
//     if (
//       !entry.position ||
//       !entry.company ||
//       !entry.location ||
//       !entry.description ||
//       !entry.startDate ||
//       (!entry.current && !entry.endDate)
//     ) {
//       alert("Please fill in all fields");
//       return;
//     }
//     handleArrayChange("experience", [...signupData.experience, entry]);
//     setEntry({
//       position: "",
//       company: "",
//       location: "",
//       current: false,
//       description: "",
//       startDate: "",
//       endDate: "",
//       logo: "",
//     }); // Reset the form
//   };

//   const continueNext = () => {
//     nextStep();
//   };

//   const goBack = () => {
//     prevStep();
//   };

//   const removeEntry = (index: number) => {
//     const newExperienceEntries = [...signupData.experience];
//     newExperienceEntries.splice(index, 1);
//     handleArrayChange("experience", newExperienceEntries);
//   };

//   return (
//     <div className="max-w-md mx-auto space-y-4 relative">
//       <h2 className="text-lg font-semibold text-gray-700">
//         Add Work Experience
//       </h2>
//       <input
//         type="text"
//         placeholder="Position"
//         value={entry.position}
//         onChange={handleChange("position")}
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//       />
//       <input
//         type="text"
//         placeholder="Company"
//         value={entry.company}
//         onChange={(e) => {
//           handleChange("company")(e);
//           handleCompanySearch(e.target.value);
//         }}
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//       />
//       {companyOptions.length > 0 && (
//         <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-y-auto border-gray-300 border rounded-md mt-1">
//           {companyOptions.map((company, index) => (
//             <li
//               key={index}
//               className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
//               onClick={() => {
//                 setEntry({
//                   ...entry,
//                   company: company.name,
//                   logo: company.logo,
//                 });
//                 setCompanyOptions([]);
//               }}
//             >
//               {company.name}
//               <img
//                 src={company.logo}
//                 alt={`${company.name} logo`}
//                 className="w-12 h-7 object-cover rounded-md"
//               />
//             </li>
//           ))}
//         </ul>
//       )}
//       <input
//         type="text"
//         placeholder="Location"
//         value={entry.location}
//         onChange={handleChange("location")}
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//       />
//       <label className="flex items-center space-x-2">
//         <span>Currently Working Here:</span>
//         <input
//           type="checkbox"
//           checked={entry.current}
//           onChange={handleChange("current")}
//           className="form-checkbox h-5 w-5 text-green-600"
//         />
//       </label>
//       <textarea
//         placeholder="Job Description"
//         value={entry.description}
//         onChange={(e) =>
//           handleChange("description")(
//             e as React.ChangeEvent<HTMLTextAreaElement>
//           )
//         }
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//       />
//       <input
//         type="date"
//         placeholder="Start Date"
//         value={entry.startDate}
//         onChange={handleChange("startDate")}
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//       />
//       <input
//         type="date"
//         placeholder="End Date"
//         // disabled={entry.current}
//         value={entry.endDate}
//         onChange={handleChange("endDate")}
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//       />
//       <div className="flex justify-between">
//         <button
//           onClick={goBack}
//           className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//         >
//           Back
//         </button>
//         <button
//           onClick={handleAddEntry}
//           className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Add Another Experience
//         </button>
//         <button
//           onClick={continueNext}
//           className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
//         >
//           Next
//         </button>
//       </div>
//       <div>
//         <h3 className="text-lg font-medium text-gray-700">
//           Current Experience Entries:
//         </h3>
//         <ul>
//           {signupData.experience.map((exp, index) => (
//             <li key={index} className="flex justify-between items-center">
//               {`${exp.position} at ${exp.company}, ${exp.location} (${exp.startDate} - ${exp.current ? "Present" : exp.endDate}), ${exp.description}`}
//               <button
//                 onClick={() => removeEntry(index)}
//                 className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ExperienceForm;

import React, { useState } from "react";
import { fetchCompanies } from "../services/locationService";
import { ExperienceEntry, Option } from "../types/types";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  handleArrayChange: (
    arrayName: "experience",
    value: ExperienceEntry[]
  ) => void;
  signupData: {
    experience: ExperienceEntry[];
  };
}

const ExperienceForm: React.FC<Props> = ({
  nextStep,
  prevStep,
  handleArrayChange,
  signupData,
}) => {
  const [entry, setEntry] = useState<ExperienceEntry>({
    position: "",
    company: "",
    location: "",
    current: false,
    description: "",
    startDate: "",
    endDate: "",
    logo: "",
  });

  const [companyOptions, setCompanyOptions] = useState<Option[]>([]);

  const handleChange =
    (input: keyof ExperienceEntry) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value =
        input === "current"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setEntry({ ...entry, [input]: value });
    };

  const handleCompanySearch = async (value: string) => {
    if (value.length > 1) {
      const companies = await fetchCompanies(value);
      setCompanyOptions(companies.slice(0, 5));
    } else {
      setCompanyOptions([]);
    }
  };

  const handleAddEntry = () => {
    if (
      !entry.position ||
      !entry.company ||
      !entry.location ||
      !entry.startDate ||
      (!entry.current && !entry.endDate)
    ) {
      alert("Please fill in all fields");
      return;
    }
    handleArrayChange("experience", [...signupData.experience, entry]);
    setEntry({
      position: "",
      company: "",
      location: "",
      current: false,
      description: "",
      startDate: "",
      endDate: "",
      logo: "",
    });
  };

  const removeEntry = (index: number) => {
    const newExperienceEntries = [...signupData.experience];
    newExperienceEntries.splice(index, 1);
    handleArrayChange("experience", newExperienceEntries);
  };

  return (
    <div className="max-w-md mx-auto space-y-4 relative">
      <h2 className="text-lg font-semibold text-gray-700">
        Add Work Experience (Optional)
      </h2>
      <input
        type="text"
        placeholder="Position"
        value={entry.position}
        onChange={handleChange("position")}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Company"
        value={entry.company}
        onChange={(e) => {
          handleChange("company")(e);
          handleCompanySearch(e.target.value);
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {companyOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-y-auto border-gray-300 border rounded-md mt-1">
          {companyOptions.map((company, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => {
                setEntry({
                  ...entry,
                  company: company.name,
                  logo: company.logo,
                });
                setCompanyOptions([]);
              }}
            >
              {company.name}
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-12 h-7 object-cover rounded-md"
              />
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        placeholder="Location"
        value={entry.location}
        onChange={handleChange("location")}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <label className="flex items-center space-x-2">
        <span>Currently Working Here:</span>
        <input
          type="checkbox"
          checked={entry.current}
          onChange={handleChange("current")}
          className="form-checkbox h-5 w-5 text-green-600"
        />
      </label>
      <input
        type="date"
        placeholder="Start Date"
        value={entry.startDate}
        onChange={handleChange("startDate")}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="date"
        placeholder="End Date"
        value={entry.endDate}
        onChange={handleChange("endDate")}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={() => handleAddEntry()}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Another Experience
        </button>
        <button
          onClick={nextStep}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Next
        </button>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700">
          Current Experience Entries:
        </h3>
        <ul>
          {signupData.experience.map((exp, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow"
            >
              {`${exp.position} at ${exp.company}, ${exp.location} (${exp.startDate} - ${exp.current ? "Present" : exp.endDate})`}
              {exp.logo && (
                <img
                  src={exp.logo}
                  alt="Company logo"
                  style={{ width: 50, height: 30 }}
                />
              )}
              <button
                onClick={() => removeEntry(index)}
                className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceForm;
