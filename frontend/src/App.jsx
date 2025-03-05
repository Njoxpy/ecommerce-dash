import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// admin
import Dashboard from "./admin/layout/DashboardLayout";

// components
import Products from "./admin/components/ProductsManagement";

import NotFound from "./NotFound";
// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="admin/*" element={<Dashboard />}>
        <Route path="products" element={<Products />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
