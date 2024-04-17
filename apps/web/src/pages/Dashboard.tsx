import CategoryList from "../components/CategoryList";
import JobList from "../components/JobList";
// import "../styles/Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="greeting">
        <h1>Hello, User</h1>
        <p>Here are your daily activities and job alerts.</p>
      </div>
      <CategoryList />
      <div className="section-title">
        <h2>Recently Applied</h2>
      </div>
      <JobList />
    </div>
  );
};

export default Dashboard;