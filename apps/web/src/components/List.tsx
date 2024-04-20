import { DataTable } from './DataTable'; 

interface Course {
    id: number;
    name: string;
    professor: string;
    creditLevel: string;
}

const List = () => {
    const courses: Course[] = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        name: `Course ${i}`,
        professor: `Professor ${i}`,
        creditLevel: `Credit Level ${i}`,
    }));

    const columns = [
        { Header: 'Course', accessor: 'name' },
        { Header: 'Professor', accessor: 'professor' },
        { Header: 'Credit Level', accessor: 'creditLevel' },
    ];

    return <DataTable columns={columns} data={courses} />;
};

export default List;