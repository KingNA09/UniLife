import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import Assignments from "./pages/Assignments";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "20px", padding: "20px" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/modules">Modules</Link>
        <Link to="/assignments">Assignments</Link>
        <Link to="/finance">Finance</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
