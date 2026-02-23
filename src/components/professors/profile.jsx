import React, { useEffect, useState } from "react";
import { apiProfileGet, apiProfileUpdate } from "../../api/profileHelper";
import { PM_ROOT_API_URL } from "../../api/urls";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [universityInput, setUniversityInput] = useState("");

  // Load profile
  useEffect(() => {
    apiProfileGet(PM_ROOT_API_URL + "/profile").then((profileData) => {
      setProfile(profileData);
      setUniversityInput(profileData.university ?? "");
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    apiProfileUpdate(PM_ROOT_API_URL + "/profile", {
      university: universityInput,
    }).then((updatedProfile) => {
      setProfile(updatedProfile);
    });
  }

  return (
    <div>
      <h2>Profile</h2>

      {profile.id && <p>Profile id: {profile.id}</p>}
      {profile.displayName && <p>Name: {profile.displayName}</p>}
      {(profile.university != null) && <p>University: {profile.university}</p>}
      <hr />

      { (profile.university === null) &&<form onSubmit={handleSubmit}>
        <label>
          Specify your University: 
          <input
            type="text"
            value={universityInput}
            onChange={(e) => setUniversityInput(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>}
    </div>
  );
}