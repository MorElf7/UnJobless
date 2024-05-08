import { BriefcaseIcon, BookmarkIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';

type CategorySelectHandler = (category: number) => void;
interface CategoryListProps {
    onSelect: CategorySelectHandler;
}

function CategoryList({ onSelect }: CategoryListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5 py-5">
            <a href="#" className="card-item flex items-center bg-green-100 border-2 border-green-400 p-6 rounded-lg shadow-sm hover:bg-green-400 transition duration-400 ease-in-out" onClick={() => onSelect(0)}>
                <div className="content min-w-24">
                    <div className="text-3xl font-semibold text-gray-800 mb-2">300</div>
                    <div className="text-sm font-semibold text-gray-800">Applied jobs</div>
                </div>
                <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-auto text-green-400 bg-white">
                    <BriefcaseIcon className="h-10 w-10 text-green-400" />
                </div>
            </a>
            <a href="#" className="card-item flex items-center bg-yellow-100 border-2 border-yellow-400 p-6 rounded-lg shadow-sm hover:bg-yellow-400 transition duration-400 ease-in-out" onClick={() => onSelect(1)}>
                <div className="content min-w-24">
                    <div className="text-3xl font-semibold text-gray-800 mb-2">300</div>
                    <div className="text-sm font-semibold text-gray-800">Alert jobs</div>
                </div>
                <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-auto text-yellow-400 bg-white">
                    <BookmarkIcon className="h-10 w-10 text-yellow-400" />
                </div>
            </a>
            <a href="#" className="card-item flex items-center bg-red-100 border-2 border-red-400 p-6 rounded-lg shadow-sm hover:bg-red-400 transition duration-400 ease-in-out" onClick={() => onSelect(2)}>
                <div className="content min-w-24">
                    <div className="text-3xl font-semibold text-gray-800 mb-2">300</div>
                    <div className="text-sm font-semibold text-gray-800">Rejected jobs</div>
                </div>
                <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-auto text-red-400 bg-white">
                    <ExclamationCircleIcon className="h-10 w-10 text-red-400" />
                </div>
            </a>
        </div>
    );
}

export default CategoryList;
