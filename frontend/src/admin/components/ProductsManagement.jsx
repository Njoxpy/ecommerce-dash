import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Check,
  X,
} from "lucide-react";

const ProductManagement = () => {
  // Sample product data
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      sku: "WH-100-BLK",
      category: "Electronics",
      price: 89.99,
      stock: 45,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      sku: "SW-200-SLV",
      category: "Electronics",
      price: 199.99,
      stock: 23,
      status: "In Stock",
    },
    {
      id: 3,
      name: "Leather Wallet",
      sku: "LW-300-BRN",
      category: "Accessories",
      price: 49.99,
      stock: 78,
      status: "In Stock",
    },
    {
      id: 4,
      name: "Cotton T-Shirt",
      sku: "TS-400-WHT",
      category: "Apparel",
      price: 24.99,
      stock: 120,
      status: "In Stock",
    },
    {
      id: 5,
      name: "Smartphone Case",
      sku: "SC-500-BLK",
      category: "Accessories",
      price: 19.99,
      stock: 67,
      status: "In Stock",
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      sku: "BS-600-BLU",
      category: "Electronics",
      price: 59.99,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 7,
      name: "Sunglasses",
      sku: "SG-700-BLK",
      category: "Accessories",
      price: 89.99,
      stock: 12,
      status: "In Stock",
    },
    {
      id: 8,
      name: "Running Shoes",
      sku: "RS-800-RED",
      category: "Footwear",
      price: 119.99,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 9,
      name: "Laptop Sleeve",
      sku: "LS-900-GRY",
      category: "Accessories",
      price: 34.99,
      stock: 56,
      status: "In Stock",
    },
    {
      id: 10,
      name: "Water Bottle",
      sku: "WB-110-BLU",
      category: "Sports",
      price: 14.99,
      stock: 89,
      status: "In Stock",
    },
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStockDropdown, setShowStockDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Price ranges
  const priceRanges = [
    "All",
    "Under $25",
    "$25 - $50",
    "$50 - $100",
    "Over $100",
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;

    // Stock filter
    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "In Stock" && product.stock > 0) ||
      (stockFilter === "Out of Stock" && product.stock === 0);

    // Price filter
    let matchesPrice = true;
    if (priceFilter !== "All") {
      if (priceFilter === "Under $25") {
        matchesPrice = product.price < 25;
      } else if (priceFilter === "$25 - $50") {
        matchesPrice = product.price >= 25 && product.price <= 50;
      } else if (priceFilter === "$50 - $100") {
        matchesPrice = product.price > 50 && product.price <= 100;
      } else if (priceFilter === "Over $100") {
        matchesPrice = product.price > 100;
      }
    }

    return matchesSearch && matchesCategory && matchesStock && matchesPrice;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Product Management
        </h1>
        <p className="text-gray-600">Manage your store's product inventory</p>
      </div>

      {/* Search and Add Product */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div className="relative w-full sm:w-2/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products by name, SKU, or category..."
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1E90FF] focus:border-[#1E90FF] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-[#FF6347] hover:bg-[#FF6347]/90 text-white px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start transition-colors duration-200 shadow-sm">
          <Plus size={18} className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 text-left text-gray-700"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <div className="flex items-center">
              <Filter size={16} className="mr-2 text-gray-500" />
              <span>
                {categoryFilter === "All" ? "All Categories" : categoryFilter}
              </span>
            </div>
            <ChevronDown size={16} className="ml-2 text-gray-500" />
          </button>

          {showCategoryDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {categories.map((category) => (
                <div
                  key={category}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setCategoryFilter(category);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <span>{category}</span>
                  {categoryFilter === category && (
                    <Check size={16} className="text-[#1E90FF]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stock Status Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 text-left text-gray-700"
            onClick={() => setShowStockDropdown(!showStockDropdown)}
          >
            <div className="flex items-center">
              <Filter size={16} className="mr-2 text-gray-500" />
              <span>
                {stockFilter === "All" ? "All Stock Status" : stockFilter}
              </span>
            </div>
            <ChevronDown size={16} className="ml-2 text-gray-500" />
          </button>

          {showStockDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {["All", "In Stock", "Out of Stock"].map((status) => (
                <div
                  key={status}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setStockFilter(status);
                    setShowStockDropdown(false);
                  }}
                >
                  <span>{status}</span>
                  {stockFilter === status && (
                    <Check size={16} className="text-[#1E90FF]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 text-left text-gray-700"
            onClick={() => setShowPriceDropdown(!showPriceDropdown)}
          >
            <div className="flex items-center">
              <Filter size={16} className="mr-2 text-gray-500" />
              <span>
                {priceFilter === "All" ? "All Price Ranges" : priceFilter}
              </span>
            </div>
            <ChevronDown size={16} className="ml-2 text-gray-500" />
          </button>

          {showPriceDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {priceRanges.map((range) => (
                <div
                  key={range}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setPriceFilter(range);
                    setShowPriceDropdown(false);
                  }}
                >
                  <span>{range}</span>
                  {priceFilter === range && (
                    <Check size={16} className="text-[#1E90FF]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reset Filters */}
        <button
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-center transition-colors duration-200"
          onClick={() => {
            setSearchTerm("");
            setCategoryFilter("All");
            setStockFilter("All");
            setPriceFilter("All");
            setCurrentPage(1);
          }}
        >
          <X size={16} className="mr-2" />
          Reset Filters
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Product
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    SKU
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Price
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Stock
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-500 text-xs">
                          {product.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stock > 0 ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 rounded-md text-[#1E90FF] hover:bg-[#1E90FF]/10">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1 rounded-md text-[#FF6347] hover:bg-[#FF6347]/10">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No products found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0 flex items-center">
          <span className="text-sm text-gray-700 mr-4">
            Showing{" "}
            <span className="font-medium">
              {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, filteredProducts.length)}
            </span>{" "}
            of <span className="font-medium">{filteredProducts.length}</span>{" "}
            products
          </span>

          <div className="relative">
            <button
              className="flex items-center justify-between border border-gray-300 rounded-md p-2 text-sm bg-white"
              onClick={() => setShowPerPageDropdown(!showPerPageDropdown)}
            >
              <span>{itemsPerPage} per page</span>
              <ChevronDown size={14} className="ml-2" />
            </button>

            {showPerPageDropdown && (
              <div className="absolute left-0 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {[5, 10, 20, 50].map((num) => (
                  <div
                    key={num}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                    onClick={() => {
                      setItemsPerPage(num);
                      setCurrentPage(1);
                      setShowPerPageDropdown(false);
                    }}
                  >
                    <span>{num} per page</span>
                    {itemsPerPage === num && (
                      <Check size={14} className="text-[#1E90FF]" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-md border ${
              currentPage === 1
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  currentPage === pageNumber
                    ? "bg-[#1E90FF] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md border ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
