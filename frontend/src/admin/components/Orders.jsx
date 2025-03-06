import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Truck,
  Package,
  Clock,
  AlertCircle,
  Edit,
  Trash,
} from "lucide-react";

// Reusable Metric Card Component
const MetricCard = ({ title, value, icon: Icon, iconColor, bgColor }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div
        className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}
      >
        <Icon size={24} className={iconColor} />
      </div>
    </div>
  </div>
);

// Edit Order Modal
const EditOrderModal = ({ order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState(order);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder({ ...editedOrder, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Customer</label>
            <input
              type="text"
              name="customer"
              value={editedOrder.customer}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Status</label>
            <select
              name="status"
              value={editedOrder.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-500">Total Amount</label>
            <input
              type="number"
              name="total"
              value={editedOrder.total}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1E90FF] text-white px-4 py-2 rounded hover:bg-[#1C86EE]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Order Modal
const DeleteOrderModal = ({ order, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(order.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Order</h2>
        <p className="text-gray-600">
          Are you sure you want to delete order <strong>{order.id}</strong>?
        </p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const OrdersManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    paymentMethod: "",
    dateRange: { start: "", end: "" },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);

  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: "ORD-7246",
      customer: "Godbless Nyagawa",
      date: "2023-10-01",
      total: 136.5,
      status: "Delivered",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-7247",
      customer: "Elvis Kamwene",
      date: "2023-10-02",
      total: 89.75,
      status: "Pending",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-7248",
      customer: "Samantha Mbwana",
      date: "2023-10-03",
      total: 54.2,
      status: "Canceled",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-7249",
      customer: "Janeth Imu",
      date: "2023-10-04",
      total: 220.0,
      status: "Shipped",
      paymentMethod: "PayPal",
    },
    {
      id: "ORD-7250",
      customer: "Olivia Rodygo",
      date: "2023-10-05",
      total: 110.4,
      status: "Returned",
      paymentMethod: "Credit Card",
    },
    // Add more orders as needed
  ]);

  // Filter and search logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status
      ? order.status === filters.status
      : true;
    const matchesPaymentMethod = filters.paymentMethod
      ? order.paymentMethod === filters.paymentMethod
      : true;
    const matchesDateRange =
      (!filters.dateRange.start || order.date >= filters.dateRange.start) &&
      (!filters.dateRange.end || order.date <= filters.dateRange.end);
    return (
      matchesSearch && matchesStatus && matchesPaymentMethod && matchesDateRange
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Order statistics
  const orderStats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((order) => order.status === "Pending").length,
    shippedOrders: orders.filter((order) => order.status === "Shipped").length,
  };

  // Handle Edit Order
  const handleEditOrder = (order) => {
    setEditingOrder(order);
  };

  const handleSaveOrder = (updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  // Handle Delete Order
  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard
          title="Total Orders"
          value={orderStats.totalOrders}
          icon={Package}
          iconColor="text-[#1E90FF]"
          bgColor="bg-[#1E90FF] bg-opacity-10"
        />
        <MetricCard
          title="Pending Orders"
          value={orderStats.pendingOrders}
          icon={Clock}
          iconColor="text-[#FF6347]"
          bgColor="bg-[#FF6347] bg-opacity-10"
        />
        <MetricCard
          title="Shipped Orders"
          value={orderStats.shippedOrders}
          icon={Truck}
          iconColor="text-[#FFD700]"
          bgColor="bg-[#FFD700] bg-opacity-10"
        />
      </div>

      {/* Search Bar and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by customer name, order ID, or status..."
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
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
              <option value="Returned">Returned</option>
            </select>

            <select
              value={filters.paymentMethod}
              onChange={(e) =>
                setFilters({ ...filters, paymentMethod: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value="">All Payment Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
            </select>

            <input
              type="date"
              placeholder="Start Date"
              value={filters.dateRange.start}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: e.target.value },
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            <input
              type="date"
              placeholder="End Date"
              value={filters.dateRange.end}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, end: e.target.value },
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>
        </div>
      </div>

      {/* Order List Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Order Date</th>
              <th className="px-6 py-3 text-left">Total Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id} className="text-sm text-gray-700">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Canceled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditOrder(order)}
                      className="text-[#1E90FF] hover:text-[#1C86EE] mr-4"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => setDeletingOrder(order)}
                      className="text-[#FF6347] hover:text-[#EE5A42]"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
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
            {Math.ceil(filteredOrders.length / itemsPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredOrders.length / itemsPerPage)
            }
            className="p-2 text-gray-600 hover:text-[#1E90FF] disabled:text-gray-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={handleSaveOrder}
        />
      )}

      {/* Delete Order Modal */}
      {deletingOrder && (
        <DeleteOrderModal
          order={deletingOrder}
          onClose={() => setDeletingOrder(null)}
          onDelete={handleDeleteOrder}
        />
      )}
    </div>
  );
};

export default OrdersManagementPage;
