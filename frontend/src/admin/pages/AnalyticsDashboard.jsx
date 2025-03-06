import React, { useState } from "react";
import {
  DollarSign,
  Users,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  MapPin,
  PieChart,
  BarChart,
  LineChart,
  Download,
} from "lucide-react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

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

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Sample data for charts
  const trafficData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Visitors",
        data: [5000, 7000, 9000, 12000, 15000, 18000, 20000],
        borderColor: "#1E90FF",
        backgroundColor: "rgba(30, 144, 255, 0.2)",
      },
    ],
  };

  const conversionFunnelData = {
    labels: ["Visits", "Add to Cart", "Checkout", "Purchase"],
    datasets: [
      {
        label: "Conversion Rate",
        data: [10000, 5000, 2000, 1000],
        backgroundColor: ["#1E90FF", "#FF6347", "#FFD700", "#32CD32"],
      },
    ],
  };

  const salesByRegionData = {
    labels: ["North America", "Europe", "Asia", "South America", "Africa"],
    datasets: [
      {
        label: "Sales",
        data: [12000, 8000, 5000, 3000, 2000],
        backgroundColor: [
          "#1E90FF",
          "#FF6347",
          "#FFD700",
          "#32CD32",
          "#FF69B4",
        ],
      },
    ],
  };

  const revenueTrendsData = {
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

  // Top-performing products
  const topProducts = [
    {
      name: "Wireless Headphones",
      revenue: 11176,
      unitsSold: 124,
    },
    {
      name: "Smartwatch",
      revenue: 19598,
      unitsSold: 98,
    },
    {
      name: "Bluetooth Speaker",
      revenue: 8998,
      unitsSold: 150,
    },
    {
      name: "Laptop Stand",
      revenue: 8798,
      unitsSold: 220,
    },
    {
      name: "Wireless Mouse",
      revenue: 8997,
      unitsSold: 300,
    },
  ];

  // Customer insights
  const customerDemographics = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        label: "Customers",
        data: [5000, 7000, 6000, 4000, 3000],
        backgroundColor: [
          "#1E90FF",
          "#FF6347",
          "#FFD700",
          "#32CD32",
          "#FF69B4",
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <MetricCard
          title="Total Sales"
          value="$24,780"
          icon={DollarSign}
          iconColor="text-[#1E90FF]"
          bgColor="bg-[#1E90FF] bg-opacity-10"
        />
        <MetricCard
          title="Total Visitors"
          value="356,789"
          icon={Users}
          iconColor="text-[#FF6347]"
          bgColor="bg-[#FF6347] bg-opacity-10"
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          icon={ShoppingCart}
          iconColor="text-[#FFD700]"
          bgColor="bg-[#FFD700] bg-opacity-10"
        />
        <MetricCard
          title="Avg. Order Value"
          value="$69.60"
          icon={CreditCard}
          iconColor="text-[#32CD32]"
          bgColor="bg-[#32CD32] bg-opacity-10"
        />
        <MetricCard
          title="ROI"
          value="18.5%"
          icon={TrendingUp}
          iconColor="text-[#FF69B4]"
          bgColor="bg-[#FF69B4] bg-opacity-10"
        />
      </div>

      {/* Custom Date Range Filter */}
      <div className="mb-6">
        <DateRangePicker
          ranges={[dateRange]}
          onChange={(ranges) => setDateRange(ranges.selection)}
          className="border border-gray-300 rounded-lg"
        />
      </div>

      {/* Traffic Analysis */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Traffic Analysis</h2>
        <Line data={trafficData} />
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Conversion Funnel</h2>
        <Bar data={conversionFunnelData} />
      </div>

      {/* Sales by Region */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Sales by Region</h2>
        <Pie data={salesByRegionData} />
      </div>

      {/* Product Performance */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Top-Performing Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Revenue</th>
                <th className="px-6 py-3 text-left">Units Sold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">${product.revenue}</td>
                  <td className="px-6 py-4">{product.unitsSold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Customer Demographics</h2>
        <Bar data={customerDemographics} />
      </div>

      {/* Revenue Trends */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Revenue Trends</h2>
        <Line data={revenueTrendsData} />
      </div>

      {/* Data Export Option */}
      <div className="flex justify-end">
        <button className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#1C86EE]">
          <Download size={16} className="mr-2" />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
