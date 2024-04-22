import React from 'react';
import { DataTable } from './DataTable';

interface Job {
  id: number;
  position: string;
  company: string;
  companyIcon?: string;
  location: string;
  salary: number;
  appliedDate: string;
  status: "Opening" | "Closed";
  url: string;
}

const JobList: React.FC = () => {
  const jobs: Job[] = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    position: `Position ${i}`,
    company: `Company ${i}`,
    companyIcon: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
    location: `City ${i}, State ${i}`,
    salary: (i + 1) * 10000,
    appliedDate: "May 15, 2024",
    status: "Opening",
    url: "https://umassdining.com/student-jobs",
  }));

  const columns = [
    {
      accessorKey: 'name',
      header: 'Job',
      render: (data: Job) => (
        <>
          <div>{data.position}</div>
          <div>{data.company}</div>
          <div>{data.companyIcon}</div>
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