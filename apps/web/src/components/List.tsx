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


// import React from 'react';
// import { DataTable } from './DataTable';

// interface Job {
//   id: number;
//   position: string;
//   company: string;
//   companyIcon?: string;
//   location: string;
//   salary: number;
//   appliedDate: string;
//   status: "Active" | "Closed";
//   url: string;
// }

// const List: React.FC = () => {
//   const jobs: Job[] = Array.from({ length: 100 }).map((_, i) => ({
//     id: i,
//     position: "Dish Washer",
//     company: `Company ${i}`,
//     companyIcon: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
//     location: `City ${i}, State ${i}`,
//     salary: i * 10000,
//     appliedDate: "May 15th 2024",
//     status: "Active",
//     url: "https://umassdining.com/student-jobs",
//   }));

//   const columns = [
//     {
//       accessorKey: 'firstColumn',
//       header: 'Job',
//       Cell: (job: Job) => (
//         <>
//           <div>{job.position}</div>
//           <div>{job.company}</div>
//           <div>{job.companyIcon}</div>
//           <div>{job.location}</div>
//           <div>{job.salary}</div>
//         </>
//       )
//     },
//     { accessorKey: 'appliedDate', header: 'Date Applied' },
//     { accessorKey: 'status', header: 'Status' },
//     { accessorKey: 'url', header: 'URL' },
//   ];

//   return <DataTable columns={columns} data={jobs} />;
// };

// export default List;