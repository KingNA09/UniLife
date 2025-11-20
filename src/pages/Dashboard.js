import { useMemo } from "react";
import { useFinanceStore } from "../store/financeStore";
import { useModuleStore } from "../store/moduleStore";
import { useAssignmentStore } from "../store/assignmentStore";

const containerStyle = {
  padding: 24,
  maxWidth: 1100,
  margin: "0 auto",
  fontFamily: "Inter, Arial, sans-serif",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const titleStyle = { fontSize: 28, fontWeight: 700 };

const subtitleStyle = { color: "var(--muted)" };

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 30,
};

const cardStyle = {
  padding: "20px",
  background: "var(--card-bg)",
  borderRadius: "12px",
  border: "1px solid var(--surface)",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const valueStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "10px",
};

const panelsStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 400px",
  gap: 20,
};

export default function Dashboard() {
  const { financeData = [] } = useFinanceStore();
  const { modules = [] } = useModuleStore();

  const totalSpent = useMemo(
    () => financeData.reduce((s, it) => s + (it.amount || 0), 0),
    [financeData]
  );

  const totalTransactions = financeData.length;

  const moduleCount = modules.length;

  const assignments = useAssignmentStore((s) => s.assignments);
  const assignmentCount = assignments.length;

  const recentTransactions = useMemo(() => {
    return financeData.slice().sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 5);
  }, [financeData]);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <div style={titleStyle}>Dashboard</div>
          <div style={subtitleStyle}>Overview of your UniLife activity</div>
        </div>
      </div>

      <div style={gridStyle}>
        <div className="card" style={cardStyle}>
          <h4>Total Spent</h4>
          <div style={valueStyle}>£{totalSpent.toFixed(2)}</div>
          <div style={{ color: "var(--muted)", marginTop: 8 }}>All recorded transactions</div>
        </div>

        <div className="card" style={cardStyle}>
          <h4>Modules</h4>
          <div style={valueStyle}>{moduleCount}</div>
          <div style={{ color: "var(--muted)", marginTop: 8 }}>Modules you are tracking</div>
        </div>

        <div className="card" style={cardStyle}>
          <h4>Transactions</h4>
          <div style={valueStyle}>{totalTransactions}</div>
          <div style={{ color: "var(--muted)", marginTop: 8 }}>Recent activity count</div>
        </div>

        <div className="card" style={cardStyle}>
          <h4>Assignments</h4>
          <div style={valueStyle}>{assignmentCount}</div>
          <div style={{ color: "var(--muted)", marginTop: 8 }}>{assignmentCount === 0 ? "No assignments yet" : "Assignments you're tracking"}</div>
        </div>
      </div>

      <div style={panelsStyle}>
        <div className="card" style={{ ...cardStyle }}>
          <h4>Recent Transactions</h4>
          {recentTransactions.length === 0 ? (
            <div style={{ color: "var(--muted)", marginTop: 12 }}>No transactions recorded</div>
          ) : (
            <table style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}>
              <thead style={{ textAlign: "left", color: "var(--muted)" }}>
                <tr>
                  <th style={{ padding: "6px 8px" }}>Date</th>
                  <th style={{ padding: "6px 8px" }}>Category</th>
                  <th style={{ padding: "6px 8px" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t) => (
                  <tr key={t.id}>
                    <td style={{ padding: "8px", borderTop: "1px solid var(--surface)" }}>{t.date}</td>
                    <td style={{ padding: "8px", borderTop: "1px solid var(--surface)" }}>{t.category}</td>
                    <td style={{ padding: "8px", borderTop: "1px solid var(--surface)" }}>£{t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card" style={{ ...cardStyle }}>
          <h4>Modules</h4>
          {moduleCount === 0 ? (
            <div style={{ color: "var(--muted)", marginTop: 12 }}>You haven't added any modules yet.</div>
          ) : (
            <ul style={{ padding: 0, marginTop: 12, listStyle: "none" }}>
              {modules.slice(0, 6).map((m) => (
                <li key={m.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--surface)" }}>
                  {m.name || m.title || "Module"}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
