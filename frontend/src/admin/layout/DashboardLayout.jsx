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
  Truck,
  Star,
  PieChart,
  Plus,
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

  // Sidebar navigation items
  const navItems = [
    {
      name: "dashboard",
      icon: <BarChart3 size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "orders",
      icon: <ShoppingCart size={20} />,
      path: "/admin/orders",
    },
    {
      name: "products",
      icon: <ShoppingBag size={20} />,
      path: "/admin/products",
    },
    {
      name: "inventory",
      icon: <TrendingUp size={20} />,
      path: "/admin/inventory",
    },
    {
      name: "shipping",
      icon: <Truck size={20} />,
      path: "/admin/shipping",
    },
    {
      name: "reviews",
      icon: <Star size={20} />,
      path: "/admin/reviews",
    },
    {
      name: "add product",
      icon: <Plus size={20} />,
      path: "/admin/products/add",
    },
    {
      name: "revenue",
      icon: <DollarSign size={20} />,
      path: "/admin/revenue",
    },
    {
      name: "analytics",
      icon: <PieChart size={20} />,
      path: "/admin/analytics",
    },
    {
      name: "customers",
      icon: <Users size={20} />,
      path: "/admin/customers",
    },
    {
      name: "settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ];

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
            <span className="ml-2 text-xl font-bold">Kamwene Shop</span>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => handleNavClick(item.name)}
              className={`block px-4 py-3 ${
                activeNav === item.name
                  ? "bg-[#FF6347] bg-opacity-10 border-l-4 border-[#FF6347]"
                  : "hover:bg-gray-100 border-l-4 border-transparent"
              }`}
            >
              <div className="flex items-center">
                {React.cloneElement(item.icon, {
                  className:
                    activeNav === item.name
                      ? "text-[#FF6347]"
                      : "text-gray-600",
                })}
                <span
                  className={`mx-4 font-medium ${
                    activeNav === item.name ? "text-[#FF6347]" : "text-gray-700"
                  }`}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </span>
              </div>
            </Link>
          ))}
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
                    Godbless Nyagawa
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
          {/* Outlet for nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
