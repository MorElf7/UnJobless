import React, { useState } from 'react';

interface EducationEntry {
  school: string;
  major: string;
  degree: string;
  gpa: number;
  startDate: string;
  endDate: string;
  logo: string;
}

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  handleArrayChange: (arrayName: 'education', value: EducationEntry[]) => void;
  formData: {
    education: EducationEntry[];
  };
}

const EducationForm: React.FC<Props> = ({ nextStep, prevStep, handleArrayChange, formData }) => {
  const [entry, setEntry] = useState<EducationEntry>({
    school: '',
    major: '',
    degree: '',
    gpa: 0,
    startDate: '',
    endDate: '',
    logo: ''
  });

  const handleChange = (input: keyof EducationEntry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEntry({ ...entry, [input]: value });
  };

  const handleAddEntry = () => {
    handleArrayChange('education', [...formData.education, entry]);
    setEntry({ school: '', major: '', degree: '', gpa: 0, startDate: '', endDate: '', logo: '' }); // Reset the form
  };

  const continueNext = () => {
    handleAddEntry();
    nextStep();
  };

  const goBack = () => {
    prevStep();
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2>Add Education Details</h2>
      <input type="text" placeholder="School" value={entry.school} onChange={handleChange('school')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="text" placeholder="Major" value={entry.major} onChange={handleChange('major')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="text" placeholder="Degree" value={entry.degree} onChange={handleChange('degree')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="number" placeholder="GPA" value={entry.gpa} onChange={e => handleChange('gpa')(e as React.ChangeEvent<HTMLInputElement>)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="date" placeholder="Start Date" value={entry.startDate} onChange={handleChange('startDate')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="date" placeholder="End Date" value={entry.endDate} onChange={handleChange('endDate')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="text" placeholder="Logo URL" value={entry.logo} onChange={handleChange('logo')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <div className="flex justify-between">
        <button onClick={goBack} className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Back</button>
        <button onClick={handleAddEntry} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Another Education</button>
        <button onClick={continueNext} className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Next</button>
      </div>
      <div>
        <h3>Current Education Entries:</h3>
        <ul>
          {formData.education.map((edu, index) => (
            <li key={index}>{`${edu.school}, ${edu.degree} in ${edu.major}, GPA: ${edu.gpa} from ${edu.startDate} to ${edu.endDate}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EducationForm;
