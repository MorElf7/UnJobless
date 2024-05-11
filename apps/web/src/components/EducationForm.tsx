import React, { useState } from 'react';
import { fetchSchools } from '../services/locationService';
import { EducationEntry } from '../types/types';

interface Option {
  name: string;
  logo: string;
}

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  handleArrayChange: (arrayName: 'education', value: EducationEntry[]) => void;
  signupData: {
    education: EducationEntry[];
  };
}

const EducationForm: React.FC<Props> = ({ nextStep, prevStep, handleArrayChange, signupData }) => {
  const [entry, setEntry] = useState<EducationEntry>({
    school: '',
    major: '',
    degree: '',
    gpa: 0,
    startDate: '',
    endDate: '',
    logo: ''
  });

  const [schoolOptions, setSchoolOptions] = useState<Option[]>([]);

  const handleChange = (input: keyof EducationEntry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEntry({ ...entry, [input]: value });
  };

  const handleSchoolSearch = async (value: string) => {
    if (value.length > 1) {
      const schools = await fetchSchools(value);
      setSchoolOptions(schools.slice(0, 5));
    } else {
      setSchoolOptions([]);
    }
  };

  const handleAddEntry = () => {
    if (!entry.school || !entry.major || !entry.degree || !entry.startDate || !entry.endDate) {
      alert("Please fill in all fields");
      return;
    }
    handleArrayChange('education', [...signupData.education, entry]);
    setEntry({ school: '', major: '', degree: '', gpa: 0, startDate: '', endDate: '', logo: '' }); // Reset the form
  };

  const removeEntry = (index: number) => {
    const newEducationEntries = [...signupData.education];
    newEducationEntries.splice(index, 1);
    handleArrayChange('education', newEducationEntries);
  };

  return (
    <div className="max-w-md mx-auto space-y-4 relative">
      <h2 className="text-lg font-semibold text-gray-700">Add Education Details</h2>
      <input
        type="text"
        placeholder="School"
        value={entry.school}
        onChange={(e) => {
          handleChange('school')(e);
          handleSchoolSearch(e.target.value);
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {schoolOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-y-auto border-gray-300 border rounded-md mt-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {schoolOptions.map((school, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={() => {
                  setEntry({ ...entry, school: school.name, logo: school.logo });
                  setSchoolOptions([]);
                }}
            >
              {school.name}
              <img src={school.logo} alt={`${school.name} logo`} className="w-12 h-7 object-cover rounded-md" />
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        placeholder="Major"
        value={entry.major}
        onChange={handleChange('major')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Degree"
        value={entry.degree}
        onChange={handleChange('degree')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="number"
        placeholder="GPA"
        value={entry.gpa}
        onChange={e => handleChange('gpa')(e as React.ChangeEvent<HTMLInputElement>)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="date"
        placeholder="Start Date"
        value={entry.startDate}
        onChange={handleChange('startDate')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="date"
        placeholder="End Date"
        value={entry.endDate}
        onChange={handleChange('endDate')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="flex justify-between">
        <button onClick={prevStep} className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Back</button>
        <button onClick={handleAddEntry} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Another Education</button>
        <button onClick={nextStep} className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Next</button>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Current Education Entries:</h3>
        <ul>
          {signupData.education.map((edu, index) => (
            <li key={index} className="flex justify-between items-center">
              {`${edu.school}, ${edu.degree} in ${edu.major}, GPA: ${edu.gpa} from ${edu.startDate} to ${edu.endDate}`}
              {edu.logo && <img src={edu.logo} alt="School logo" style={{ width: 50, height: 30 }} />}
              <button onClick={() => removeEntry(index)} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EducationForm;