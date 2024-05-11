import React, { useEffect, useState } from "react";
import { JobTable } from "./JobTable";
import { fetchJobs } from "../services/jobService";
import { fetchApps } from "../services/appService";

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
      let fetchedJobs = await fetchJobs();
      // First fetch all applied applications
      const token = localStorage.getItem("token");
      const fetchedApps = await fetchApps(token as string, "applied");
      // Fetch all rejected applications
      const fetchedRejectedApps = await fetchApps(token as string, "rejected");
      // Filter out jobs that have been applied to or rejected
      fetchedJobs = fetchedJobs.filter(
        (job: { title: string }) =>
          !fetchedApps.some(
            (app: { jid: { title: string } }) => app.jid.title === job.title
          ) &&
          !fetchedRejectedApps.some(
            (app: { jid: { title: string } }) => app.jid.title === job.title
          )
      );

      const slicedJobs =
        limit !== null ? fetchedJobs.slice(0, limit) : fetchedJobs;
      setJobs(slicedJobs);
    };

    fetchData();
  }, [limit]);

  const columns = [
    {
      accessorKey: "name",
      header: "Job",
      render: (data: Job) => (
        <>
          <div>{data.title}</div>
          <div>{data.company}</div>
          <div>{data.address}</div>
          <div>{data.salary}</div>
        </>
      ),
    },
    { accessorKey: "datePosted", header: "Date Posted" },
    { accessorKey: "link", header: "Action" },
  ];

  return <JobTable columns={columns} data={jobs} />;
};

export default JobList;
