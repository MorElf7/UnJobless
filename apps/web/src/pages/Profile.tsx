import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../services/profileService';

interface User {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    linkedin?: string;
    website?: string;
    github?: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
    resumeUrl: string;
    resumeFileName: string;
    coverLetterUrl: string;
    coverLetterFileName: string;
    education: string[];
    experience: string[];
    sponsorship?: string[];
    legally_authorized?: string;
    gender?: string;
    race?: string;
    veteran?: string;
    disability?: string;
}

export const Profile = () => {
    // Define the initial profile state directly
    const token = localStorage.getItem("token");
    const [profile, setProfile] = useState<User>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        resumeUrl: "",
        resumeFileName: "",
        coverLetterUrl: "",
        coverLetterFileName: "",
        education: [],
        experience: [],
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const profile = await fetchProfile(token as string);
            setProfile(profile);
        };

        fetchData();
    }, []);


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
        // <div className="bg-gray-100">
            <div className="container mx-auto py-8">
                {editMode ? (
                    // ----------------------------------EDIT MODE----------------------------------
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        {/* --------------------Info Card-------------------- */}
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <label>First name</label>
                                <input name="first_name" value={profile.first_name} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="First Name" />
                                <label>Last name</label>
                                <input name="last_name" value={profile.last_name} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Last Name" />
                                <label>Email</label>
                                <input name="email" value={profile.email} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Email" />
                                <hr className="mt-4 mb-6 border-t border-gray-300" />
                                <label>Phone</label>
                                <input name="phone" value={profile.phone} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Phone" />
                                <label>Address</label>
                                <input name="street_address" value={profile.street_address} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Street address" />
                                <input name="city" value={profile.city} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="City" />
                                <input name="state" value={profile.state} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="State" />
                                <input name="zip_code" value={profile.zip_code} onChange={handleFieldChange} className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Zip code" />
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                <button onClick={handleSaveClick} className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                            </div>
                        </div>

                        {/* --------------------Achievement Card-------------------- */}
                        <div className="col-span-4 sm:col-span-9">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-bold mt-6 mb-4">Education</h2>
                                {profile.education.map((education, index) => (
                                    <div className="pb-5">
                                        <p>Description</p>
                                        <textarea name="description" value={education} onChange={(e) => handleArrayChange('education', index, e)} rows={3} className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" ></textarea>
                                        <button onClick={() => removeFromArray('education', index)} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addToArray('education')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Add Education</button>
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                                <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                                {profile.experience.map((experience, index) => (
                                    <div className="pb-5">
                                        <p>Description</p>
                                        <textarea name="description" value={experience} onChange={(e) => handleArrayChange('experience', index, e)} rows={3} className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" ></textarea>
                                        <button onClick={() => removeFromArray('experience', index)} className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded">Remove</button>
                                    </div>
                                ))}
                                <button onClick={() => addToArray('experience')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Add Experience</button>
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                            </div>
                        </div>
                    </div>
                ) : (
                    // ----------------------------------VIEW MODE----------------------------------
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        {/* --------------------Info Card-------------------- */}
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="flex flex-col items-center">
                                    <h1 className="text-xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h1>
                                    <p className="text-sm text-gray-600">{profile.email}</p>
                                </div>
                                <hr className="mt-4 mb-6 border-t border-gray-300" />
                                <div className="flex flex-col items-left text-gray-700">
                                    <p className="text-sm text-gray-600">Email: {profile.phone}</p>
                                    <p className="text-sm text-gray-600 pb-2">Address: {`${profile.street_address}, ${profile.city}, ${profile.state} ${profile.zip_code}`}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                <button onClick={handleEditClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                            </div>
                        </div>

                        {/* --------------------Achievement Card-------------------- */}
                        <div className="col-span-4 sm:col-span-9">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-bold mt-6 mb-4">Education</h2>
                                {profile.education.map(education => (
                                    <div className="mb-6">
                                        <p className="mt-2">{education}</p>
                                    </div>
                                ))}
                                <hr className="mt-7 mb-2 border-t border-gray-300" />

                                <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                                {profile.experience.map(experience => (
                                    <div className="mb-6">
                                        <p className="mt-2">{experience}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        // </div>
    );
};
