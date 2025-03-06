import React, { useState } from "react";
import {
  Search,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Star,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductReviewsManagementPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customerName: "John Doe",
      productName: "Wireless Headphones",
      rating: 5,
      reviewDate: "2023-10-01",
      status: "approved",
      reviewText: "Great product! Excellent sound quality.",
      productImage: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      productName: "Smartwatch",
      rating: 4,
      reviewDate: "2023-10-05",
      status: "pending",
      reviewText: "Good watch, but the battery life could be better.",
      productImage: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      customerName: "Alice Johnson",
      productName: "Bluetooth Speaker",
      rating: 3,
      reviewDate: "2023-10-10",
      status: "rejected",
      reviewText: "Average sound quality, not worth the price.",
      productImage: "https://via.placeholder.com/50",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("highest");

  // Filter and search logic
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Sort reviews by rating
  const sortedReviews = filteredReviews.sort((a, b) => {
    if (sortOrder === "highest") {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Approve/Reject Review
  const handleApproveReject = (id, status) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, status } : review
      )
    );
  };

  // Delete Review
  const handleDeleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  // Report Review
  const handleReportReview = (id) => {
    alert(`Review ${id} has been reported for further action.`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Product Reviews Management
      </h1>

      {/* Search & Filter */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by customer name or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-500"
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          >
            <option value="highest">Highest Rating First</option>
            <option value="lowest">Lowest Rating First</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left">Customer Name</th>
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Rating</th>
                <th className="px-6 py-3 text-left">Review Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentReviews.map((review) => (
                <tr key={review.id} className="text-sm text-gray-700">
                  <td className="px-6 py-4">{review.customerName}</td>
                  <td className="px-6 py-4">{review.productName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <Star key={i} size={16} className="text-[#FFD700]" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">{review.reviewDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        review.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : review.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="text-[#1E90FF] hover:text-[#1C86EE] mr-4"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-[#FF6347] hover:text-[#EE5A42] mr-4"
                    >
                      <Trash size={16} />
                    </button>
                    <button
                      onClick={() => handleReportReview(review.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <AlertCircle size={16} />
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
              {Math.ceil(filteredReviews.length / itemsPerPage)}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredReviews.length / itemsPerPage)
              }
              className="p-2 text-gray-600 hover:text-[#1E90FF] disabled:text-gray-300"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Review Details Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Review Details</h2>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedReview.customerName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedReview.productName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="flex items-center mt-1">
                  {Array.from({ length: selectedReview.rating }, (_, i) => (
                    <Star key={i} size={16} className="text-[#FFD700]" />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Review Date
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedReview.reviewDate}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Review Text
                </label>
                <p className="mt-1 text-gray-900">
                  {selectedReview.reviewText}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <img
                  src={selectedReview.productImage}
                  alt="Product"
                  className="mt-1 w-24 h-24 object-cover rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <button
                    onClick={() =>
                      handleApproveReject(selectedReview.id, "approved")
                    }
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedReview.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleApproveReject(selectedReview.id, "rejected")
                    }
                    className={`px-2 py-1 rounded-full text-xs ml-2 ${
                      selectedReview.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviewsManagementPage;
