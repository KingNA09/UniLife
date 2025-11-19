import { useState } from "react";
import { useModuleStore } from "../store/moduleStore";
import "./Modules.css";

export default function Modules() {
  const { modules, addModule, deleteModule } = useModuleStore();

  const [moduleName, setModuleName] = useState("");
  const [moduleCode, setModuleCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!moduleName.trim() || !moduleCode.trim()) return;

    addModule({ name: moduleName, code: moduleCode });

    setModuleName("");
    setModuleCode("");
  };

  return (
    <div className="modules-container">
      <h1 className="modules-title">Modules</h1>

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
        {modules.map((mod) => (
          <li key={mod.id} className="module-card">
            <span className="module-info">
              {mod.name} <strong>({mod.code})</strong>
            </span>

            <button
              className="delete-button"
              onClick={() => deleteModule(mod.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
