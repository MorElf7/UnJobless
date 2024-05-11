import React, { useEffect, useState } from "react";
import { AppTable } from "./AppTable";
import { fetchApps } from "../services/appService";
import { Application, AppListProps } from "../types/application";

const AppList: React.FC<AppListProps> = ({ limit, appStatus }) => {
  const [apps, setApps] = useState<Application[]>([]);
  const token = localStorage.getItem("token");

  const formatStatus = (status: string) => {
    if (status === "applied") {
      return "Applied";
    } else if (status === "rejected") {
      return "Rejected";
    }
    return status; // Return the original status if it doesn't match expected values.
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedApps = await fetchApps(token as string, appStatus);
      setApps(fetchedApps.slice(0, limit ?? fetchedApps.length));
    };

    fetchData();
  }, [limit, token, appStatus]);

  const columns = [
    {
      accessorKey: "name",
      header: "Application",
      render: (data: Application) => (
        <>
          <div>{data.jid.title}</div>
          <div>{data.jid.company}</div>
          <div>{data.jid.address}</div>
          <div>{data.jid.salary}</div>
        </>
      ),
    },
    {
      accessorKey: "appliedDate",
      header: "Date Applied",
      cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => {
        const status = info.getValue();
        return formatStatus(status);
      },
    },
    { accessorKey: null, header: "Action" },
  ];

  return (
    <AppTable
      columns={columns}
      data={apps}
      token={token as string}
      setApps={setApps}
    />
  );
};

export default AppList;
