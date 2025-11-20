import { useMemo, useState } from "react";
import { useModuleStore } from "../store/moduleStore";
import { toast } from "react-toastify";
import "./Modules.css";

export default function Modules() {
  const { modules, addModule, deleteModule, updateModule } = useModuleStore();

  const [moduleName, setModuleName] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [query, setQuery] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!moduleName.trim() || !moduleCode.trim()) {
      toast.error("Please enter module name and code");
      return;
    }

    addModule({ name: moduleName.trim(), code: moduleCode.trim() });
    toast.success("Module added");

    setModuleName("");
    setModuleCode("");
  };

  const startEdit = (mod) => {
    setEditingId(mod.id);
    setEditName(mod.name);
    setEditCode(mod.code);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (!editName.trim() || !editCode.trim()) {
      toast.error("Name and code are required");
      return;
    }
    updateModule(editingId, { name: editName.trim(), code: editCode.trim() });
    toast.success("Module updated");
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const ok = window.confirm("Delete this module? This cannot be undone.");
    if (!ok) return;
    deleteModule(id);
    toast.info("Module deleted");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return modules
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((m) => (q ? m.name.toLowerCase().includes(q) || m.code.toLowerCase().includes(q) : true));
  }, [modules, query]);

  return (
    <div className="modules-container">
      <h1 className="modules-title">Modules</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
        <div style={{ color: "var(--muted)" }}>Total modules: <strong>{modules.length}</strong></div>
        <input
          placeholder="Search modules or code"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="module-input"
          style={{ flex: 1 }}
        />
      </div>

      <form className="module-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="module-input"
          placeholder="Module name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />

        <input
          type="text"
          className="module-input"
          placeholder="Module code"
          value={moduleCode}
          onChange={(e) => setModuleCode(e.target.value)}
        />

        <button className="add-button" type="submit">
          Add
        </button>
      </form>

      <ul className="module-list">
        {filtered.map((mod) => (
          <li key={mod.id} className="module-card">
            {editingId === mod.id ? (
              <form style={{ display: "flex", gap: 8, width: "100%" }} onSubmit={saveEdit}>
                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="module-input" />
                <input value={editCode} onChange={(e) => setEditCode(e.target.value)} className="module-input" style={{ maxWidth: 140 }} />
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                  <button type="submit" className="add-button">Save</button>
                  <button type="button" className="delete-button" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <span className="module-info">
                  {mod.name} <strong>({mod.code})</strong>
                </span>

                <div>
                  <button className="add-button" style={{ marginRight: 8 }} onClick={() => startEdit(mod)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(mod.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
