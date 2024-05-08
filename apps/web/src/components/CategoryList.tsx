import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BriefcaseIcon, BookmarkIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';

const API_URL = 'https://cs520-backend-kp1wd5z6t-kientos-projects.vercel.app';

type CategorySelectHandler = (category: number) => void;

interface CategoryListProps {
    onSelect: CategorySelectHandler;
    token: string;  // Token is required to fetch applications
}

function CategoryList({ onSelect, token }: CategoryListProps) {
    const [appliedJobs, setAppliedJobs] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);

    // Fetching applications (to count applied jobs)
    useEffect(() => {
        const fetchApps = async () => {
            try {
                const response = await axios.get(`${API_URL}/applications/me?accepted=false`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAppliedJobs(response.data.length);
            } catch (error) {
                console.error('Failed to fetch applications:', error);
            }
        };

        fetchApps();
    }, [token]);

    // Fetching total jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${API_URL}/jobs`);
                setTotalJobs(response.data.length);
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5 py-5">
            <a href="#" className="card-item flex items-center bg-green-100 border-2 border-green-400 p-6 rounded-lg shadow-sm hover:bg-green-400 transition duration-400 ease-in-out" onClick={() => onSelect(0)}>
                <div className="content min-w-24">
                    <div className="text-3xl font-semibold text-gray-800 mb-2">{appliedJobs}</div>
                    <div className="text-sm font-semibold text-gray-800">Applied jobs</div>
                </div>
                <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-auto text-green-400 bg-white">
                    <BriefcaseIcon className="h-10 w-10 text-green-400" />
                </div>
            </a>
            <a href="#" className="card-item flex items-center bg-yellow-100 border-2 border-yellow-400 p-6 rounded-lg shadow-sm hover:bg-yellow-400 transition duration-400 ease-in-out" onClick={() => onSelect(1)}>
                <div className="content min-w-24">
                    <div className="text-3xl font-semibold text-gray-800 mb-2">{totalJobs}</div>
                    <div className="text-sm font-semibold text-gray-800">Total jobs</div>
                </div>
                <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-auto text-yellow-400 bg-white">
                    <BookmarkIcon className="h-10 w-10 text-yellow-400" />
                </div>
            </a>
            {/* Placeholder for rejected jobs, assuming you have an API to fetch this or calculate this */}
            <a href="#" className="card-item flex items-center bg-red-100 border-2 border-red-400 p-6 rounded-lg shadow-sm hover:bg-red-400 transition duration-400 ease-in-out" onClick={() => onSelect(2)}>
                <div className="content min-w-24">
                    <div className="text-3xl font-semibold text-gray-800 mb-2">0</div>
                    <div className="text-sm font-semibold text-gray-800">Rejected jobs</div>
                </div>
                <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-auto text-red-400 bg-white">
                    <ExclamationCircleIcon className="h-10 w-10 text-red-400" />
                </div>
            </a>
        </div>
    );
}

export default CategoryList;
