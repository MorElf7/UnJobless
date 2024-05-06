import React, { useEffect, useState } from 'react';
import apiService from '../app/apiService';
import { DataTable } from './DataTable';

interface Job {
  position: string;
  company: string;
  location: string;
  salary: number;
  appliedDate: string;
  status: "Opening" | "Closed";
  url: string;
}

interface JobListProps {
  num_jobs: number; // Define the prop type for limit
}

const JobList: React.FC<JobListProps> = ({ num_jobs }) => { // Receive the limit prop
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.get("/jobs", { params: { limit: num_jobs } });
      setJobs(response.data.data.jobs);
    };

    fetchData();
  }, []);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Job',
      render: (data: Job) => (
        <>
          <div>{data.position}</div>
          <div>{data.company}</div>
          <div>{data.location}</div>
          <div>{data.salary}</div>
        </>
      )
    },
    { accessorKey: 'appliedDate', header: 'Date Applied' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'url', header: 'Action' },
  ];

  return <DataTable columns={columns} data={jobs} />;
};

export default JobList;