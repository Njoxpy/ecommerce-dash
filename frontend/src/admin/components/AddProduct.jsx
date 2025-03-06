import React, { useState } from "react";
import { Plus, Save, Eye, XCircle, CheckCircle } from "lucide-react";

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    price: "",
    discountedPrice: "",
    stockLevel: "",
    weight: "",
    dimensions: "",
    images: [],
    tags: [],
    status: "active",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    variants: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: [...product.images, ...files] });
  };

  const handleAddVariant = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        { name: "", options: [], price: "", stockLevel: "" },
      ],
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index][field] = value;
    setProduct({ ...product, variants: updatedVariants });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form (e.g., save to database)
      console.log("Product submitted:", product);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!product.name) errors.name = "Product name is required.";
    if (!product.price) errors.price = "Price is required.";
    if (!product.stockLevel) errors.stockLevel = "Stock level is required.";
    return errors;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>

      {/* Product Information Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            {errors.name && (
              <p className="text-sm text-[#FF6347] mt-1">{errors.name}</p>
            )}
          </div>

          {/* Product SKU */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product SKU
            </label>
            <input
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>

          {/* Product Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Product Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              rows="4"
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            {errors.price && (
              <p className="text-sm text-[#FF6347] mt-1">{errors.price}</p>
            )}
          </div>

          {/* Discounted Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discounted Price
            </label>
            <input
              type="number"
              name="discountedPrice"
              value={product.discountedPrice}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>

          {/* Stock Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock Level
            </label>
            <input
              type="number"
              name="stockLevel"
              value={product.stockLevel}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            {errors.stockLevel && (
              <p className="text-sm text-[#FF6347] mt-1">{errors.stockLevel}</p>
            )}
          </div>

          {/* Weight/Dimensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={product.weight}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dimensions (cm)
            </label>
            <input
              type="text"
              name="dimensions"
              value={product.dimensions}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>

          {/* Product Images */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            <div className="mt-4 flex flex-wrap gap-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Product Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Product Tags */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Tags
            </label>
            <input
              type="text"
              name="tags"
              value={product.tags.join(", ")}
              onChange={(e) =>
                setProduct({ ...product, tags: e.target.value.split(", ") })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
          </div>

          {/* Product Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Status
            </label>
            <select
              name="status"
              value={product.status}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pre-order">Pre-order</option>
            </select>
          </div>

          {/* SEO Settings */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              SEO Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={product.metaTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={product.metaDescription}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Keywords
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={product.keywords}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                />
              </div>
            </div>
          </div>

          {/* Product Variants */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Product Variants
            </h2>
            {product.variants.map((variant, index) => (
              <div
                key={index}
                className="mb-6 p-4 border border-gray-200 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Variant Name
                    </label>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) =>
                        handleVariantChange(index, "name", e.target.value)
                      }
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    <input
                      type="text"
                      value={variant.options.join(", ")}
                      onChange={(e) =>
                        handleVariantChange(
                          index,
                          "options",
                          e.target.value.split(", ")
                        )
                      }
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Stock Level
                    </label>
                    <input
                      type="number"
                      value={variant.stockLevel}
                      onChange={(e) =>
                        handleVariantChange(index, "stockLevel", e.target.value)
                      }
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddVariant}
              className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#1C86EE]"
            >
              <Plus size={16} className="mr-2" />
              Add Variant
            </button>
          </div>
        </div>

        {/* Save & Preview Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            className="bg-[#FF6347] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#EE5A42]"
          >
            <Eye size={16} className="mr-2" />
            Preview
          </button>
          <button
            type="submit"
            className="bg-[#1E90FF] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#1C86EE]"
          >
            <Save size={16} className="mr-2" />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
