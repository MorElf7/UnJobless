import React, { useEffect, useState } from 'react';
import { AppTable } from './AppTable';
import { fetchApps } from '../services/appService';
interface Application {
  jid: {
    title: string;
    company: string;
    link: string;
    image: string;
    address: string;
    salary: string;
  },
  accepted: boolean;
  status: "Applied" | "Rejected";
  appliedDate: string;
}

interface AppListProps {
  limit?: number | null;
}

const AppList: React.FC<AppListProps> = ({ limit }) => {
  const [apps, setApps] = useState<Application[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedApps = await fetchApps(token as string);
      const slicedApps = limit !== null ? fetchedApps.slice(0, limit) : fetchedApps;
      setApps(slicedApps);
    };

    fetchData();
  }, []);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Application',
      render: (data: Application) => (
        <>
          <div>{data.jid.title}</div>
          <div>{data.jid.company}</div>
          <div>{data.jid.address}</div>
          <div>{data.jid.salary}</div>
        </>
      )
    },
    { accessorKey: 'appliedDate', header: 'Date Applied' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: null, header: 'Action' },
  ];

  return <AppTable columns={columns} data={apps} />;
};

export default AppList;