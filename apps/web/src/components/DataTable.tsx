import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid';
import { PageButton } from './PageButton';

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => {
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const filteredData = useMemo(() => data.filter(item => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(filter.toLowerCase())
    )), [data, filter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      pagination,
    },
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
    manualPagination: false, // Enable automatic pagination
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
  });

  return (
    <div className="mx-8 my-4">
      <div className="flex justify-end items-center mb-4">
        <div>
          <span>Search:</span>
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder={`${filteredData.length} records...`}
            className="ml-2 px-2 py-1 border rounded-md focus:outline-green"
          />
        </div>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="cursor-pointer">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-10 focus:outline-maroon">
        <div>
          <span>Page <strong>{pagination.pageIndex + 1} of {table.getPageCount()}</strong></span>
          <select
            value={pagination.pageSize}
            onChange={e => setPagination(old => ({ ...old, pageSize: parseInt(e.target.value, 10), pageIndex: 0 }))}
            className="ml-2"
          >
            {[5, 10, 20].map(size => (
              <option key={size} value={size}>Show {size}</option>
            ))}
          </select>
        </div>
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <PageButton className="rounded-l-md" onClick={() => setPagination(old => ({ ...old, pageIndex: 0 }))} disabled={pagination.pageIndex === 0}>
            <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </PageButton>
          <PageButton onClick={() => setPagination(old => ({ ...old, pageIndex: Math.max(0, old.pageIndex - 1) }))} disabled={pagination.pageIndex === 0}>
            <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </PageButton>
          <PageButton onClick={() => setPagination(old => ({ ...old, pageIndex: old.pageIndex + 1 }))} disabled={pagination.pageIndex >= table.getPageCount() - 1}>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </PageButton>
          <PageButton className="rounded-r-md" onClick={() => setPagination(old => ({ ...old, pageIndex: table.getPageCount() - 1 }))} disabled={pagination.pageIndex >= table.getPageCount() - 1}>
            <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </PageButton>
        </nav>
      </div>
    </div>
  );
};


