import JobList from "../components/JobList";

const Jobs = () => {
    return (
        <div className="jobs p-10 pb-5">
            <div className="pb-2">
                <span className="text-gray-600 font-medium">Your Opportunities</span>
            </div>
            <JobList num_jobs={100} />
        </div>
    );
};

export default Jobs;