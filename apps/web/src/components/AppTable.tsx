import React, { useState, useMemo } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import { PageButton } from "./PageButton";
import { updateAppStatus } from "../services/appService";

interface Application {
  _id: string;
  jid: {
    title: string;
    company: string;
    link: string;
    image: string;
    address: string;
    salary: string;
  };
  accepted: boolean;
  status: "applied" | "rejected";
  appliedDate: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  token: string;
  setApps: React.Dispatch<React.SetStateAction<T[]>>; 
}

export const AppTable = <T extends Application>({
  columns,
  data,
  token,
  setApps,
}: DataTableProps<T>) => {
  const [filter, setFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(filter.toLowerCase())
        )
      ),
    [data, filter]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, 
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
    onPaginationChange: setPagination,
  });

  const handleStatusToggle = async (app: T) => {
    const newStatus = app.status === "applied" ? "rejected" : "applied";
    try {
      console.log(app._id);
      await updateAppStatus(token, app._id, newStatus);
      const updatedApps = data.map((a) =>
        a._id === app._id ? { ...a, status: newStatus } : a
      );
      setApps(updatedApps);
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };


  return (
    <div className="my-4">
      {data.length > 5 && (
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-600" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={`${filteredData.length} records...`}
              className="ml-2 px-2 py-1 border rounded-md focus:outline-none"
            />
          </div>
        </div>
      )}
      <div className="overflow-hidden">
        <table className="w-full border-separate border-spacing-0">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row) => (
              <>
                <tr className="h-3"></tr>
                <tr key={row.id} className="group cursor-pointer">
                  {row.getVisibleCells().map((cell, i) => {
                    const original = row.original as Application;
                    return (
                      <td
                        key={cell.id}
                        className={`px-6 py-4 whitespace-nowrap first:rounded-l-lg last:rounded-r-lg first:border-l-2 last:border-r-2 border-2 border-r-0 border-l-0 border-gray-200 group-hover:border-green-500`}
                      >
                        {i === 0 && (
                          <>
                            <div className="flex items-center">
                              <img
                                src={original.jid.image}
                                alt={original.jid.company}
                                className="w-9 h-9 mr-2"
                              />
                              <div className="ml-3">
                                <div className="mb-1">
                                  <span>{original.jid.title}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPinIcon className="h-3 w-3 text-gray-400 mr-1" />
                                  {original.jid.address &&
                                  /^\s*$/.test(original.jid.address) ===
                                    false ? (
                                    <span className="text-xs text-gray-700 mr-4">
                                      {original.jid.address}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-gray-700 mr-4">
                                      Remote
                                    </span>
                                  )}
                                  <CurrencyDollarIcon className="h-3 w-3 text-gray-400 mr-1" />
                                  {original.jid.salary &&
                                  /^\s*$/.test(original.jid.salary) ===
                                    false ? (
                                    <span className="text-xs text-gray-700">
                                      {original.jid.salary.substring(
                                        0,
                                        original.jid.salary.length - 103
                                      )}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-gray-700">
                                      Negotiable
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {i === 1 &&
                          new Date(original.appliedDate).toLocaleDateString()}
                        {i === 3 ? (
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleStatusToggle(original as T)}
                          >
                            {original.status === "applied"
                              ? "Reject"
                              : "Re-apply"}
                          </button>
                        ) : (
                          <>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 5 && (
        <div className="flex justify-between mt-10 focus:outline-none">
          <div>
            <span>
              Page{" "}
              <strong>
                {pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>{" "}
            </span>
            <select
              value={pagination.pageSize}
              onChange={(e) =>
                setPagination((old) => ({
                  ...old,
                  pageSize: parseInt(e.target.value, 10),
                  pageIndex: 0,
                }))
              }
              className="ml-2"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <PageButton
              className="rounded-l-md"
              onClick={() => setPagination((old) => ({ ...old, pageIndex: 0 }))}
              disabled={pagination.pageIndex === 0}
            >
              <ChevronDoubleLeftIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </PageButton>
            <PageButton
              onClick={() =>
                setPagination((old) => ({
                  ...old,
                  pageIndex: Math.max(0, old.pageIndex - 1),
                }))
              }
              disabled={pagination.pageIndex === 0}
            >
              <ChevronLeftIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </PageButton>
            <PageButton
              onClick={() =>
                setPagination((old) => ({
                  ...old,
                  pageIndex: old.pageIndex + 1,
                }))
              }
              disabled={pagination.pageIndex >= table.getPageCount() - 1}
            >
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </PageButton>
            <PageButton
              className="rounded-r-md"
              onClick={() =>
                setPagination((old) => ({
                  ...old,
                  pageIndex: table.getPageCount() - 1,
                }))
              }
              disabled={pagination.pageIndex >= table.getPageCount() - 1}
            >
              <ChevronDoubleRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </PageButton>
          </nav>
        </div>
      )}
    </div>
  );
};
