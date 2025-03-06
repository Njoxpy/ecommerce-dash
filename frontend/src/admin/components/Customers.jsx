import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  ShoppingCart,
  CreditCard,
  MapPin,
  MessageCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Reusable Customer Row Component
const CustomerRow = ({ customer, onViewDetails }) => {
  return (
    <tr className="text-sm text-gray-700 hover:bg-gray-50">
      <td className="px-6 py-4">{customer.name}</td>
      <td className="px-6 py-4">{customer.email}</td>
      <td className="px-6 py-4">{customer.totalOrders}</td>
      <td className="px-6 py-4">${customer.totalSpent.toFixed(2)}</td>
      <td className="px-6 py-4">{customer.registrationDate}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            customer.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {customer.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onViewDetails(customer)}
          className="text-[#1E90FF] hover:text-[#1C86EE] mr-4"
        >
          <User size={16} />
        </button>
        <button className="text-[#FF6347] hover:text-[#EE5A42]">
          <MessageCircle size={16} />
        </button>
      </td>
    </tr>
  );
};

const CustomerManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    orderVolume: "",
    totalSpent: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Sample customer data
  const customers = [
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      totalOrders: 12,
      totalSpent: 1365.5,
      registrationDate: "2023-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@example.com",
      totalOrders: 8,
      totalSpent: 897.5,
      registrationDate: "2023-02-20",
      status: "inactive",
    },
    {
      id: 3,
      name: "Samantha Green",
      email: "samantha.green@example.com",
      totalOrders: 15,
      totalSpent: 1542.0,
      registrationDate: "2023-03-10",
      status: "active",
    },
    {
      id: 4,
      name: "James Bond",
      email: "james.bond@example.com",
      totalOrders: 5,
      totalSpent: 542.0,
      registrationDate: "2023-04-05",
      status: "inactive",
    },
    {
      id: 5,
      name: "Olivia Brown",
      email: "olivia.brown@example.com",
      totalOrders: 20,
      totalSpent: 2200.0,
      registrationDate: "2023-05-12",
      status: "active",
    },
    // Add more customers as needed
  ];

  // Filter and search logic
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status
      ? customer.status === filters.status
      : true;
    const matchesOrderVolume = filters.orderVolume
      ? customer.totalOrders >= parseInt(filters.orderVolume)
      : true;
    const matchesTotalSpent = filters.totalSpent
      ? customer.totalSpent >= parseFloat(filters.totalSpent)
      : true;
    return (
      matchesSearch && matchesStatus && matchesOrderVolume && matchesTotalSpent
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle viewing customer details
  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
  };

  // Close customer details modal
  const closeDetailsModal = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Search Bar and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or registration date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-500"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <input
              type="number"
              placeholder="Min Orders"
              value={filters.orderVolume}
              onChange={(e) =>
                setFilters({ ...filters, orderVolume: e.target.value })
              }
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />

            <input
              type="number"
              placeholder="Min Spent"
              value={filters.totalSpent}
              onChange={(e) =>
                setFilters({ ...filters, totalSpent: e.target.value })
              }
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>
        </div>
      </div>

      {/* Customer List Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Total Orders</th>
              <th className="px-6 py-3 text-left">Total Spent</th>
              <th className="px-6 py-3 text-left">Registration Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCustomers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onViewDetails={handleViewDetails}
              />
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
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
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
            {Math.ceil(filteredCustomers.length / itemsPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredCustomers.length / itemsPerPage)
            }
            className="p-2 text-gray-600 hover:text-[#1E90FF] disabled:text-gray-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Customer Details</h2>
              <button
                onClick={closeDetailsModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <User size={20} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{selectedCustomer.name}</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-gray-500 mr-2" />
                <span className="text-gray-700">{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center">
                <ShoppingCart size={20} className="text-gray-500 mr-2" />
                <span className="text-gray-700">
                  {selectedCustomer.totalOrders} Orders
                </span>
              </div>
              <div className="flex items-center">
                <CreditCard size={20} className="text-gray-500 mr-2" />
                <span className="text-gray-700">
                  ${selectedCustomer.totalSpent.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin size={20} className="text-gray-500 mr-2" />
                <span className="text-gray-700">
                  123 Main St, Springfield, USA
                </span>
              </div>
            </div>

            {/* Order History Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Order History</h3>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Order #ORD-724{index + 6}
                      </span>
                      <span className="text-sm text-gray-500">
                        2023-10-0{index + 1}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-700">$136.50</span>
                      <span className="text-sm text-green-700">Delivered</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagementPage;
