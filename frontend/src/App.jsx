import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import VarianceReport from "./pages/VarianceReport";

import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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
      </Routes>
    </BrowserRouter>
  )
  }

export default App;