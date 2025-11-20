import { useMemo, useState } from "react";
import { useAssignmentStore } from "../store/assignmentStore";
import { toast } from "react-toastify";

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

const inputStyle = { padding: 10, borderRadius: 8, border: "1px solid var(--surface)", background: "var(--card-bg)", minWidth: 220 };

const cardStyle = {
  padding: "18px",
  background: "var(--card-bg)",
  borderRadius: "10px",
  border: "1px solid #e6edf3",
  boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
};

const metaStyle = { color: "#6b7280", fontSize: 13 };

export default function Assignments() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const assignments = useAssignmentStore((s) => s.assignments);
  const addAssignment = useAssignmentStore((s) => s.addAssignment);
  const deleteAssignment = useAssignmentStore((s) => s.deleteAssignment);

  // Add form state
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [statusNew, setStatusNew] = useState("pending");

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

      {/* Add Assignment Form */}
      <div style={{ marginBottom: 18 }}>
        <form style={{ display: "flex", gap: 12, flexWrap: "wrap" }} onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !course.trim() || !dueDate) {
            toast.error("Please provide title, course and due date");
            return;
          }

          addAssignment({ title: title.trim(), course: course.trim(), dueDate, status: statusNew, grade: null, notes: notes.trim() });
          toast.success("Assignment added");
          setTitle(""); setCourse(""); setDueDate(""); setNotes(""); setStatusNew("pending");
        }}>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
          <input placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} style={inputStyle} />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={inputStyle} />
          <select value={statusNew} onChange={(e) => setStatusNew(e.target.value)} style={inputStyle}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <input placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...inputStyle, minWidth: 280 }} />
          <button type="submit" style={{ padding: "10px 14px", background: "var(--primary)", color: "white", border: "none", borderRadius: 8 }}>Add Assignment</button>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 18 }}>
        <div className="card" style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>Total</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{totals.total}</div>
        </div>
        <div className="card" style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>Completed</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{totals.completed}</div>
        </div>
        <div className="card" style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>Upcoming</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{totals.upcoming}</div>
        </div>
        <div className="card" style={cardStyle}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>Overdue</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: totals.overdue ? "var(--danger)" : "var(--card-text)" }}>{totals.overdue}</div>
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
          <div key={a.id} className="card" style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ maxWidth: "70%" }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{a.title}</div>
              <div style={metaStyle}>{a.course} • Due {new Date(a.dueDate).toLocaleDateString()}</div>
              <div style={{ marginTop: 8, color: "var(--card-text)" }}>{a.notes}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{a.grade ?? "—"}</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ padding: "6px 10px", borderRadius: 999, background: a.status === "completed" ? "var(--success-surface)" : a.status === "overdue" ? "var(--danger-surface)" : "var(--primary-surface)", color: a.status === "completed" ? "var(--success)" : a.status === "overdue" ? "var(--danger)" : "var(--primary)", fontWeight: 600, fontSize: 12 }}>
                  {a.status.toUpperCase()}
                </span>
              </div>
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={() => {
                    const ok = window.confirm('Delete this assignment?');
                    if (!ok) return;
                    deleteAssignment(a.id);
                    toast.info('Assignment deleted');
                  }}
                  style={{ marginTop: 8, padding: "8px 10px", borderRadius: 8, background: "var(--danger)", color: "white", border: "none", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && <div style={{ color: "var(--muted)" }}>No assignments match your search.</div>}
      </div>
    </div>
  );
}
