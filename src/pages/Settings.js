import { useState } from "react";

const containerStyle = {
  padding: 24,
  maxWidth: 1000,
  margin: "0 auto",
  fontFamily: "Inter, Arial, sans-serif",
};

const headerStyle = { marginBottom: 18 };

const titleStyle = { fontSize: 28, fontWeight: 700 };

const subtitleStyle = { color: "#6b7280", marginTop: 6 };

const layoutStyle = { display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 };

const cardStyle = {
  padding: "18px",
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e6edf3",
  boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
};

const labelStyle = { fontSize: 13, color: "#374151", marginBottom: 6 };

const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb" };

const buttonPrimary = {
  padding: "10px 14px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const dangerStyle = { padding: "10px 14px", background: "#ef4444", color: "white", borderRadius: 8, border: "none", cursor: "pointer" };

export default function Settings() {
  const [displayName, setDisplayName] = useState("Emmanuel Amoako");
  const [email, setEmail] = useState("you@example.com");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Settings</div>
        <div style={subtitleStyle}>Manage your profile, preferences and account</div>
      </div>

      <div style={layoutStyle}>
        <div>
          <div style={cardStyle}>
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
              <button style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #e5e7eb", background: "white", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>

          <div style={{ ...cardStyle, marginTop: 20 }}>
            <h3 style={{ marginTop: 0 }}>Preferences</h3>

            <div style={{ marginTop: 12 }}>
              <div style={labelStyle}>Theme</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setTheme("light")} style={{ padding: "8px 10px", borderRadius: 8, border: theme === "light" ? "2px solid #4f46e5" : "1px solid #e5e7eb", background: "white", cursor: "pointer" }}>Light</button>
                <button onClick={() => setTheme("dark")} style={{ padding: "8px 10px", borderRadius: 8, border: theme === "dark" ? "2px solid #4f46e5" : "1px solid #e5e7eb", background: "white", cursor: "pointer" }}>Dark</button>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={labelStyle}>Notifications</div>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                <span style={{ color: "#374151" }}>Email notifications for important updates</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Account</h3>
            <div style={{ marginTop: 12 }}>
              <div style={labelStyle}>Connected accounts</div>
              <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>GitHub</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Connected as @KingNA09</div>
                  </div>
                  <button style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "white" }}>Disconnect</button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>Google</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Not connected</div>
                  </div>
                  <button style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "white" }}>Connect</button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={labelStyle}>Danger zone</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button style={dangerStyle}>Delete account</button>
                <button style={{ padding: "10px 14px", borderRadius: 8, background: "#f3f4f6", border: "1px solid #e5e7eb" }}>Sign out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
