import React, { useState, useEffect, FC } from 'react';
import {
  useTable,
  usePagination,
  Column,
  TableInstance,
  UsePaginationInstanceProps,
} from 'react-table';
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid';
import { PageButton } from './PageButton';

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

// Extend TableInstance to include pagination props
type TableInstanceWithPagination<D extends object> = TableInstance<D> & UsePaginationInstanceProps<D>;

export const DataTable: FC<DataTableProps<any>> = ({ columns, data }) => {
  const [filter, setFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(0); // Reset to first page with new page size
  };

  useEffect(() => {
    const filtered = data.filter((row) =>
      Object.values(row).some((cell) =>
        String(cell).toLowerCase().includes(filter.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [data, filter]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  } = useTable<any>(
    {
      columns,
      data: filteredData,
    },
    usePagination // Make sure this hook is used to enable pagination properties
  ) as TableInstanceWithPagination<any>;

  return (
    <div className="mx-8 my-4">
        <div className="flex justify-end items-center mb-4">
            <div>
                <span>Search:</span>
                <input
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder={`${filteredData.length} records...`}
                    className="ml-2 px-2 py-1 border rounded-md focus:outline-maroon"
                />
            </div>
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table {...getTableProps()} className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {headerGroups.map((headerGroup, headerGroupIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th {...column.getHeaderProps()} key={columnIndex} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                    {page.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={rowIndex} className="cursor-pointer">
                                {row.cells.map((cell, cellIndex) => (
                                    <td {...cell.getCellProps()} key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <div className="flex justify-between mt-10 focus:outline-maroon">
            <div>
                <span>Page <strong>{pageIndex + 1} of {Math.ceil(filteredData.length / pageSize)}</strong></span>
                <select
                    value={pageSize}
                    onChange={e => handlePageSizeChange(Number(e.target.value))}
                    className="ml-2"
                >
                    {[5, 10, 20].map(pageSizeOption => (
                        <option key={pageSizeOption} value={pageSizeOption}>
                            Show {pageSizeOption}
                        </option>
                    ))}
                </select>
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <PageButton
                    className="rounded-l-md"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                >
                    <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </PageButton>
                <PageButton
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </PageButton>
                <PageButton
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </PageButton>
                <PageButton
                    className="rounded-r-md"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </PageButton>
            </nav>
        </div>
    </div>
);
};