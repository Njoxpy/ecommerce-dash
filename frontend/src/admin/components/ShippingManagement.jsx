import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ShippingManagementPage = () => {
  const [shippingMethods, setShippingMethods] = useState([
    {
      id: 1,
      name: "Standard Shipping",
      description: "Delivered in 5-7 business days.",
      rate: 5.99,
      active: true,
      regions: ["US", "CA"],
    },
    {
      id: 2,
      name: "Express Shipping",
      description: "Delivered in 2-3 business days.",
      rate: 12.99,
      active: true,
      regions: ["US", "CA", "EU"],
    },
    {
      id: 3,
      name: "Free Shipping",
      description: "Free delivery for orders over $50.",
      rate: 0.0,
      active: true,
      regions: ["US"],
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleAddMethod = (newMethod) => {
    setShippingMethods([
      ...shippingMethods,
      { ...newMethod, id: shippingMethods.length + 1 },
    ]);
    setIsAddModalOpen(false);
  };

  const handleEditMethod = (updatedMethod) => {
    setShippingMethods(
      shippingMethods.map((method) =>
        method.id === updatedMethod.id ? updatedMethod : method
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteMethod = (id) => {
    setShippingMethods(shippingMethods.filter((method) => method.id !== id));
    setIsDeleteModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    setShippingMethods(
      shippingMethods.map((method) =>
        method.id === id ? { ...method, active: !method.active } : method
      )
    );
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMethods = shippingMethods.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Shipping Management
      </h1>

      {/* Add New Shipping Method Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#1C86EE] mb-6"
      >
        <Plus size={16} className="mr-2" />
        Add New Shipping Method
      </button>

      {/* Shipping Methods Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Rate</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentMethods.map((method) => (
                <tr key={method.id} className="text-sm text-gray-700">
                  <td className="px-6 py-4">{method.name}</td>
                  <td className="px-6 py-4">{method.description}</td>
                  <td className="px-6 py-4">${method.rate.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(method.id)}
                      className={`px-2 py-1 rounded-full text-xs ${
                        method.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {method.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedMethod(method);
                        setIsEditModalOpen(true);
                      }}
                      className="text-[#1E90FF] hover:text-[#1C86EE] mr-4"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMethod(method);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-[#FF6347] hover:text-[#EE5A42]"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:text-[#1E90FF] disabled:text-gray-300"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of{" "}
              {Math.ceil(shippingMethods.length / itemsPerPage)}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(shippingMethods.length / itemsPerPage)
              }
              className="p-2 text-gray-600 hover:text-[#1E90FF] disabled:text-gray-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Shipping Method Modal */}
      {isAddModalOpen && (
        <ShippingMethodForm
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddMethod}
        />
      )}

      {/* Edit Shipping Method Modal */}
      {isEditModalOpen && (
        <ShippingMethodForm
          method={selectedMethod}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditMethod}
        />
      )}

      {/* Delete Shipping Method Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Delete Shipping Method</h2>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the shipping method{" "}
              <strong>{selectedMethod?.name}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMethod(selectedMethod.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Shipping Method Form Component
const ShippingMethodForm = ({ method, onClose, onSubmit }) => {
  const [name, setName] = useState(method ? method.name : "");
  const [description, setDescription] = useState(
    method ? method.description : ""
  );
  const [rate, setRate] = useState(method ? method.rate : "");
  const [regions, setRegions] = useState(method ? method.regions : []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: method ? method.id : null,
      name,
      description,
      rate: parseFloat(rate),
      active: true,
      regions,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {method ? "Edit Shipping Method" : "Add New Shipping Method"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rate
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Regions
            </label>
            <select
              multiple
              value={regions}
              onChange={(e) =>
                setRegions(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              required
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="EU">Europe</option>
              <option value="AU">Australia</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg hover:bg-[#1C86EE]"
            >
              {method ? "Save Changes" : "Add Method"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingManagementPage;
