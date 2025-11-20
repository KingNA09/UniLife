import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import Assignments from "./pages/Assignments";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import { useAuthStore } from "./store/authStore";

// PrivateRoute redirects to /login if the user is not logged in
function PrivateRoute({ element }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/login" replace />;
}

// LogoutButton logs out the user and navigates to login
function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        logout();
        navigate("/login", { replace: true });
      }}
      style={{ marginLeft: "auto" }}
    >
      Logout
    </button>
  );
}

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <nav style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/modules">Modules</Link>
        <Link to="/assignments">Assignments</Link>
        <Link to="/finance">Finance</Link>
        <Link to="/settings">Settings</Link>

        {/* Show Login or Logout depending on auth state */}
        {isLoggedIn ? <LogoutButton /> : <Link to="/login">Login</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/modules" element={<PrivateRoute element={<Modules />} />} />
        <Route path="/assignments" element={<PrivateRoute element={<Assignments />} />} />
        <Route path="/finance" element={<PrivateRoute element={<Finance />} />} />
        <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
        <Route path="/login" element={<Login />} />

        {/* Redirect any unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
