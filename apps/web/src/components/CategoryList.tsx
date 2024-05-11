import { useEffect, useState } from "react";
import {
  BriefcaseIcon,
  BookmarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { fetchApps } from "../services/appService";
import axios from "axios";

type CategorySelectHandler = (category: number) => void;

interface CategoryListProps {
  onSelect: CategorySelectHandler;
  token: string; // Token is required to fetch applications
}

function CategoryList({ onSelect, token }: CategoryListProps) {
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [rejectedJobs, setRejectedJobs] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelect = (category: number) => {
    onSelect(category);
    setRefreshKey((prev) => prev + 1); // Increment the key to trigger refetch
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const apps = await fetchApps(token, "applied");
        setAppliedJobs(apps.length);
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
      }
    };
    fetchAppliedJobs();
  }, [token, refreshKey]);

  // Fetching applied and rejected jobs
  useEffect(() => {
    async function fetchData(status: "applied" | "rejected") {
      try {
        const apps = await fetchApps(token, status);
        status === "applied"
          ? setAppliedJobs(apps.length)
          : setRejectedJobs(apps.length);
      } catch (error) {
        console.error(`Failed to fetch ${status} jobs:`, error);
      }
    }
    fetchData("applied");
    fetchData("rejected");
  }, [token, refreshKey]);

  // Fetching total jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/jobs`
        );
        setTotalJobs(response.data.length);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, [refreshKey]); // Also refresh when the key changes

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5 py-5">
      <button
        className="card-item flex items-center bg-green-100 border-2 border-green-400 p-6 rounded-lg shadow-sm hover:bg-green-400 transition duration-400 ease-in-out"
        onClick={() => handleSelect(0)}
      >
        <div className="content min-w-24">
          <div className="text-3xl font-semibold text-gray-800 mb-2">
            {appliedJobs}
          </div>
          <div className="text-sm font-semibold text-gray-800">
            Applied jobs
          </div>
        </div>
        <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-auto text-green-400 bg-white">
          <BriefcaseIcon className="h-10 w-10 text-green-400" />
        </div>
      </button>
      <button
        className="card-item flex items-center bg-yellow-100 border-2 border-yellow-400 p-6 rounded-lg shadow-sm hover:bg-yellow-400 transition duration-400 ease-in-out"
        onClick={() => handleSelect(1)}
      >
        <div className="content min-w-24">
          <div className="text-3xl font-semibold text-gray-800 mb-2">
            {totalJobs}
          </div>
          <div className="text-sm font-semibold text-gray-800">Total jobs</div>
        </div>
        <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-auto text-yellow-400 bg-white">
          <BookmarkIcon className="h-10 w-10 text-yellow-400" />
        </div>
      </button>
      <button
        className="card-item flex items-center bg-red-100 border-2 border-red-400 p-6 rounded-lg shadow-sm hover:bg-red-400 transition duration-400 ease-in-out"
        onClick={() => handleSelect(2)}
      >
        <div className="content min-w-24">
          <div className="text-3xl font-semibold text-gray-800 mb-2">
            {rejectedJobs}
          </div>
          <div className="text-sm font-semibold text-gray-800">
            Rejected jobs
          </div>
        </div>
        <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-auto text-red-400 bg-white">
          <ExclamationCircleIcon className="h-10 w-10 text-red-400" />
        </div>
      </button>
    </div>
  );
}

export default CategoryList;
