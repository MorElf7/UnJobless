import CategoryList from "../components/CategoryList";
// import JobList from "../components/JobList";
import List from "../components/List";

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
        <span>Recently Applied</span>
      </div>
      {/* <JobList /> */}
      <List />
    </div>
  );
};

export default Dashboard;