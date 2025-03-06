// src/pages/Profile.js
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  // Sample user data (replace with actual data from your backend or context)
  const [user, setUser] = useState({
    name: "Godbless Nyagawa",
    email: "godbless@example.com",
    phone: "+255 123 456 789",
    address: "123 Main St, Dar es Salaam, Tanzania",
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="text-lg font-medium">{user.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <p className="text-lg font-medium">{user.phone}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Address</label>
            <p className="text-lg font-medium">{user.address}</p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to="/edit-profile"
            className="bg-[#1E90FF] text-white px-4 py-2 rounded hover:bg-[#1C86EE]"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
