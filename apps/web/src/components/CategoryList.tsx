import { BriefcaseBusiness, Bookmark, CircleAlert } from "lucide-react";

function CategoryList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto gap-5 p-5">
            <a href="#" className="card-item flex bg-green-50 border border-green-200 p-6 rounded-lg shadow-sm hover:bg-green-200 transition duration-500 ease-in-out">
                <div className="content">
                    <div className="text-3xl font-semibold text-gray-800 mb-3">300</div>
                    <div className="text-sm font-semibold text-gray-800">Applied jobs</div>
                </div>
                <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-20 text-green-200 bg-white">
                    <BriefcaseBusiness size={40} fill="#45bc7a" />
                </div>
            </a>
            <a href="#" className="card-item flex bg-yellow-50 border border-yellow-200 p-6 rounded-lg shadow-sm hover:bg-yellow-200 transition duration-500 ease-in-out">
                <div className="content">
                    <div className="text-3xl font-semibold text-gray-800 mb-3">300</div>
                    <div className="text-sm font-semibold text-gray-800">Alert jobs</div>
                </div>
                <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-20 text-yellow-200 bg-white">
                    <Bookmark size={40} fill="#ffd761" />
                </div>
            </a>
            <a href="#" className="card-item flex bg-red-50 border border-red-200 p-6 rounded-lg shadow-sm hover:bg-red-200 transition duration-500 ease-in-out">
                <div className="content">
                    <div className="text-3xl font-semibold text-gray-800 mb-3">300</div>
                    <div className="text-sm font-semibold text-gray-800">Rejected jobs</div>
                </div>
                <div className="icon flex items-center justify-center h-20 w-20 rounded-lg ml-20 text-red-200 bg-white">
                    <CircleAlert size={40} fill="#ff4a5d" />
                </div>
            </a>
        </div>
    );
}

export default CategoryList;