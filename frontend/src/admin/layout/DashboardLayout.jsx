import React, { useState } from "react";
import {
  ShoppingBag,
  BarChart3,
  Users,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronDown,
  X,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    // For mobile views, close sidebar after clicking
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative w-64 h-full bg-white shadow-lg transition-all duration-300 z-30 
                   ${isSidebarOpen ? "left-0" : "-left-64"} lg:left-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/admin" className="flex items-center">
            <ShoppingBag size={24} className="text-[#FF6347]" />
            <span className="ml-2 text-xl font-bold">ShopDash</span>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            onClick={() => handleNavClick("dashboard")}
            className={`block px-4 py-3 ${
              activeNav === "dashboard"
                ? "bg-[#FF6347] bg-opacity-10 border-l-4 border-[#FF6347]"
                : "hover:bg-gray-100 border-l-4 border-transparent"
            }`}
          >
            <div className="flex items-center">
              <BarChart3
                size={20}
                className={
                  activeNav === "dashboard" ? "text-[#FF6347]" : "text-gray-600"
                }
              />
              <span
                className={`mx-4 font-medium ${
                  activeNav === "dashboard" ? "text-[#FF6347]" : "text-gray-700"
                }`}
              >
                Dashboard
              </span>
            </div>
          </Link>

          <Link
            to={"/admin/orders"}
            onClick={() => handleNavClick("orders")}
            className={`block px-4 py-3 ${
              activeNav === "orders"
                ? "bg-[#FF6347] bg-opacity-10 border-l-4 border-[#FF6347]"
                : "hover:bg-gray-100 border-l-4 border-transparent"
            }`}
          >
            <div className="flex items-center">
              <ShoppingCart
                size={20}
                className={
                  activeNav === "orders" ? "text-[#FF6347]" : "text-gray-600"
                }
              />
              <span
                className={`mx-4 font-medium ${
                  activeNav === "orders" ? "text-[#FF6347]" : "text-gray-700"
                }`}
              >
                Orders
              </span>
            </div>
          </Link>

          <Link
            to={"/admin/products"}
            onClick={() => handleNavClick("products")}
            className={`block px-4 py-3 ${
              activeNav === "products"
                ? "bg-[#FF6347] bg-opacity-10 border-l-4 border-[#FF6347]"
                : "hover:bg-gray-100 border-l-4 border-transparent"
            }`}
          >
            <div className="flex items-center">
              <ShoppingBag
                size={20}
                className={
                  activeNav === "products" ? "text-[#FF6347]" : "text-gray-600"
                }
              />
              <span
                className={`mx-4 font-medium ${
                  activeNav === "products" ? "text-[#FF6347]" : "text-gray-700"
                }`}
              >
                Products
              </span>
            </div>
          </Link>

          <Link
            to={"/admin/customers"}
            onClick={() => handleNavClick("customers")}
            className={`block px-4 py-3 ${
              activeNav === "customers"
                ? "bg-[#FF6347] bg-opacity-10 border-l-4 border-[#FF6347]"
                : "hover:bg-gray-100 border-l-4 border-transparent"
            }`}
          >
            <div className="flex items-center">
              <Users
                size={20}
                className={
                  activeNav === "customers" ? "text-[#FF6347]" : "text-gray-600"
                }
              />
              <span
                className={`mx-4 font-medium ${
                  activeNav === "customers" ? "text-[#FF6347]" : "text-gray-700"
                }`}
              >
                Customers
              </span>
            </div>
          </Link>

          <Link
            to={"/admin/settings"}
            onClick={() => handleNavClick("settings")}
            className={`block px-4 py-3 ${
              activeNav === "settings"
                ? "bg-[#FF6347] bg-opacity-10 border-l-4 border-[#FF6347]"
                : "hover:bg-gray-100 border-l-4 border-transparent"
            }`}
          >
            <div className="flex items-center">
              <Settings
                size={20}
                className={
                  activeNav === "settings" ? "text-[#FF6347]" : "text-gray-600"
                }
              />
              <span
                className={`mx-4 font-medium ${
                  activeNav === "settings" ? "text-[#FF6347]" : "text-gray-700"
                }`}
              >
                Settings
              </span>
            </div>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 focus:outline-none"
              >
                <Menu size={24} />
              </button>
            </div>

            <div className="relative w-full max-w-md mr-4 hidden md:block">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search size={18} className="text-gray-500" />
              </span>
              <input
                className="form-input w-full pl-10 pr-4 py-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                type="text"
                placeholder="Search..."
              />
            </div>

            <div className="flex items-center">
              <button className="p-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6347] rounded-full"></span>
              </button>

              <div className="relative ml-3">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#1E90FF] flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    John Doe
                  </span>
                  <ChevronDown
                    size={16}
                    className="hidden md:block text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Welcome back, John! Here's what's happening with your store today.
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Revenue</p>
                  <h3 className="text-2xl font-bold">$24,780</h3>
                  <p className="text-green-500 text-sm flex items-center">
                    <TrendingUp size={16} className="mr-1" /> +12.5%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1E90FF] bg-opacity-10 flex items-center justify-center">
                  <DollarSign size={24} className="text-[#1E90FF]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Orders</p>
                  <h3 className="text-2xl font-bold">356</h3>
                  <p className="text-green-500 text-sm flex items-center">
                    <TrendingUp size={16} className="mr-1" /> +8.2%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#FF6347] bg-opacity-10 flex items-center justify-center">
                  <ShoppingCart size={24} className="text-[#FF6347]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Customers</p>
                  <h3 className="text-2xl font-bold">2,439</h3>
                  <p className="text-green-500 text-sm flex items-center">
                    <TrendingUp size={16} className="mr-1" /> +4.6%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#FFD700] bg-opacity-10 flex items-center justify-center">
                  <Users size={24} className="text-[#FFD700]" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Avg. Order</p>
                  <h3 className="text-2xl font-bold">$69.60</h3>
                  <p className="text-red-500 text-sm flex items-center">
                    <TrendingUp size={16} className="mr-1" /> -2.3%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock size={24} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders and Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <Link
                  to={"/admin/orders"}
                  className="text-[#1E90FF] text-sm hover:underline"
                >
                  View All
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
                    <tr className="text-sm">
                      <td className="py-3">
                        <Link
                          href="#order-details"
                          className="hover:text-[#1E90FF]"
                        >
                          #ORD-7246
                        </Link>
                      </td>
                      <td className="py-3">Emma Wilson</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          Delivered
                        </span>
                      </td>
                      <td className="py-3">$136.50</td>
                    </tr>
                    <tr className="text-sm">
                      <td className="py-3">
                        <Link
                          href="#order-details"
                          className="hover:text-[#1E90FF]"
                        >
                          #ORD-7245
                        </Link>
                      </td>
                      <td className="py-3">James Brown</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          Processing
                        </span>
                      </td>
                      <td className="py-3">$85.20</td>
                    </tr>
                    <tr className="text-sm">
                      <td className="py-3">
                        <Link
                          href="#order-details"
                          className="hover:text-[#1E90FF]"
                        >
                          #ORD-7244
                        </Link>
                      </td>
                      <td className="py-3">Olivia Smith</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          Pending
                        </span>
                      </td>
                      <td className="py-3">$42.75</td>
                    </tr>
                    <tr className="text-sm">
                      <td className="py-3">
                        <Link
                          href="#order-details"
                          className="hover:text-[#1E90FF]"
                        >
                          #ORD-7243
                        </Link>
                      </td>
                      <td className="py-3">Lucas Miller</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          Delivered
                        </span>
                      </td>
                      <td className="py-3">$92.40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Top Products</h2>
                <Link
                  href="#products"
                  className="text-[#1E90FF] text-sm hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                <Link
                  href="#product-details"
                  className="block hover:bg-gray-50 rounded-lg p-2"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#FFD700] bg-opacity-10 rounded flex items-center justify-center mr-3">
                      <ShoppingBag size={18} className="text-[#FFD700]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">
                        Wireless Headphones
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">124 sales</span>
                        <span className="text-sm font-medium">$89.99</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  href="#product-details"
                  className="block hover:bg-gray-50 rounded-lg p-2"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#FF6347] bg-opacity-10 rounded flex items-center justify-center mr-3">
                      <ShoppingBag size={18} className="text-[#FF6347]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">Smartphone Case</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">98 sales</span>
                        <span className="text-sm font-medium">$24.99</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  href="#product-details"
                  className="block hover:bg-gray-50 rounded-lg p-2"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#1E90FF] bg-opacity-10 rounded flex items-center justify-center mr-3">
                      <ShoppingBag size={18} className="text-[#1E90FF]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">Smart Watch</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">87 sales</span>
                        <span className="text-sm font-medium">$199.99</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  href="#product-details"
                  className="block hover:bg-gray-50 rounded-lg p-2"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                      <ShoppingBag size={18} className="text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">Laptop Sleeve</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">76 sales</span>
                        <span className="text-sm font-medium">$34.99</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Outlet />
    </div>
  );
};

export default Dashboard;
