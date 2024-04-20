function JobList() {
    const companies = ["Amazon", "Facebook", "Meta", "Microsoft", "UMass Amherst"];
    const positions = ["Software Engineer", "Software Engineer", "Software Engineer", "Software Engineer", "Dish Washer"];

    return (
        <div className="flex flex-col items-center justify-center my-4">
            {companies.map((company, id) => (
                <div className="flex items-center justify-between w-full max-w-4xl bg-white p-5 my-5 rounded-lg border-2 border-green-500">
                    <div className="flex items-center">
                        <div className="h-16 w-16 bg-white rounded-full overflow-hidden shadow-lg">
                            <img src="#" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-5">
                            <span className="block font-semibold text-lg">{company}</span>
                            <p className="text-sm">{positions[id]}</p>
                        </div>
                    </div>
                    <a href="#" className="px-4 py-2 rounded-full bg-green-500 text-white transition duration-300 ease-in-out hover:bg-green-600">Apply</a>
                </div>
            ))}
        </div>
    );
}

export default JobList;