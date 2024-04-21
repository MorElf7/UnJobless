import { useState } from 'react';

export const Profile = () => {
    // Define the initial profile state directly
    const [profile, setProfile] = useState({
        profilePic: '/path/to/default/image.jpg', // Placeholder for user image
        fullName: 'Quang Dang',
        username: 'qdang2025',
        schoolYear: 'Junior',
        major: 'Computer Science',
        bio: 'Hello, I like web dev and ML/AI',
    });

    const [editMode, setEditMode] = useState(false);

    const handleFieldChange = (event: any) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            [event.target.name]: event.target.value
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
        <div className="flex flex-col items-center my-4 bg-white">
            <div className="p-4 rounded-lg border-2 border-gray-500 w-4/5">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200" style={{ backgroundImage: `url(${profile.profilePic})`, backgroundSize: 'cover' }}></div>
                {
                    editMode ? (
                        <>
                            <button className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Upload Profile Picture
                                <input type="file" className="hidden" onChange={handlePictureChange} />
                            </button>
                            <input name="fullName" value={profile.fullName} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Full Name" />
                            <input name="username" value={profile.username} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Username" />
                            <input name="schoolYear" value={profile.schoolYear} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="School Year" />
                            <input name="major" value={profile.major} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Major" />
                            <textarea name="bio" value={profile.bio} onChange={handleFieldChange} rows={4} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Bio"></textarea>
                            <button onClick={handleSaveClick} className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                        </>
                    ) : (
                        <>
                            <h1 className="mb-4 text-xl">{profile.fullName}</h1>
                            <h3 className="mb-4 text-lg">{profile.username}</h3>
                            <p className="mb-4">School Year: {profile.schoolYear}</p>
                            <p className="mb-4">Major: {profile.major}</p>
                            <p className="mb-4">Bio: {profile.bio}</p>
                            <button onClick={handleEditClick} className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                        </>
                    )
                }
            </div>
        </div>
    );
};