import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(role)) {

        switch (role) {

            case "Admin":
                return <Navigate to="/dashboard" replace />;

            case "Manager":
                return <Navigate to="/manager-dashboard" replace />;

            case "Sales Executive":
                return <Navigate to="/sales-dashboard" replace />;

            case "Viewer":
                return <Navigate to="/viewer-dashboard" replace />;

            default:
                return <Navigate to="/" replace />;
        }
    }

    return children;
}

export default RoleProtectedRoute;