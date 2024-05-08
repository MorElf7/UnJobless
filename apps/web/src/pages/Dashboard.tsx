import { useState, useEffect } from 'react';
import CategoryList from "../components/CategoryList";
import JobList from "../components/JobList";
import AppList from "../components/AppList";
import { fetchProfile } from '../services/profileService';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
  github?: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  resumeUrl: string;
  resumeFileName: string;
  coverLetterUrl: string;
  coverLetterFileName: string;
  education: string[];
  experience: string[];
  sponsorship?: string[];
  legally_authorized?: string;
  gender?: string;
  race?: string;
  veteran?: string;
  disability?: string;
}

const Dashboard = () => {
  const [activeCategory, setCategory] = useState(0);
  const handleCategorySelect = (category: number) => {
    setCategory(category);
  }

  const [profile, setProfile] = useState<User>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    resumeUrl: "",
    resumeFileName: "",
    coverLetterUrl: "",
    coverLetterFileName: "",
    education: [],
    experience: [],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
        const profile = await fetchProfile(token as string);
        setProfile(profile);
    };

    fetchData();
}, []);

  return (
    <div className="dashboard p-10 pb-5">
      <div className="greeting">
        <span className="text-3xl font-medium text-green-500">Hello, </span>
        <span className="text-3xl font-medium">{profile.first_name} {profile.last_name}</span>
        <p className="pt-1 text-sm">Here are your daily activities and job alerts.</p>
      </div>
      <CategoryList token ={token as string} onSelect={handleCategorySelect} />
      <div className="section-title pt-4">
        <span className="text-gray-600 font-medium">Recently Applied</span>
      </div>

      {activeCategory === 0 && <AppList />}
      {activeCategory === 1 && <JobList limit={5} />}
      {activeCategory === 2 && <AppList />}
    </div>
  );
};

export default Dashboard;