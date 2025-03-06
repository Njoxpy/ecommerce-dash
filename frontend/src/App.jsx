import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./admin/layout/DashboardLayout";
import ProductManagementPage from "./admin/components/ProductsManagement";
import DashboardOverview from "./admin/components/DashboardOverview";
import OrdersManagement from "./admin/components/Orders";
import CustomersManagement from "./admin/components/Customers";
import RevenueDashboard from "./admin/pages/RevenueDashboard";
import AnalyticsDashboard from "./admin/pages/AnalyticsDashboard";
import AddProduct from "./admin/components/AddProduct";
import Settings from "./admin/components/Settings";
import Shipping from "./admin/components/ShippingManagement";
import Reviews from "./admin/components/Reviews";
import InventoryManagementPage from "./admin/components/Inventory";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Layout */}
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<DashboardOverview />} />
          {/* Nested Routes */}
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="inventory" element={<InventoryManagementPage />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="revenue" element={<RevenueDashboard />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="customers" element={<CustomersManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

/*
http://localhost:5173/admin/revenue
// http://localhost:5173/admin/analytics
//  */
