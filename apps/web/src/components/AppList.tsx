import React, { useEffect, useState } from 'react';
import apiService from '../service/apiService';
import { AppTable } from './AppTable';

interface Application {
  jid: {
    title: string;
    company: string;
    link: string;
    image: string;
    address: string;
    salary: number;
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiService.get("/applications/me");
      const fetchedApps = response.data
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
    { accessorKey: 'dateApplied', header: 'Date Applied' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: null, header: 'Action' },
  ];

  return <AppTable columns={columns} data={apps} />;
};

export default AppList;