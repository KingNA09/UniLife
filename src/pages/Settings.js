import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const containerStyle = {
  padding: 24,
  maxWidth: 1000,
  margin: "0 auto",
  fontFamily: "Inter, Arial, sans-serif",
};

const headerStyle = { marginBottom: 18 };

const titleStyle = { fontSize: 28, fontWeight: 700 };

const subtitleStyle = { color: "var(--muted)", marginTop: 6 };

const layoutStyle = { display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 };

const cardStyle = {
  padding: "18px",
  background: "var(--card-bg)",
  borderRadius: "12px",
  border: "1px solid var(--surface)",
  boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
};

const labelStyle = { fontSize: 13, color: "var(--muted)", marginBottom: 6 };

const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--surface)", background: "var(--card-bg)" };

const buttonPrimary = {
  padding: "10px 14px",
  background: "var(--primary)",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const dangerStyle = { padding: "10px 14px", background: "var(--danger)", color: "white", borderRadius: 8, border: "none", cursor: "pointer" };

export default function Settings() {
  const [displayName, setDisplayName] = useState("Emmanuel Amoako");
  const [email, setEmail] = useState("you@example.com");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("unilife_theme") || "light";
    setTheme(saved);
    try {
      document.documentElement.setAttribute("data-theme", saved);
    } catch (e) {
      // ignore in non-browser environments
    }
  }, []);

  function applyTheme(next) {
    setTheme(next);
    localStorage.setItem("unilife_theme", next);
    try {
      document.documentElement.setAttribute("data-theme", next);
    } catch (e) {}
    toast.success(`Theme set to ${next}`);
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Settings</div>
        <div style={subtitleStyle}>Manage your profile, preferences and account</div>
      </div>

      <div style={layoutStyle}>
        <div>
          <div className="card" style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Profile</h3>
            <div style={{ marginTop: 12 }}>
              <div style={labelStyle}>Display name</div>
              <input style={inputStyle} value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={labelStyle}>Email</div>
              <input style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button style={buttonPrimary}>Save profile</button>
              <button style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid var(--surface)", background: "var(--card-bg)", color: "var(--card-text)", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>

          <div className="card" style={{ ...cardStyle, marginTop: 20 }}>
            <h3 style={{ marginTop: 0 }}>Preferences</h3>

            <div style={{ marginTop: 12 }}>
              <div style={labelStyle}>Theme</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => applyTheme("light")} style={{ padding: "8px 10px", borderRadius: 8, border: theme === "light" ? "2px solid var(--primary)" : "1px solid var(--surface)", background: "var(--card-bg)", color: "var(--card-text)", cursor: "pointer" }}>Light</button>
                <button onClick={() => applyTheme("dark")} style={{ padding: "8px 10px", borderRadius: 8, border: theme === "dark" ? "2px solid var(--primary)" : "1px solid var(--surface)", background: "var(--card-bg)", color: "var(--card-text)", cursor: "pointer" }}>Dark</button>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={labelStyle}>Notifications</div>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                <span style={{ color: "var(--muted)" }}>Email notifications for important updates</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Account</h3>
            <div style={{ marginTop: 12 }}>
              <div style={labelStyle}>Connected accounts</div>
              <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                        <div style={{ fontWeight: 700 }}>GitHub</div>
                        <div style={{ color: "var(--muted)", fontSize: 13 }}>Connected as @KingNA09</div>
                  </div>
                  <button style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--surface)", background: "var(--card-bg)", color: "var(--card-text)" }}>Disconnect</button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>Google</div>
                    <div style={{ color: "var(--muted)", fontSize: 13 }}>Not connected</div>
                  </div>
                  <button style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--surface)", background: "var(--card-bg)", color: "var(--card-text)" }}>Connect</button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={labelStyle}>Danger zone</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button style={dangerStyle}>Delete account</button>
                <button
                  onClick={() => {
                    logout();
                    toast.info("Signed out");
                    navigate("/login");
                  }}
                  style={{ padding: "10px 14px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--surface)", cursor: "pointer" }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
