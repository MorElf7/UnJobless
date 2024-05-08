import React, { useEffect, useState } from 'react';
import { JobTable } from './JobTable';
import { fetchJobs } from '../services/jobService';

interface Job {
  title: string;
  company: string;
  link: string;
  image: string;
  address: string;
  salary: string;
  datePosted: string;
  _id: string;
}

interface JobListProps {
  limit?: number | null;
}

const JobList: React.FC<JobListProps> = ({ limit }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobs = await fetchJobs();
      const slicedJobs = limit !== null ? fetchedJobs.slice(0, limit) : fetchedJobs;
      setJobs(slicedJobs);
    };

    fetchData();
  }, []);


  const columns = [
    {
      accessorKey: 'name',
      header: 'Job',
      render: (data: Job) => (
        <>
          <div>{data.title}</div>
          <div>{data.company}</div>
          <div>{data.address}</div>
          <div>{data.salary}</div>
        </>
      )
    },
    { accessorKey: 'datePosted', header: 'Date Posted' },
    { accessorKey: 'link', header: 'Action' },
  ];

  return <JobTable columns={columns} data={jobs} />;
};

export default JobList;