import { useFinanceStore } from "../store/financeStore";
import { AgGridReact } from "ag-grid-react";
import { AgCharts } from "ag-charts-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

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

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid var(--surface)",
  fontSize: "14px",
  minWidth: "150px",
};

export default function Finance() {
  const { financeData = [], addRecord, updateRecord, resetToDefaults } = useFinanceStore();

  // AG Grid api reference for exports and actions
  const [gridApi, setGridApi] = useState(null);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  }), []);

  // Add Expense States
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Edit States
  const [editingId, setEditingId] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");

  const startEdit = (record) => {
    setEditingId(record.id);
    setEditCategory(record.category);
    setEditAmount(record.amount);
    setEditDate(record.date);
  };

  const totalSpentNum = financeData.reduce((sum, item) => sum + (item.amount || 0), 0);

  const totalSpentDisplay = financeData.length > 0 ? `£${totalSpentNum.toFixed(2)}` : "";

  const averageSpentDisplay = financeData.length > 0 ? `£${(totalSpentNum / financeData.length).toFixed(2)}` : "";

  const highestCategoryDisplay = (() => {
    if (financeData.length === 0) return "";
    const categoryTotals = {};
    financeData.forEach((item) => {
      const cat = item.category || "Unknown";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + (item.amount || 0);
    });
    const best = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    return best ? best[0] : "";
  })();

  const totalTransactionsDisplay = financeData.length > 0 ? `${financeData.length}` : "";

  // Table columns
  const columns = [
    { headerName: "Category", field: "category", flex: 1 },
    { headerName: "Amount (£)", field: "amount", flex: 1, valueFormatter: (p) => (p.value != null ? `£${p.value}` : "") },
    { headerName: "Date", field: "date", flex: 1 },

    {
      headerName: "Actions",
      field: "id",
      flex: 1,
      cellRenderer: (params) => {
        return (
          <button
            onClick={() => startEdit(params.data)}
            style={{
              background: "var(--primary)",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        );
      },
    },
  ];

  // Chart configuration
  const chartOptions = useMemo(() => {
    return {
      data: financeData,
      series: [
        {
          type: "column",
          xKey: "category",
          yKey: "amount",
          yName: "Amount Spent (£)",
        },
      ],
      title: { text: "Spending by Category" },
    };
  }, [financeData]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Finance Dashboard</h1>

      {/* ADD EXPENSE FORM */}
      <div className="card"
          style={{
            marginBottom: "30px",
            padding: "20px",
            background: "var(--card-bg)",
            border: "1px solid var(--surface)",
            borderRadius: "12px",
          }}
      >
        <h2 style={{ marginBottom: "15px" }}>Add New Expense</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!category || !amount || !date) {
              toast.error("Please fill category, amount and date");
              return;
            }
            const n = Number(amount);
            if (Number.isNaN(n) || n <= 0) {
              toast.error("Amount must be a number greater than 0");
              return;
            }

            addRecord({
              category,
              amount: n,
              date,
            });

            toast.success("Expense added");

            setCategory("");
            setAmount("");
            setDate("");
          }}
          style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Books">Books</option>
            <option value="Gym">Gym</option>
            <option value="Rent">Rent</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            placeholder="Amount (£)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

            <button
              type="submit"
              style={{
                padding: "10px 18px",
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Add Expense
            </button>
        </form>
      </div>

      {/* EDITING FORM */}
      {editingId && (
        <div className="card"
          style={{
            marginBottom: "30px",
            padding: "20px",
            background: "var(--card-bg)",
            border: "1px solid var(--surface)",
            borderRadius: "12px",
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>Edit Expense</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();

                const n = Number(editAmount);
                if (Number.isNaN(n) || n <= 0) {
                  toast.error("Amount must be a number greater than 0");
                  return;
                }

                updateRecord(editingId, {
                  category: editCategory,
                  amount: n,
                  date: editDate,
                });

                toast.success("Expense updated");

                setEditingId(null);
            }}
            style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
          >
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              style={inputStyle}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Books">Books</option>
              <option value="Gym">Gym</option>
              <option value="Rent">Rent</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              style={inputStyle}
            />

            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                padding: "10px 18px",
                background: "var(--success)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditingId(null)}
              style={{
                padding: "10px 18px",
                background: "var(--danger)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div className="card" style={cardStyle}>
          <h3>Total Spent</h3>
          <p style={valueStyle}>{totalSpentDisplay}</p>
        </div>

        <div className="card" style={cardStyle}>
          <h3>Average per Purchase</h3>
          <p style={valueStyle}>{averageSpentDisplay}</p>
        </div>

        <div className="card" style={cardStyle}>
          <h3>Top Category</h3>
          <p style={valueStyle}>{highestCategoryDisplay}</p>
        </div>

        <div className="card" style={cardStyle}>
          <h3>Transactions</h3>
          <p style={valueStyle}>{totalTransactionsDisplay}</p>
        </div>
      </div>

      {/* AG GRID TABLE */}
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button
          onClick={() => gridApi && gridApi.exportDataAsCsv({ fileName: "finance_data.csv" })}
          style={{ padding: "8px 12px", borderRadius: 8, background: "var(--primary)", color: "white", border: "none", cursor: "pointer" }}
        >
          Export CSV
        </button>

        <button
          onClick={() => {
            const ok = window.confirm("Reset finance data to defaults? This will overwrite saved purchases.");
            if (!ok) return;
            try {
              resetToDefaults();
              toast.info("Finance data reset to defaults");
            } catch (e) {
              toast.error("Could not reset data");
            }
          }}
          style={{ padding: "8px 12px", borderRadius: 8, background: "var(--danger)", color: "white", border: "none", cursor: "pointer" }}
        >
          Reset to defaults
        </button>

        <div style={{ color: "var(--muted)", alignSelf: "center" }}>Rows: {financeData.length}</div>
      </div>

      <div className="ag-theme-quartz" style={{ height: 300, marginBottom: 40 }}>
        <AgGridReact
          columnDefs={columns}
          rowData={financeData}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          onGridReady={(params) => setGridApi(params.api)}
        />
      </div>

      {/* CHART */}
      <div style={{ height: "400px" }}>
        <AgCharts options={chartOptions} />
      </div>
    </div>
  );
}
