import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import SessionTimeout from "./components/SessionTimeout";

import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import VarianceReport from "./pages/VarianceReport";

import ManagerDashboard from "./pages/ManagerDashboard";
import SalesDashboard from "./pages/SalesDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";
import Users from "./pages/Users";

import Products from "./pages/Products";
import SalesPersons from "./pages/SalesPerson";
import Regions from "./pages/Regions";

import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";

function App() {
  return (
    <BrowserRouter>
      <SessionTimeout />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["Admin"]}>
            <Dashboard />
            </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                 allowedRoles={["Admin","Manager","Sales Executive", "Viewer"]}>
                  <Reports />
                  </RoleProtectedRoute>
                  </ProtectedRoute>
          }
        />

        <Route
          path="/variance"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute
                  allowedRoles={["Admin"]}
              >
              <VarianceReport />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />
          <Route 
          path="/forgot-password"
          element={
          <ForgotPassword />}
        />

           <Route
            path="/reset-password" 
            element={
            <ResetPassword/>}
            />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

        <Route
          path="/manager-dashboard"
          element={
          <ProtectedRoute>
          <RoleProtectedRoute allowedRoles={["Manager"]}>
          <ManagerDashboard/>
          </RoleProtectedRoute>
          </ProtectedRoute>
          }
        />
        <Route
  path="/users"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["Admin"]}>
        <Users />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>
<Route
path="/sales-dashboard"
element={
<ProtectedRoute>
<RoleProtectedRoute allowedRoles={["Sales Executive"]}>
<SalesDashboard/>
</RoleProtectedRoute>
</ProtectedRoute>
}
/>

<Route
path="/viewer-dashboard"
element={
<ProtectedRoute>
<RoleProtectedRoute allowedRoles={["Viewer"]}>
<ViewerDashboard/>
</RoleProtectedRoute>
</ProtectedRoute>
}
/>

<Route
  path="/products"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["Admin"]}>
        <Products />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/salesperson"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["Admin"]}>
        <SalesPersons />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/regions"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["Admin"]}>
        <Regions />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
);
}

export default App;