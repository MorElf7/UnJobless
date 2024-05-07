import React, { useState } from 'react';

interface ExperienceEntry {
  position: string;
  company: string;
  location: string;
  current: boolean;
  description: string;
  startDate: string;
  endDate: string;
  logo: string;
}

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  handleArrayChange: (arrayName: 'experience', value: ExperienceEntry[]) => void;
  formData: {
    experience: ExperienceEntry[];
  };
}

const ExperienceForm: React.FC<Props> = ({ nextStep, prevStep, handleArrayChange, formData }) => {
  const [entry, setEntry] = useState<ExperienceEntry>({
    position: '',
    company: '',
    location: '',
    current: false,
    description: '',
    startDate: '',
    endDate: '',
    logo: ''
  });

  const handleChange = (input: keyof ExperienceEntry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = input === 'current' ? (e.target as HTMLInputElement).checked : e.target.value;
    setEntry({ ...entry, [input]: value });
  };

  const handleAddEntry = () => {
    handleArrayChange('experience', [...formData.experience, entry]);
    setEntry({ position: '', company: '', location: '', current: false, description: '', startDate: '', endDate: '', logo: '' }); // Reset the form
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
      <h2 className="text-lg font-semibold text-gray-700">Add Work Experience</h2>
      <input type="text" placeholder="Position" value={entry.position} onChange={handleChange('position')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="text" placeholder="Company" value={entry.company} onChange={handleChange('company')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="text" placeholder="Location" value={entry.location} onChange={handleChange('location')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <label className="flex items-center space-x-2">
        <span>Currently Working Here:</span>
        <input type="checkbox" checked={entry.current} onChange={handleChange('current')} className="form-checkbox h-5 w-5 text-green-600"/>
      </label>
      <textarea placeholder="Job Description" value={entry.description} onChange={(e) => handleChange('description')(e as React.ChangeEvent<HTMLTextAreaElement>)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="date" placeholder="Start Date" value={entry.startDate} onChange={handleChange('startDate')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="date" placeholder="End Date" disabled={entry.current} value={entry.endDate} onChange={handleChange('endDate')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <input type="text" placeholder="Company Logo URL" value={entry.logo} onChange={handleChange('logo')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
      <div className="flex justify-between">
        <button onClick={goBack} className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Back</button>
        <button onClick={handleAddEntry} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Another Experience</button>
        <button onClick={continueNext} className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Next</button>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700">Current Experience Entries:</h3>
        <ul className="list-disc pl-5">
          {formData.experience.map((exp, index) => (
            <li key={index} className="text-gray-600">{`${exp.position} at ${exp.company}, ${exp.location} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}), ${exp.description}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceForm;
