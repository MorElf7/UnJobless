import CategoryList from "../components/CategoryList";
import JobList from "../components/JobList";

const Dashboard = () => {
  return (
    <div className="dashboard p-10 pb-5">
      <div className="greeting">
        <span className="text-3xl font-medium text-green-500">Hello, </span>
        <span className="text-3xl font-medium">User</span>
        <p className="pt-1 text-sm">Here are your daily activities and job alerts.</p>
      </div>
      <CategoryList />
      <div className="section-title pt-4">
        <span className="text-gray-600 font-medium">Recently Applied</span>
      </div>
      <JobList />
    </div>
  );
};

export default Dashboard;