import "../styles/JobList.scss";

function JobList() {
    const companies = ["Amazon", "Facebook", "Meta", "Microsoft", "UMass Amherst"];
    const positions = ["Software Engineer", "Software Engineer", "Software Engineer", "Software Engineer", "Dish Washer"];

    return (
        <div className="jobs">
            {companies.map((company, id) => (
                <div className="card">
                    <div className="content">
                        <div className="img"><img src="#" alt="" /></div>
                        <div className="details">
                            <span className="name">{company}</span>
                            <p>{positions[id]}</p>
                        </div>
                    </div>
                    <a href="#">Apply</a>
                </div>
            ))}
        </div>
    );
}

export default JobList;