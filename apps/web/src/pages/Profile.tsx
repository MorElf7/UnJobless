import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/profileService";
import { fetchSchools, fetchCompanies } from "../services/locationService";
import { EducationEntry, ExperienceEntry, Option } from "../types/types";
import { updateProfile } from "../services/profileService";
import { User } from "../types/types";

interface DropdownOptions {
  [key: number]: Option[];
}

type EducationKeys = keyof EducationEntry;
type ExperienceKeys = keyof ExperienceEntry;

export const Profile = () => {
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
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [schoolDropdowns, setSchoolDropdowns] = useState<DropdownOptions>({});
  const [companyDropdowns, setCompanyDropdowns] = useState<DropdownOptions>({});

  const prepareFormData = () => {
    const formData = new FormData();

    formData.append("first_name", profile.first_name);
    formData.append("last_name", profile.last_name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("linkedin", profile.linkedin || "");
    formData.append("website", profile.website || "");
    formData.append("github", profile.github || "");
    formData.append("street_address", profile.street_address);
    formData.append("city", profile.city);
    formData.append("state", profile.state);
    formData.append("zip_code", profile.zip_code);
    formData.append("sponsorship", profile.sponsorship || "");
    formData.append("legally_authorized", profile.legally_authorized || "");
    formData.append("gender", profile.gender || "");
    formData.append("veteran", profile.veteran || "");
    formData.append("disability", profile.disability || "");
    formData.append("race", profile.race || "");

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }
    if (coverLetterFile) {
      formData.append("coverLetter", coverLetterFile);
    }

    // Append JSON stringified arrays
    formData.append("education", JSON.stringify(profile.education));
    formData.append("experience", JSON.stringify(profile.experience));

    return formData;
  };

  const handleAddEducation = () => {
    const newEducation = {
      school: "",
      major: "",
      degree: "",
      startDate: "",
      endDate: "",
      gpa: undefined,
      logo: undefined,
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      education: [...prevProfile.education, newEducation],
    }));
  };

  const handleAddExperience = () => {
    const newExperience = {
      position: "",
      company: "",
      location: "",
      current: false,
      description: "",
      startDate: "",
      endDate: "",
      logo: undefined,
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      experience: [...prevProfile.experience, newExperience],
    }));
  };

  const handleCheckboxChange = (
    key: string,
    index: number,
    field: keyof ExperienceEntry,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.checked;
    const updatedArray = [
      ...(profile[key as keyof User] as Array<ExperienceEntry>),
    ];
    const updatedItem = { ...updatedArray[index], [field]: value };
    updatedArray[index] = updatedItem;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: updatedArray,
    }));
  };

  const handleSchoolSearch = async (value: string, index: number) => {
    if (value.length > 1) {
      const schools = await fetchSchools(value);
      setSchoolDropdowns((prev) => ({ ...prev, [index]: schools.slice(0, 5) }));
    } else {
      setSchoolDropdowns((prev) => ({ ...prev, [index]: [] }));
    }
  };

  const handleCompanySearch = async (value: string, index: number) => {
    if (value.length > 1) {
      const companies = await fetchCompanies(value);
      setCompanyDropdowns((prev) => ({
        ...prev,
        [index]: companies.slice(0, 5),
      }));
    } else {
      setCompanyDropdowns((prev) => ({ ...prev, [index]: [] }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await fetchProfile(token as string);
      // console.log("Received profile data:", profileData);
      setProfile(profileData);
    };
    fetchData();
  }, [token]);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => {
      const updatedProfile = {
        ...prevProfile,
        [name]: value,
      };
      return updatedProfile;
    });
  };

  // Handle ISO-8601 date rendering
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  // Formate date for input field
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "resume" | "coverLetter"
  ) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (field === "resume") {
      setResumeFile(file);
    } else if (field === "coverLetter") {
      setCoverLetterFile(file);
    }
  };

  const handleArrayChange = (
    key: string,
    index: number,
    field: EducationKeys | ExperienceKeys,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedArray = [
      ...(profile[key as keyof User] as Array<
        EducationEntry | ExperienceEntry
      >),
    ];
    const updatedItem = { ...updatedArray[index], [field]: event.target.value };
    updatedArray[index] = updatedItem;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: updatedArray,
    }));
  };

  const addToArray = (
    key: string,
    newItem: EducationEntry | ExperienceEntry
  ) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: [
        ...(prevProfile[key as keyof User] as Array<
          EducationEntry | ExperienceEntry
        >),
        newItem,
      ],
    }));
  };

  const removeFromArray = (key: string, index: number) => {
    const updatedArray = [
      ...(profile[key as keyof User] as Array<
        EducationEntry | ExperienceEntry
      >),
    ];
    updatedArray.splice(index, 1);
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: updatedArray,
    }));
  };

  const isValidEducation = (edu: EducationEntry) => {
    return (
      edu.school && edu.major && edu.degree && edu.startDate && edu.endDate
    );
  };

  const isValidExperience = (exp: ExperienceEntry) => {
    return exp.position && exp.company && exp.startDate && exp.endDate;
  };

  const handleSaveClick = async () => {
    const { first_name, last_name, email, phone } = profile;
    if (!first_name || !last_name || !email || !phone) {
      alert("Please fill in all required fields.");
      return; // Stop the save operation if any required field is missing
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Existing education and experience validation
    for (let edu of profile.education) {
      if (!isValidEducation(edu)) {
        alert("Please fill in all required fields for all education entries.");
        return;
      }
    }
    for (let exp of profile.experience) {
      if (!isValidExperience(exp)) {
        alert("Please fill in all required fields for all experience entries.");
        return;
      }
    }

    const formData = prepareFormData();
    try {
      // print all entries of Form Data
      // First, cast the FormData object to an array
      // const formDataArray = Array.from(formData.entries());
      // // Then, loop through the array and print each key-value pair
      // for (let pair of formDataArray) {
      //   console.log(pair[0], pair[1]);
      // }
      const updatedProfileData = await updateProfile(formData, token as string);
      // Remove the password field from updated profile data
      delete updatedProfileData.password;
      // console.log("Updated profile data:", updatedProfileData)
      setProfile(updatedProfileData);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <div className="container mx-auto py-8">
      {editMode ? (
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3 bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="first_name" className="block">
                  First name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  value={profile.first_name}
                  onChange={handleFieldChange}
                  className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block">
                  Last name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  value={profile.last_name}
                  onChange={handleFieldChange}
                  className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleFieldChange}
                  className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleFieldChange}
                  className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="linkedin" className="block">
                LinkedIn
              </label>
              <input
                id="linkedin"
                name="linkedin"
                value={profile.linkedin || ""}
                onChange={handleFieldChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                placeholder="LinkedIn Profile URL"
              />
            </div>
            <div>
              <label htmlFor="website" className="block">
                Website
              </label>
              <input
                id="website"
                name="website"
                value={profile.website || ""}
                onChange={handleFieldChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                placeholder="Personal or Company Website"
              />
            </div>
            <div>
              <label htmlFor="github" className="block">
                GitHub
              </label>
              <input
                id="github"
                name="github"
                value={profile.github || ""}
                onChange={handleFieldChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                placeholder="GitHub Profile URL"
              />
            </div>
            <div>
              <label htmlFor="street_address" className="block">
                Street Address
              </label>
              <input
                id="street_address"
                name="street_address"
                value={profile.street_address}
                onChange={handleFieldChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="city" className="block">
                City
              </label>
              <input
                id="city"
                name="city"
                value={profile.city}
                onChange={handleFieldChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="state" className="block">
                State
              </label>
              <input
                id="state"
                name="state"
                value={profile.state}
                onChange={handleFieldChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="zip_code" className="block">
                Zip Code
              </label>
              <input
                id="zip_code"
                name="zip_code"
                value={profile.zip_code}
                onChange={handleFieldChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="sponsorship" className="block">
                Sponsorship
              </label>
              <select
                id="sponsorship"
                name="sponsorship"
                value={profile.sponsorship || ""}
                onChange={handleSelectChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="legally_authorized" className="block">
                Legally Authorized
              </label>
              <select
                id="legally_authorized"
                name="legally_authorized"
                value={profile.legally_authorized || ""}
                onChange={handleSelectChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="block">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profile.gender || ""}
                onChange={handleSelectChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="race" className="block">
                Race
              </label>
              <select
                id="race"
                name="race"
                value={profile.race || ""}
                onChange={handleSelectChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              >
                <option value="Asian">Asian</option>
                <option value="Black">Black</option>
                <option value="Hispanic">Hispanic</option>
                <option value="White">White</option>
                <option value="Mixed">Mixed</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="veteran" className="block">
                Veteran
              </label>
              <select
                id="veteran"
                name="veteran"
                value={profile.veteran || ""}
                onChange={handleSelectChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="disability" className="block">
                Disability
              </label>
              <select
                id="disability"
                name="disability"
                value={profile.disability || ""}
                onChange={handleSelectChange}
                className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-span-4 sm:col-span-9 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mt-6 mb-4">Documents</h2>
              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700"
                >
                  Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={(e) => handleFileChange(e, "resume")}
                  className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cover Letter
                </label>
                <input
                  type="file"
                  id="coverLetter"
                  name="coverLetter"
                  onChange={(e) => handleFileChange(e, "coverLetter")}
                  className="mb-4 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSaveClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mt-6 mb-4">Education</h2>
            {profile.education.length === 0 ? (
              <button
                onClick={handleAddEducation}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add your first education!
              </button>
            ) : (
              profile.education.map((edu, index) => (
                <div key={index} className="pb-5">
                  <div key={index} className="pb-5 relative">
                    <input
                      type="text"
                      name="school"
                      value={edu.school}
                      onChange={(e) => {
                        handleArrayChange("education", index, "school", e);
                        handleSchoolSearch(e.target.value, index);
                      }}
                      className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                      placeholder="School"
                    />

                    {schoolDropdowns[index] && (
                      <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-y-auto border-gray-300 border rounded-md mt-1">
                        {schoolDropdowns[index].map((school, schoolIndex) => (
                          <li
                            key={schoolIndex}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                            onClick={() => {
                              const updatedArray = [...profile.education];
                              updatedArray[index] = {
                                ...updatedArray[index],
                                school: school.name,
                                logo: school.logo,
                              };
                              setProfile((prevProfile) => ({
                                ...prevProfile,
                                education: updatedArray,
                              }));
                              setSchoolDropdowns((prev) => ({
                                ...prev,
                                [index]: [],
                              }));
                            }}
                          >
                            {school.name}
                            <img
                              src={school.logo}
                              alt={`${school.name} logo`}
                              className="w-12 h-7 object-cover rounded-md"
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <input
                    type="text"
                    name="major"
                    value={edu.major}
                    onChange={(e) =>
                      handleArrayChange("education", index, "major", e)
                    }
                    className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Major"
                  />
                  <input
                    type="text"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) =>
                      handleArrayChange("education", index, "degree", e)
                    }
                    className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Degree"
                  />
                  <input
                    type="text"
                    name="gpa"
                    value={edu.gpa?.toString()}
                    onChange={(e) =>
                      handleArrayChange("education", index, "gpa", e)
                    }
                    className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="GPA"
                  />
                  <input
                    type="date"
                    name="startDate"
                    value={formatDateForInput(edu.startDate)}
                    onChange={(e) =>
                      handleArrayChange("education", index, "startDate", e)
                    }
                    className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={formatDateForInput(edu.endDate || "")}
                    onChange={(e) =>
                      handleArrayChange("education", index, "endDate", e)
                    }
                    className="mb-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  />
                  <button
                    onClick={() => removeFromArray("education", index)}
                    className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                  {index === profile.education.length - 1 && (
                    <button
                      onClick={() =>
                        addToArray("education", {
                          school: "",
                          major: "",
                          degree: "",
                          startDate: "",
                          endDate: "",
                          gpa: undefined,
                          logo: undefined,
                        })
                      }
                      className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Add
                    </button>
                  )}
                </div>
              ))
            )}

            <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
            {profile.experience.length === 0 ? (
              <button
                onClick={handleAddExperience}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add your first experience!
              </button>
            ) : (
              profile.experience.map((exp, index) => (
                <div key={index} className="pb-5 relative">
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      name="current"
                      checked={exp.current}
                      onChange={(e) =>
                        handleCheckboxChange("experience", index, "current", e)
                      }
                      className="form-checkbox h-5 w-5 text-green-600"
                    />
                    <label
                      className="ml-2 text-gray-700"
                      htmlFor={`current-${index}`}
                    >
                      Current Job
                    </label>
                  </div>
                  <input
                    type="text"
                    name="position"
                    value={exp.position}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "position", e)
                    }
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Position"
                  />
                  <input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => {
                      handleArrayChange("experience", index, "company", e);
                      handleCompanySearch(e.target.value, index);
                    }}
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Company"
                  />
                  {companyDropdowns[index] && (
                    <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-y-auto border-gray-300 border rounded-md mt-1">
                      {companyDropdowns[index].map((company, companyIndex) => (
                        <li
                          key={companyIndex}
                          className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                          onClick={() => {
                            const updatedArray = [...profile.experience];
                            updatedArray[index] = {
                              ...updatedArray[index],
                              company: company.name,
                              logo: company.logo,
                            };
                            setProfile((prevProfile) => ({
                              ...prevProfile,
                              experience: updatedArray,
                            }));
                            setCompanyDropdowns((prev) => ({
                              ...prev,
                              [index]: [],
                            }));
                          }}
                        >
                          {company.name}
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="w-12 h-7 object-cover rounded-md"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  <textarea
                    name="description"
                    value={exp.description}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "description", e)
                    }
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Description"
                    rows={3}
                  />
                  <input
                    type="text"
                    name="location"
                    value={exp.location || ""}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "location", e)
                    }
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Location"
                  />
                  <input
                    type="date"
                    name="startDate"
                    value={formatDateForInput(exp.startDate)}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "startDate", e)
                    }
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={formatDateForInput(exp.endDate || "")}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "endDate", e)
                    }
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  />
                  <div className="flex justify-start mt-3">
                    <button
                      onClick={() => removeFromArray("experience", index)}
                      className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
                    >
                      Remove
                    </button>
                    {index === profile.experience.length - 1 && (
                      <button
                        onClick={() =>
                          addToArray("experience", {
                            position: "",
                            company: "",
                            location: "",
                            current: false,
                            description: "",
                            startDate: "",
                            endDate: "",
                            logo: undefined,
                          })
                        }
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3 bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h1>
              <p className="text-sm text-gray-600">{profile.email}</p>
              <p className="text-sm text-gray-600">Phone: {profile.phone}</p>
              <p className="text-sm text-gray-600">
                LinkedIn: {profile.linkedin || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Website: {profile.website || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                GitHub: {profile.github || "N/A"}
              </p>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View current resume
                </a>
              )}
              {profile.coverLetterUrl && (
                <a
                  href={profile.coverLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View current cover letter
                </a>
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleEditClick}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mt-6 mb-4">Education</h2>
            {profile.education.map((edu, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-gray-100 rounded-lg shadow"
              >
                {edu.logo && (
                  <img
                    src={edu.logo}
                    alt="School logo"
                    className="h-10 w-10 mt-2 rounded-full"
                  />
                )}
                <h3 className="text-lg font-semibold">{edu.school}</h3>
                <p>
                  {edu.degree} in {edu.major}, GPA: {edu.gpa || "N/A"}
                </p>
                <p>
                  {formatDate(edu.startDate)} -{" "}
                  {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </p>
              </div>
            ))}
            <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
            {profile.experience.map((exp, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-gray-100 rounded-lg shadow"
              >
                {exp.logo && (
                  <img
                    src={exp.logo}
                    alt="Company logo"
                    className="h-10 w-10 mt-2 rounded-full"
                  />
                )}
                <h3 className="text-lg font-semibold">
                  {exp.position} at {exp.company}
                </h3>
                <p>
                  {formatDate(exp.startDate)} -{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate as string)}
                </p>
                <p>{exp.description}</p>
                {exp.current && (
                  <span className="text-green-500 font-bold">Current Role</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
