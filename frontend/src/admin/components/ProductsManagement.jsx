import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProductManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    stockStatus: "",
    priceRange: { min: 0, max: 1000 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      sku: "WH-001",
      price: 89.99,
      stock: 50,
    },
    { id: 2, name: "Smartphone Case", sku: "SC-002", price: 24.99, stock: 0 },
    { id: 3, name: "Smart Watch", sku: "SW-003", price: 199.99, stock: 25 },
    { id: 4, name: "Laptop Sleeve", sku: "LS-004", price: 34.99, stock: 100 },
    { id: 5, name: "Laptop Sleeve", sku: "LS-004", price: 34.99, stock: 100 },
    { id: 6, name: "Laptop Sleeve", sku: "LS-004", price: 34.99, stock: 100 },
    { id: 7, name: "Laptop Sleeve", sku: "LS-004", price: 34.99, stock: 100 },
    { id: 8, name: "Laptop Sleeve", sku: "LS-004", price: 34.99, stock: 100 },
    { id: 9, name: "Laptop Sleeve", sku: "LS-004", price: 34.99, stock: 100 },
    { id: 10, name: "Laptop Sleeve", sku: "LS-004", price: 34.99, stock: 100 },
    { id: 11, name: "Laptop Sleeve", sku: "LS-004", price: 34.99, stock: 100 },
    { id: 12, name: "Laptop Sleeve", sku: "LS-004", price: 34.99, stock: 100 },
    // Add more products as needed
  ];

  // Filter and search logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;
    const matchesStock =
      filters.stockStatus === "in-stock"
        ? product.stock > 0
        : filters.stockStatus === "out-of-stock"
        ? product.stock === 0
        : true;
    const matchesPrice =
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max;
    return matchesSearch && matchesCategory && matchesStock && matchesPrice;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Product Management
        </h1>
        <Link to={"/admin/products/add"}>
          <button className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#1C86EE]">
            <Plus size={16} className="mr-2" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Search Bar and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name, SKU, or category..."
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
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
              <option value="clothing">Clothing</option>
            </select>

            <select
              value={filters.stockStatus}
              onChange={(e) =>
                setFilters({ ...filters, stockStatus: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value="">All Stock</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>

            <input
              type="number"
              placeholder="Min Price"
              value={filters.priceRange.min}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: { ...filters.priceRange, min: e.target.value },
                })
              }
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.priceRange.max}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: { ...filters.priceRange, max: e.target.value },
                })
              }
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">SKU</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id} className="text-sm text-gray-700">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.sku}</td>
                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <button className="text-[#1E90FF] hover:text-[#1C86EE] mr-4">
                    <Edit size={16} />
                  </button>
                  <button className="text-[#FF6347] hover:text-[#EE5A42]">
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
            {Math.ceil(filteredProducts.length / itemsPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredProducts.length / itemsPerPage)
            }
            className="p-2 text-gray-600 hover:text-[#1E90FF] disabled:text-gray-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;
