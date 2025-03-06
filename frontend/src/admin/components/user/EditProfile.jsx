// src/pages/EditProfile.js
import { useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {
  // Sample user data (replace with actual data from your backend or context)
  const [user, setUser] = useState({
    name: "Godbless Nyagawa",
    email: "godbless@example.com",
    phone: "+255 123 456 789",
    address: "123 Main St, Dar es Salaam, Tanzania",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save updated profile (e.g., API call)
    console.log("Updated Profile:", user);
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-[#1E90FF] text-white px-4 py-2 rounded hover:bg-[#1C86EE]"
            >
              Save Changes
            </button>
            <Link
              to="/profile"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
