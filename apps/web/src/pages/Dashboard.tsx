import { useState } from 'react';
import CategoryList from "../components/CategoryList";
import JobList from "../components/JobList";
import AppList from "../components/AppList";

const Dashboard = () => {
  const [activeCategory, setCategory] = useState(0);
  const handleCategorySelect = (category: number) => {
    setCategory(category);
  }
  return (
    <div className="dashboard p-10 pb-5">
      <div className="greeting">
        <span className="text-3xl font-medium text-green-500">Hello, </span>
        <span className="text-3xl font-medium">User</span>
        <p className="pt-1 text-sm">Here are your daily activities and job alerts.</p>
      </div>
      <CategoryList onSelect={handleCategorySelect} />
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