import { useState } from 'react';

export const Profile = () => {
    // Define the initial profile state directly
    const [profile, setProfile] = useState({
        username: "superjohn",
        password: "sussybaka123",
        profilePic: "https://www.sideshow.com/storage/product-images/907470/red-ranger_mighty-morphin-power-rangers_square.jpg", // Placeholder for user image
        fullName: "John Software",
        email: "lordjohny@gmail.com",
        school: "UMass Amherst",
        degree: "B.S. in Computer Science",
        gpa: 3.96,
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
                    // ----------------------------------EDIT MODE----------------------------------
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                    <img src={profile.profilePic} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                                </div>
                                <label>Full name</label>
                                <input name="fullName" value={profile.fullName} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Full Name" />
                                <label>Email</label>
                                <input name="email" value={profile.email} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Email" />
                                <label>School</label>
                                <input name="school" value={profile.school} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="School" />
                                <label>Degree</label>
                                <input name="degree" value={profile.degree} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Degree" />
                                <label>GPA</label>
                                <input name="gpa" value={profile.gpa} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="GPA" />
                                <hr className="mt-4 mb-6 border-t border-gray-300" />
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
                                <hr className="my-2 border-t border-gray-300" />

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
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

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
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                                <h2 className="text-xl font-bold mt-6 mb-4">Skills</h2>
                                {profile.skills.map((skill, index) => (
                                    <div key={index}>
                                        <input type="text" value={skill} onChange={(e) => handleArrayChange('skills', index, e)} className="mb-4 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <button onClick={() => removeFromArray('skills', index)} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addToArray('skills')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Add Skill</button>
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                                <h2 className="text-xl font-bold mt-6 mb-4">Relevant Coursework</h2>
                                {profile.courses.map((course, index) => (
                                    <div key={index}>
                                        <input type="text" value={course} onChange={(e) => handleArrayChange('courses', index, e)} className="mb-4 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                                        <button onClick={() => removeFromArray('courses', index)} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addToArray('courses')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Add Course</button>
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

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
                    // ----------------------------------VIEW MODE----------------------------------
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                    <img src={profile.profilePic} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                                    <h1 className="text-xl font-bold">{profile.fullName}</h1>
                                    <p className="text-sm text-gray-600 pb-2">{profile.email}</p>
                                </div>
                                <div className="flex flex-col items-left text-gray-700">
                                    <p>{profile.school}</p>
                                    <p>{profile.degree}</p>
                                    <p>GPA: {profile.gpa}</p>
                                </div>
                                <hr className="mt-4 mb-6 border-t border-gray-300" />
                                <div className="flex flex-col text-gray-700">
                                    <p>Username: {profile.username}</p>
                                    <p className="mt-3">Password: {profile.password}</p>
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
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                                <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                                {profile.experience.map(experience => (
                                    <div className="mb-6">
                                        <div className="flex justify-between flex-wrap gap-2 w-full text-gray-700">
                                            <span className="font-bold">{experience.title}</span>
                                            <p>
                                                <span className="mr-2">{experience.time}</span>
                                            </p>
                                        </div>
                                        <div className="flex justify-between flex-wrap gap-2 w-full text-gray-700">
                                            <span>{experience.company}</span>
                                            <p>
                                                <span className="mr-2">{experience.location}</span>
                                            </p>
                                        </div>
                                        <p className="mt-2">{experience.description}</p>
                                    </div>
                                ))}
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                                <h2 className="text-xl font-bold mt-6 mb-4">Projects</h2>
                                {profile.projects.map(project => (
                                    <div className="mb-6">
                                        <div className="flex justify-between flex-wrap gap-2 w-full text-gray-700">
                                            <span className="font-bold">{project.title}</span>
                                            <p>
                                                <span className="mr-2">{project.time}</span>
                                            </p>
                                        </div>
                                        <p className="mt-2">{project.description}</p>
                                    </div>
                                ))}
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                                <h2 className="text-xl font-bold mt-6 mb-4">Skills</h2>
                                {profile.skills.map((skill, index) => (
                                    <span key={skill} className="text-gray-700">
                                        {skill}
                                        {index !== profile.skills.length - 1 && ', '}
                                    </span>
                                ))}
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                                <h2 className="text-xl font-bold mt-6 mb-4">Relevant Coursework</h2>
                                {profile.courses.map((course, index) => (
                                    <span key={course} className="text-gray-700">
                                        {course}
                                        {index !== profile.courses.length - 1 && ', '}
                                    </span>
                                ))}
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                                <div className="flex flex-col">
                                    <h2 className="text-xl font-bold mt-6 mb-4">Awards</h2>
                                    <ul>
                                        {profile.awards.map(award => (<li className="mb-2 text-gray-700">{award}</li>))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};