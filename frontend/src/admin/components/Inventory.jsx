import React, { useState } from "react";
import {
  Plus,
  Edit,
  Eye,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

const InventoryManagementPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      stockLevel: 10,
      reorderLevel: 20,
      sku: "WH-001",
      price: 89.99,
      totalSales: 124,
    },
    {
      id: 2,
      name: "Smartwatch",
      stockLevel: 5,
      reorderLevel: 15,
      sku: "SW-002",
      price: 199.99,
      totalSales: 98,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      stockLevel: 25,
      reorderLevel: 30,
      sku: "BS-003",
      price: 59.99,
      totalSales: 150,
    },
    {
      id: 4,
      name: "Laptop Stand",
      stockLevel: 50,
      reorderLevel: 40,
      sku: "LS-004",
      price: 34.99,
      totalSales: 220,
    },
    {
      id: 5,
      name: "Wireless Mouse",
      stockLevel: 100,
      reorderLevel: 50,
      sku: "WM-005",
      price: 29.99,
      totalSales: 300,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter and search logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reorder Stock
  const handleReorderStock = () => {
    const lowStockProducts = products.filter(
      (product) => product.stockLevel < product.reorderLevel
    );
    alert(
      `Reordering stock for: ${lowStockProducts.map((p) => p.name).join(", ")}`
    );
  };

  // View Product Details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Inventory Management
      </h1>

      {/* Reorder Stock Button */}
      <button
        onClick={handleReorderStock}
        className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#1C86EE] mb-6"
      >
        <AlertCircle size={16} className="mr-2" />
        Reorder Low Stock
      </button>

      {/* Search & Filter */}
      <div className="mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      {/* Product Inventory Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Stock Level</th>
                <th className="px-6 py-3 text-left">Reorder Level</th>
                <th className="px-6 py-3 text-left">SKU</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Total Sales</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`text-sm text-gray-700 ${
                    product.stockLevel < product.reorderLevel ? "bg-red-50" : ""
                  }`}
                >
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.stockLevel}</td>
                  <td className="px-6 py-4">{product.reorderLevel}</td>
                  <td className="px-6 py-4">{product.sku}</td>
                  <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.totalSales}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="text-[#1E90FF] hover:text-[#1C86EE] mr-4"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => alert(`Edit product ${product.id}`)}
                      className="text-[#FF6347] hover:text-[#EE5A42]"
                    >
                      <Edit size={16} />
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
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
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
                currentPage ===
                Math.ceil(filteredProducts.length / itemsPerPage)
              }
              className="p-2 text-gray-600 hover:text-[#1E90FF] disabled:text-gray-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Product Details</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <p className="mt-1 text-gray-900">{selectedProduct.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock Level
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedProduct.stockLevel}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reorder Level
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedProduct.reorderLevel}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU
                </label>
                <p className="mt-1 text-gray-900">{selectedProduct.sku}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <p className="mt-1 text-gray-900">
                  ${selectedProduct.price.toFixed(2)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Sales
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedProduct.totalSales}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagementPage;
