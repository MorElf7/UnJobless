import React from 'react';
import { SignupData } from '../types/types';

interface Props {
  nextStep: () => void;
  handleChange: (input: keyof SignupData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  signupData: {
    first_name: string;
    last_name: string;
    phone: string;
    linkedin: string;
    website: string;
    github: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
  };
}

const PersonalInfoForm: React.FC<Props> = ({ nextStep, handleChange, signupData }) => {
  const continueNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="First Name"
        value={signupData.first_name}
        onChange={handleChange('first_name')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={signupData.last_name}
        onChange={handleChange('last_name')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Phone"
        value={signupData.phone}
        onChange={handleChange('phone')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="LinkedIn"
        value={signupData.linkedin}
        onChange={handleChange('linkedin')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Website"
        value={signupData.website}
        onChange={handleChange('website')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="GitHub"
        value={signupData.github}
        onChange={handleChange('github')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Street Address"
        value={signupData.street_address}
        onChange={handleChange('street_address')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="City"
        value={signupData.city}
        onChange={handleChange('city')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="State"
        value={signupData.state}
        onChange={handleChange('state')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Zip Code"
        value={signupData.zip_code}
        onChange={handleChange('zip_code')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={continueNext}
        className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Next
      </button>
    </div>
  );
};

export default PersonalInfoForm;
