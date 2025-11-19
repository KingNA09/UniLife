import { useMemo, useState } from "react";

const containerStyle = {
  padding: 24,
  maxWidth: 1000,
  margin: "0 auto",
  fontFamily: "Inter, Arial, sans-serif",
};

const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 };

const titleStyle = { fontSize: 28, fontWeight: 700 };

const subtitleStyle = { color: "#6b7280" };

const controlsStyle = { display: "flex", gap: 12, alignItems: "center", marginBottom: 18 };

const inputStyle = { padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", minWidth: 220 };

const cardStyle = {
  padding: "18px",
  background: "#fff",
  borderRadius: "10px",
  border: "1px solid #e6edf3",
  boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
};

const metaStyle = { color: "#6b7280", fontSize: 13 };

export default function Assignments() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Sample data; replace with real store data as available
  const assignments = useMemo(
    () => [
      { id: 1, title: "Research Essay", course: "History 201", dueDate: "2025-12-01", status: "pending", grade: null, notes: "1500-2000 words" },
      { id: 2, title: "Lab Report", course: "Chemistry 102", dueDate: "2025-11-25", status: "completed", grade: "A-", notes: "Include methods and results" },
      { id: 3, title: "Presentation", course: "Marketing 310", dueDate: "2025-11-28", status: "pending", grade: null, notes: "10 minute group presentation" },
      { id: 4, title: "Problem Set 4", course: "Math 120", dueDate: "2025-11-20", status: "overdue", grade: null, notes: "Show full workings" },
    ],
    []
  );

  const filtered = useMemo(() => {
    return assignments
      .filter((a) => (filter === "all" ? true : a.status === filter))
      .filter((a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.course.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [assignments, filter, query]);

  const totals = useMemo(() => {
    const total = assignments.length;
    const completed = assignments.filter((a) => a.status === "completed").length;
    const overdue = assignments.filter((a) => a.status === "overdue").length;
    const upcoming = assignments.filter((a) => a.status === "pending").length;
    return { total, completed, overdue, upcoming };
  }, [assignments]);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <div style={titleStyle}>Assignments</div>
          <div style={subtitleStyle}>Organize and track coursework to present professionally</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 18 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>Total</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{totals.total}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>Completed</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{totals.completed}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>Upcoming</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{totals.upcoming}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>Overdue</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: totals.overdue ? "#dc2626" : "#111827" }}>{totals.overdue}</div>
        </div>
      </div>

      <div style={controlsStyle}>
        <input placeholder="Search assignments or course" value={query} onChange={(e) => setQuery(e.target.value)} style={inputStyle} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={inputStyle}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map((a) => (
          <div key={a.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ maxWidth: "70%" }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{a.title}</div>
              <div style={metaStyle}>{a.course} • Due {new Date(a.dueDate).toLocaleDateString()}</div>
              <div style={{ marginTop: 8, color: "#374151" }}>{a.notes}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{a.grade ?? "—"}</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ padding: "6px 10px", borderRadius: 999, background: a.status === "completed" ? "#ecfdf5" : a.status === "overdue" ? "#fff1f2" : "#eff6ff", color: a.status === "completed" ? "#059669" : a.status === "overdue" ? "#dc2626" : "#1e40af", fontWeight: 600, fontSize: 12 }}>
                  {a.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && <div style={{ color: "#6b7280" }}>No assignments match your search.</div>}
      </div>
    </div>
  );
}
