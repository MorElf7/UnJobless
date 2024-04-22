import { useState } from 'react';

export const Profile = () => {
    // Define the initial profile state directly
    const [profile, setProfile] = useState({
        username: "johnsoftware",
        password: "sussybaka123",
        profilePic: "https://www.sideshow.com/storage/product-images/907470/red-ranger_mighty-morphin-power-rangers_square.jpg", // Placeholder for user image
        fullName: "John Software",
        school: "UMass Amherst",
        degree: "B.S. in Computer Science",
        gpa: 4,
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus estvitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestassuscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctuset ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, inluctus risus rhoncus id.",
        experience: [{ title: "Dish Washer", company: "Amazon", location: "Mars", time: "June 1 - Sept 1", description: "This is a description..." },
        { title: "Tea Server", company: "Paypal", location: "Mars", time: "June 1 - Sept 1", description: "This is a description..." },
        { title: "Prompt Engineer", company: "UMass Amherst", location: "Mars", time: "June 1 - Sept 1", description: "This is a description..." }],
        projects: [{ title: "Summer Break Countdown", time: "June 1 - Sept 1", description: "This is a description..." },
        { title: "Youtube Adblock", time: "June 1 - Sept 1", description: "This is a description..." },
        { title: "ChatAPT", time: "June 1 - Sept 1", description: "This is a description..." }],
        skills: ["Agile Massage", "Segfault Sorcery", "GPT Observer", "Add/Drop React", "Smokey Ninjutsu", "Hugging-Henshin Transform"],
        courses: ["Functional Programming", "Object-oriented Programming", "Data Structures", "Algorithms, Operating Systems", "Software Engineering", "Database Management", "Machine Learning", "Computer Vision"],
        awards: ["Dean's List", "Chancellor's Award", "Best Dish Washer 2024"]
    });

    const [editMode, setEditMode] = useState(false);

    const handleFieldChange = (event: any) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            [event.target.name]: event.target.value
        }));
    };

    const handleArrayChange = (key: string, index: number, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedArray = [...(profile as any)[key]]; // Type assertion
        updatedArray[index] = event.target.value;
        setProfile(prevProfile => ({
            ...prevProfile,
            [key]: updatedArray
        }));
    };

    const addToArray = (key: string) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            [key]: [...(prevProfile as any)[key], ""]
        }));
    };

    const removeFromArray = (key: string, index: number) => {
        const updatedArray = [...(profile as any)[key]]; // Type assertion
        updatedArray.splice(index, 1);
        setProfile(prevProfile => ({
            ...prevProfile,
            [key]: updatedArray
        }));
    };

    const handlePictureChange = (event: any) => {
        const newPicURL = URL.createObjectURL(event.target.files[0]);
        setProfile(prevProfile => ({
            ...prevProfile,
            profilePic: newPicURL
        }));
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        setEditMode(false);
    };

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-8">
                {editMode ? (
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                    <img src={profile.profilePic} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                                </div>
                                <label>Full name</label>
                                <input name="fullName" value={profile.fullName} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Full Name" />
                                <label>School</label>
                                <input name="school" value={profile.school} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="School" />
                                <label>Degree</label>
                                <input name="degree" value={profile.degree} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Degree" />
                                <label>GPA</label>
                                <input name="gpa" value={profile.gpa} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="GPA" />
                                <hr className="my-6 border-t border-gray-300" />
                                <label>Username</label>
                                <input name="username" value={profile.username} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Username" />
                                <label>Password</label>
                                <input name="password" value={profile.password} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Password" />
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                <button onClick={handleSaveClick} className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                            </div>
                        </div>
                        <div className="col-span-4 sm:col-span-9">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">About Me</h2>
                                <textarea name="bio" value={profile.bio} onChange={handleFieldChange} rows={4} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Bio"></textarea>

                                <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                                {profile.experience.map((experience, index) => (
                                    <div key={index} className="pb-5">
                                        <p>Title</p>
                                        <input type="text" name="title" value={experience.title} onChange={(e) => handleArrayChange('experience', index, e)} className="mb-2 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <p>Company</p>
                                        <input type="text" name="company" value={experience.company} onChange={(e) => handleArrayChange('experience', index, e)} className="mb-2 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <p>Location</p>
                                        <input type="text" name="location" value={experience.location} onChange={(e) => handleArrayChange('experience', index, e)} className="mb-2 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <p>Time</p>
                                        <input type="text" name="time" value={experience.time} onChange={(e) => handleArrayChange('experience', index, e)} className="mb-2 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <p>Description</p>
                                        <textarea name="description" value={experience.description} onChange={(e) => handleArrayChange('experience', index, e)} rows={3} className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" ></textarea>
                                        <button onClick={() => removeFromArray('experience', index)} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addToArray('experience')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Add Experience</button>

                                <h2 className="text-xl font-bold mt-6 mb-4">Projects</h2>
                                {profile.projects.map((project, index) => (
                                    <div key={index} className="pb-5">
                                        <p>Title</p>
                                        <input type="text" name="title" value={project.title} onChange={(e) => handleArrayChange('projects', index, e)} className="mb-2 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <p>Time</p>
                                        <input type="text" name="time" value={project.time} onChange={(e) => handleArrayChange('projects', index, e)} className="mb-2 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <p>Description</p>
                                        <textarea name="description" value={project.description} onChange={(e) => handleArrayChange('projects', index, e)} rows={3} className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" ></textarea>
                                        <button onClick={() => removeFromArray('projects', index)} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addToArray('projects')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Add Project</button>

                                <h2 className="text-xl font-bold mt-6 mb-4">Skills</h2>
                                {profile.skills.map((skill, index) => (
                                    <div key={index}>
                                        <input type="text" value={skill} onChange={(e) => handleArrayChange('skills', index, e)} className="mb-4 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <button onClick={() => removeFromArray('skills', index)} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addToArray('skills')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Add Skill</button>

                                <h2 className="text-xl font-bold mt-6 mb-4">Relevant Coursework</h2>
                                {profile.courses.map((course, index) => (
                                    <div key={index}>
                                        <input type="text" value={course} onChange={(e) => handleArrayChange('courses', index, e)} className="mb-4 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <button onClick={() => removeFromArray('courses', index)} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addToArray('courses')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Add Course</button>

                                <h2 className="text-xl font-bold mt-6 mb-4">Awards</h2>
                                {profile.awards.map((award, index) => (
                                    <div key={index}>
                                        <input type="text" value={award} onChange={(e) => handleArrayChange('awards', index, e)} className="mb-4 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <button onClick={() => removeFromArray('awards', index)} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addToArray('awards')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Add Award</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                    <img src={profile.profilePic} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                                    <h1 className="text-xl font-bold pb-2">{profile.fullName}</h1>
                                </div>
                                <div className="flex flex-col items-left">
                                    <p className="items-left text-gray-700">{profile.school}</p>
                                    <p className="items-left text-gray-700">{profile.degree}</p>
                                    <p className="items-left text-gray-700">GPA: {profile.gpa}</p>
                                </div>
                                {/* <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <a href="#" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Contact</a>
                                    <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                                </div> */}
                                <hr className="my-6 border-t border-gray-300" />
                                <div className="flex flex-col">
                                    <p className="text-gray-700">Username: {profile.username}</p>
                                    <p className="text-gray-700 mt-3">Password: {profile.password}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                <button onClick={handleEditClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                            </div>
                        </div>
                        <div className="col-span-4 sm:col-span-9">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">About Me</h2>
                                <p className="text-gray-700">{profile.bio}</p>

                                <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                                {profile.experience.map(experience => (
                                    <div className="mb-6">
                                        <div className="flex justify-between flex-wrap gap-2 w-full">
                                            <span className="text-gray-700 font-bold">{experience.title}</span>
                                            <p>
                                                <span className="text-gray-700 mr-2">{experience.time}</span>
                                            </p>
                                        </div>
                                        <div className="flex justify-between flex-wrap gap-2 w-full">
                                            <span className="text-gray-700">{experience.company}</span>
                                            <p>
                                                <span className="text-gray-700 mr-2">{experience.location}</span>
                                            </p>
                                        </div>
                                        <p className="mt-2">{experience.description}</p>
                                    </div>
                                ))}

                                <h2 className="text-xl font-bold mt-6 mb-4">Projects</h2>
                                {profile.projects.map(project => (
                                    <div className="mb-6">
                                        <div className="flex justify-between flex-wrap gap-2 w-full">
                                            <span className="text-gray-700 font-bold">{project.title}</span>
                                            <p>
                                                <span className="text-gray-700 mr-2">{project.time}</span>
                                            </p>
                                        </div>
                                        <p className="mt-2">{project.description}</p>
                                    </div>
                                ))}

                                <h2 className="text-xl font-bold mt-6 mb-4">Skills</h2>
                                {profile.skills.map((skill, index) => (
                                    <span key={skill} className="text-gray-700">
                                        {skill}
                                        {index !== profile.skills.length - 1 && ', '}
                                    </span>
                                ))}

                                <h2 className="text-xl font-bold mt-6 mb-4">Relevant Coursework</h2>
                                {profile.courses.map((course, index) => (
                                    <span key={course} className="text-gray-700">
                                        {course}
                                        {index !== profile.courses.length - 1 && ', '}
                                    </span>
                                ))}

                                <div className="flex flex-col">
                                    <h2 className="text-xl font-bold mt-6 mb-4">Awards</h2>
                                    <ul>
                                        {profile.awards.map(award => (<li className="mb-2 text-gray-700">{award}</li>))}
                                    </ul>
                                </div>

                                {/* <h3 className="font-semibold text-center mt-3 -mb-2">
                                Find me on
                            </h3>
                            <div className="flex justify-center items-center gap-6 my-6">
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds LinkedIn" href=""
                                    target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                                        <path fill="currentColor"
                                            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
                                        </path>
                                    </svg>
                                </a>
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds YouTube" href=""
                                    target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6">
                                        <path fill="currentColor"
                                            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                                        </path>
                                    </svg>
                                </a>
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Facebook" href=""
                                    target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-6">
                                        <path fill="currentColor"
                                            d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                                        </path>
                                    </svg>
                                </a>
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Instagram" href=""
                                    target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                                        <path fill="currentColor"
                                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                                        </path>
                                    </svg>
                                </a>
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Twitter" href=""
                                    target="_blank">
                                    <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                                        </path>
                                    </svg>
                                </a>
                            </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};