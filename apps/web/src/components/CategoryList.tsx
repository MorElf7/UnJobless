function CategoryList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mt-36 mb-36 gap-5 p-5">
            <a href="#" className="card-item bg-green-50 border border-green-200 p-6 rounded-lg shadow-sm hover:bg-green-200 transition duration-500 ease-in-out">
                <div className="text-3xl font-semibold text-gray-800 mb-3">300</div>
                <div className="text-sm font-semibold text-gray-800">Applied jobs</div>
                <div className="icon flex items-center justify-center h-10 w-10 rounded-lg mt-10 text-green-200 bg-white">
                    <i className="bx bxs-briefcase"></i>
                </div>
            </a>
            <a href="#" className="card-item bg-yellow-50 border border-yellow-200 p-6 rounded-lg shadow-sm hover:bg-yellow-200 transition duration-500 ease-in-out">
                <div className="text-3xl font-semibold text-gray-800 mb-3">300</div>
                <div className="text-sm font-semibold text-gray-800">Alert jobs</div>
                <div className="icon flex items-center justify-center h-10 w-10 rounded-lg mt-10 text-yellow-200 bg-white">
                    <i className="bx bxs-bookmark"></i>
                </div>
            </a>
            <a href="#" className="card-item bg-red-50 border border-red-200 p-6 rounded-lg shadow-sm hover:bg-red-200 transition duration-500 ease-in-out">
                <div className="text-3xl font-semibold text-gray-800 mb-3">300</div>
                <div className="text-sm font-semibold text-gray-800">Rejected jobs</div>
                <div className="icon flex items-center justify-center h-10 w-10 rounded-lg mt-10 text-red-200 bg-white">
                    <i className="bx bxs-error-circle"></i>
                </div>
            </a>
        </div>
    );
}

export default CategoryList;