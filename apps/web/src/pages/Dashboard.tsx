import { useState, useEffect } from 'react';
import CategoryList from "../components/CategoryList";
import JobList from "../components/JobList";
import AppList from "../components/AppList";
import { fetchProfile } from '../services/profileService';
import { useNavigate } from 'react-router-dom';

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
  sponsorship?: string;
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
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (activeCategory === 0) {
      navigate('/applications');
    } else if (activeCategory === 1) {
      navigate('/jobs');
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
        const profile = await fetchProfile(token as string);
        setProfile(profile);
    };

    fetchData();
}, [token]);

return (
  <div className="dashboard p-10 pb-5">
    <div className="greeting">
      <span className="text-3xl font-medium text-green-500">Hello, </span>
      <span className="text-3xl font-medium">{profile.first_name} {profile.last_name}</span>
      <p className="pt-1 text-sm">Here are your daily activities and job alerts.</p>
    </div>
    <CategoryList token={token as string} onSelect={handleCategorySelect} />
    <div className="section-title pt-4 flex justify-between items-center">
      <span className="text-gray-600 font-medium">Recently {activeCategory === 0 ? "Applied" : activeCategory === 1 ? "Posted" : "Rejected"}</span>
      {activeCategory !== 2 && (
        <button
          onClick={handleRedirect}
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300">
          View all {activeCategory === 0 ? "applications" : "jobs"}
        </button>
      )}
    </div>

    {activeCategory === 0 && <AppList appStatus="applied" />}
      {activeCategory === 1 && <JobList limit={5} />}
      {activeCategory === 2 && <AppList appStatus="rejected" />}
  </div>
);
};
export default Dashboard;