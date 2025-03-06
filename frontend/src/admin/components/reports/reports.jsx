import React, { useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DatePicker, Select, Button, Table } from "antd";
import { Download, Printer, Filter, Search } from "lucide-react";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    paymentMethod: "",
    location: "",
  });

  // Sample Data
  const salesData = [
    { date: "2023-10-01", revenue: 1200 },
    { date: "2023-10-02", revenue: 800 },
    { date: "2023-10-03", revenue: 1500 },
    { date: "2023-10-04", revenue: 2000 },
    { date: "2023-10-05", revenue: 1800 },
  ];

  const ordersData = [
    { status: "Successful", count: 120 },
    { status: "Pending", count: 30 },
    { status: "Canceled", count: 10 },
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 89 },
    { name: "Smartwatch", sales: 75 },
    { name: "Bluetooth Speaker", sales: 60 },
  ];

  const revenueByCategory = [
    { category: "Electronics", revenue: 5000 },
    { category: "Accessories", revenue: 3000 },
    { category: "Clothing", revenue: 2000 },
  ];

  const customerGrowthData = [
    { date: "2023-10-01", customers: 100 },
    { date: "2023-10-02", customers: 150 },
    { date: "2023-10-03", customers: 200 },
    { date: "2023-10-04", customers: 250 },
    { date: "2023-10-05", customers: 300 },
  ];

  const transactions = [
    {
      orderId: "ORD-7246",
      customer: "Godbless Nyagawa",
      value: 136.5,
      status: "Delivered",
      date: "2023-10-01",
      paymentMethod: "Credit Card",
    },
    {
      orderId: "ORD-7247",
      customer: "Elvis Kamwene",
      value: 89.75,
      status: "Pending",
      date: "2023-10-02",
      paymentMethod: "PayPal",
    },
    // Add more transactions
  ];

  // Key Metrics
  const totalSales = 12000;
  const totalOrders = 150;
  const averageOrderValue = 80;
  const newCustomers = 50;
  const refunds = 500;

  // Handle Filters
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  // Export Reports
  const handleExport = (format) => {
    alert(`Exporting report in ${format} format`);
  };

  // Table Columns
  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Order Value", dataIndex: "value", key: "value" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <RangePicker
          onChange={(dates) => setDateRange(dates)}
          className="w-full md:w-auto"
        />
        <Select
          placeholder="Category"
          onChange={(value) => handleFilterChange("category", value)}
          className="w-full md:w-48"
        >
          <Option value="electronics">Electronics</Option>
          <Option value="accessories">Accessories</Option>
          <Option value="clothing">Clothing</Option>
        </Select>
        <Select
          placeholder="Payment Method"
          onChange={(value) => handleFilterChange("paymentMethod", value)}
          className="w-full md:w-48"
        >
          <Option value="credit-card">Credit Card</Option>
          <Option value="paypal">PayPal</Option>
        </Select>
        <Select
          placeholder="Location"
          onChange={(value) => handleFilterChange("location", value)}
          className="w-full md:w-48"
        >
          <Option value="us">United States</Option>
          <Option value="uk">United Kingdom</Option>
          <Option value="tz">Tanzania</Option>
        </Select>
        <Button icon={<Filter size={16} />} className="w-full md:w-auto">
          Apply Filters
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Total Sales</p>
          <h3 className="text-2xl font-bold">${totalSales}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Total Orders</p>
          <h3 className="text-2xl font-bold">{totalOrders}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Average Order Value</p>
          <h3 className="text-2xl font-bold">${averageOrderValue}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">New Customers</p>
          <h3 className="text-2xl font-bold">{newCustomers}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Refunds & Returns</p>
          <h3 className="text-2xl font-bold">${refunds}</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Sales Performance Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#1E90FF" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Orders Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ordersData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#FF6347"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#1E90FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Transactions</h3>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      </div>

      {/* Export & Print Buttons */}
      <div className="flex gap-4 mb-6">
        <Button
          icon={<Download size={16} />}
          onClick={() => handleExport("CSV")}
        >
          Export CSV
        </Button>
        <Button
          icon={<Download size={16} />}
          onClick={() => handleExport("Excel")}
        >
          Export Excel
        </Button>
        <Button icon={<Printer size={16} />} onClick={() => window.print()}>
          Print Report
        </Button>
      </div>
    </div>
  );
};

export default ReportsPage;
