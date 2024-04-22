import JobList from "../components/JobList";

const Applications = () => {
    return (
        <div className="applications p-10 pb-5">
            <div className="pb-2">
                <span className="text-gray-600 font-medium">Recently Applied</span>
            </div>
            <JobList />
        </div>
    );
};

export default Applications;