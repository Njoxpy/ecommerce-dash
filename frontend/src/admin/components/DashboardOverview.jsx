import {
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  TrendingUp,
  Headphones,
  Watch,
  Speaker,
  Monitor,
  Mouse,
  Bell,
  User,
  Edit,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Reusable Metric Card Component
const MetricCard = ({
  title,
  value,
  percentage,
  icon: Icon,
  iconColor,
  bgColor,
}) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p
          className={`${
            percentage.includes("+") ? "text-green-500" : "text-red-500"
          } text-sm flex items-center`}
        >
          <TrendingUp size={16} className="mr-1" /> {percentage}
        </p>
      </div>
      <div
        className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}
      >
        <Icon size={24} className={iconColor} />
      </div>
    </div>
  </div>
);

// Reusable Product Item Component
const ProductItem = ({
  name,
  sales,
  price,
  icon: Icon,
  iconColor,
  bgColor,
}) => (
  <div className="flex items-center hover:bg-gray-50 rounded-lg p-2">
    <div
      className={`w-10 h-10 ${bgColor} rounded flex items-center justify-center mr-3`}
    >
      <Icon size={18} className={iconColor} />
    </div>
    <div className="flex-1">
      <h3 className="text-sm font-medium">{name}</h3>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500">{sales} sales</span>
        <span className="text-sm font-medium">${price}</span>
      </div>
    </div>
  </div>
);

const DashboardOverview = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Metric Data
  const metrics = [
    {
      title: "Revenue",
      value: "$24,780",
      percentage: "+12.5%",
      icon: DollarSign,
      iconColor: "text-[#1E90FF]",
      bgColor: "bg-[#1E90FF] bg-opacity-10",
    },
    {
      title: "Orders",
      value: "356",
      percentage: "+8.2%",
      icon: ShoppingCart,
      iconColor: "text-[#FF6347]",
      bgColor: "bg-[#FF6347] bg-opacity-10",
    },
    {
      title: "Customers",
      value: "2,439",
      percentage: "+4.6%",
      icon: Users,
      iconColor: "text-[#FFD700]",
      bgColor: "bg-[#FFD700] bg-opacity-10",
    },
    {
      title: "Avg. Order",
      value: "$69.60",
      percentage: "-2.3%",
      icon: Clock,
      iconColor: "text-gray-500",
      bgColor: "bg-gray-100",
    },
  ];

  // Product Data
  const products = [
    {
      name: "Wireless Headphones",
      sales: 124,
      price: 89.99,
      icon: Headphones,
      iconColor: "text-[#FFD700]",
      bgColor: "bg-[#FFD700] bg-opacity-10",
    },
    {
      name: "Smartwatch",
      sales: 98,
      price: 199.99,
      icon: Watch,
      iconColor: "text-[#FFD700]",
      bgColor: "bg-[#FFD700] bg-opacity-10",
    },
    {
      name: "Bluetooth Speaker",
      sales: 150,
      price: 59.99,
      icon: Speaker,
      iconColor: "text-[#FFD700]",
      bgColor: "bg-[#FFD700] bg-opacity-10",
    },
    {
      name: "Laptop Stand",
      sales: 220,
      price: 39.99,
      icon: Monitor,
      iconColor: "text-[#FFD700]",
      bgColor: "bg-[#FFD700] bg-opacity-10",
    },
    {
      name: "Wireless Mouse",
      sales: 300,
      price: 29.99,
      icon: Mouse,
      iconColor: "text-[#FFD700]",
      bgColor: "bg-[#FFD700] bg-opacity-10",
    },
  ];

  // Recent Orders Data
  const recentOrders = [
    {
      order: "#ORD-7246",
      customer: "Godbless Nyagawa",
      status: "Delivered",
      amount: "$136.50",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      order: "#ORD-7247",
      customer: "Elvis Maganga",
      status: "Pending",
      amount: "$89.75",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      order: "#ORD-7248",
      customer: "Isack Mwasalemba",
      status: "Canceled",
      amount: "$54.20",
      statusColor: "bg-red-100 text-red-700",
    },
    {
      order: "#ORD-7249",
      customer: "Janeth Mwakifuna",
      status: "Shipped",
      amount: "$220.00",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      order: "#ORD-7250",
      customer: "Oliva Nyangema",
      status: "Returned",
      amount: "$110.40",
      statusColor: "bg-gray-100 text-gray-700",
    },
  ];

  // Notifications Data
  const notifications = [
    { id: 1, text: "New order received", time: "2 mins ago" },
    { id: 2, text: "Order #ORD-7246 has been delivered", time: "10 mins ago" },
    { id: 3, text: "New customer registered", time: "1 hour ago" },
  ];

  return (
    <div className="p-6">
      {/* Header with Notifications and Profile */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back, Godbless Nyagawa! Here's what's happening with your
            store today.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Bell size={20} className="text-gray-600" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                <div className="p-4">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  <div className="mt-2 space-y-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="text-sm text-gray-600"
                      >
                        <p>{notification.text}</p>
                        <p className="text-xs text-gray-400">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <User size={20} className="text-gray-600" />
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <div className="p-2">
                  <Link
                    to="/profile"
                    className="flex items-center p-2 hover:bg-gray-100 rounded"
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/edit-profile"
                    className="flex items-center p-2 hover:bg-gray-100 rounded"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </Link>
                  <button
                    onClick={() => {
                      // Handle logout logic here
                      console.log("User logged out");
                    }}
                    className="w-full flex items-center p-2 hover:bg-gray-100 rounded text-red-500"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link to={"/admin/orders"}>
              <button className="text-[#1E90FF] text-sm hover:underline">
                View All
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="pb-2 text-left">Order</th>
                  <th className="pb-2 text-left">Customer</th>
                  <th className="pb-2 text-left">Status</th>
                  <th className="pb-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-3">
                      <button className="hover:text-[#1E90FF]">
                        {order.order}
                      </button>
                    </td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 ${order.statusColor} rounded-full text-xs`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Products</h2>
            <Link to={"/admin/products"}>
              <button className="text-[#1E90FF] text-sm hover:underline">
                View All
              </button>
            </Link>
          </div>

          <div className="space-y-4">
            {products.map((product, index) => (
              <ProductItem key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
