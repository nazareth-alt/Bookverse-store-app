import React, { useState } from "react";
import { deleteUser } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUser(auth.currentUser);
      alert("Account deleted successfully.");
      navigate("/");
    } catch (error) {
      setMessage("Error deleting account. Re-login and try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-red-600">Delete Account</h2>
      <p className="mb-4 text-gray-700">This action cannot be undone.</p>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
        Delete My Account
      </button>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default DeleteAccount;