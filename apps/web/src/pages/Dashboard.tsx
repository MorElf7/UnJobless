import CategoryList from "../components/CategoryList";
import JobList from "../components/JobList";
// import "../styles/Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <CategoryList />
      <JobList />
    </div>
  );
};

export default Dashboard;