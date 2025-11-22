import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Accept any non-empty username and password for demo purposes
    if (username.trim() && password.trim()) {
      console.log("Logging in user:", username);
      login(username.trim());
      toast.success(`Signed in as ${username.trim()}`);
      navigate("/"); // send user to dashboard
    } else {
      toast.error("Please enter username and password");
    }
  };

  return (
    <div style={styles.container}>
      <div className="card" style={styles.card}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--primary)", marginBottom: 6 }}>UniLife</div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 14 }}>Smart student planner — finances, modules & assignments</div>
        </div>
        <h1 style={{ marginBottom: "12px" }}>Login</h1>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--surface)",
  },
  card: {
    background: "var(--card-bg)",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid var(--surface)",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    background: "var(--primary)",
    border: "none",
    color: "white",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
