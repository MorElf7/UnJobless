import React from 'react';
import { DataTable } from './DataTable';

interface Course {
  id: number;
  name: string;
  professor: string;
  creditLevel: string;
}

const List: React.FC = () => {
  const courses: Course[] = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    name: `Course ${i}`,
    professor: `Professor ${i}`,
    creditLevel: `Credit Level ${i}`,
  }));

  const columns = [
    { accessorKey: 'name', header: 'Course' },
    { accessorKey: 'professor', header: 'Professor' },
    { accessorKey: 'creditLevel', header: 'Credit Level' },
  ];

  return <DataTable columns={columns} data={courses} />;
};

export default List;