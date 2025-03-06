import React, { useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  PieChart,
  BarChart,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle,
} from "lucide-react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Link } from "react-router-dom";

// Register Chart.js components
Chart.register(...registerables);

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

const RevenueOrdersDashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: "last-30-days",
    paymentMethod: "",
    category: "",
  });

  // Sample data for charts
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 7000, 9000, 12000, 15000, 18000, 20000],
        borderColor: "#1E90FF",
        backgroundColor: "rgba(30, 144, 255, 0.2)",
      },
    ],
  };

  const salesByCategoryData = {
    labels: ["Electronics", "Clothing", "Accessories", "Home & Kitchen"],
    datasets: [
      {
        label: "Sales",
        data: [12000, 8000, 5000, 3000],
        backgroundColor: ["#1E90FF", "#FF6347", "#FFD700", "#32CD32"],
      },
    ],
  };

  const ordersOverTimeData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Orders",
        data: [100, 150, 200, 250, 300, 350, 400],
        borderColor: "#FF6347",
        backgroundColor: "rgba(255, 99, 71, 0.2)",
      },
    ],
  };

  // Top-selling products
  const topSellingProducts = [
    {
      name: "Wireless Headphones",
      unitsSold: 124,
      revenue: 11176,
    },
    {
      name: "Smartwatch",
      unitsSold: 98,
      revenue: 19598,
    },
    {
      name: "Bluetooth Speaker",
      unitsSold: 150,
      revenue: 8998,
    },
    {
      name: "Laptop Stand",
      unitsSold: 220,
      revenue: 8798,
    },
    {
      name: "Wireless Mouse",
      unitsSold: 300,
      revenue: 8997,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard
          title="Total Revenue"
          value="$24,780"
          icon={DollarSign}
          iconColor="text-[#1E90FF]"
          bgColor="bg-[#1E90FF] bg-opacity-10"
        />
        <MetricCard
          title="Total Orders"
          value="356"
          icon={ShoppingCart}
          iconColor="text-[#FF6347]"
          bgColor="bg-[#FF6347] bg-opacity-10"
        />
        <MetricCard
          title="Avg. Order Value"
          value="$69.60"
          icon={CreditCard}
          iconColor="text-[#FFD700]"
          bgColor="bg-[#FFD700] bg-opacity-10"
        />
      </div>

      {/* Filter Options */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filters.dateRange}
            onChange={(e) =>
              setFilters({ ...filters, dateRange: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>

          <select
            value={filters.paymentMethod}
            onChange={(e) =>
              setFilters({ ...filters, paymentMethod: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          >
            <option value="">All Payment Methods</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="home-kitchen">Home & Kitchen</option>
          </select>
        </div>
      </div>

      {/* Charts & Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trends */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Trends</h2>
          <Line data={revenueData} />
        </div>

        {/* Sales Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <Pie data={salesByCategoryData} />
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard
          title="Pending Orders"
          value="12"
          icon={Clock}
          iconColor="text-[#FF6347]"
          bgColor="bg-[#FF6347] bg-opacity-10"
        />
        <MetricCard
          title="Shipped Orders"
          value="25"
          icon={Truck}
          iconColor="text-[#1E90FF]"
          bgColor="bg-[#1E90FF] bg-opacity-10"
        />
        <MetricCard
          title="Completed Orders"
          value="319"
          icon={CheckCircle}
          iconColor="text-[#32CD32]"
          bgColor="bg-[#32CD32] bg-opacity-10"
        />
      </div>

      {/* Top-Selling Products */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Top-Selling Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Units Sold</th>
                <th className="px-6 py-3 text-left">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topSellingProducts.map((product, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.unitsSold}</td>
                  <td className="px-6 py-4">${product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actionable Insights */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Actionable Insights</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <AlertCircle size={20} className="text-[#FF6347] mr-2" />
            <span className="text-gray-700">
              Low stock alert: Wireless Headphones (only 5 left in stock).
            </span>
          </div>
          <div className="flex items-center">
            <TrendingUp size={20} className="text-[#1E90FF] mr-2" />
            <span className="text-gray-700">
              High demand for Smartwatches. Consider running a promotion.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOrdersDashboard;
