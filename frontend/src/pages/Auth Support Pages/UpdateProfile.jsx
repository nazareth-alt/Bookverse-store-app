import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const UpdateProfile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      await updateProfile(user, { displayName });
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage("Failed to update profile.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
        Update
      </button>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default UpdateProfile;

