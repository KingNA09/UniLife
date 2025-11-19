import { useFinanceStore } from "../store/financeStore";
import { AgGridReact } from "ag-grid-react";
import { AgCharts } from "ag-charts-react";
import { useMemo } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const cardStyle = {
  padding: "20px",
  background: "#f9fafb",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const valueStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "10px",
};

export default function Finance() {
  const { financeData = [] } = useFinanceStore();

  const totalSpent = financeData.reduce((sum, item) => sum + item.amount, 0);

  const averageSpent =
    financeData.length > 0 ? (totalSpent / financeData.length).toFixed(2) : 0;

  const highestCategory = (() => {
    if (financeData.length === 0) return "N/A";

    const categoryTotals = {};

    financeData.forEach((item) => {
      if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
      }
      categoryTotals[item.category] += item.amount;
    });

    return Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0];
  })();

  const totalTransactions = financeData.length;

  // Table columns
  const columns = [
    { headerName: "Category", field: "category", flex: 1 },
    { headerName: "Amount (£)", field: "amount", flex: 1 },
    { headerName: "Date", field: "date", flex: 1 },
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
      title: {
        text: "Spending by Category",
      },
    };
  }, [financeData]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Finance Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Spent</h3>
          <p style={valueStyle}>£{totalSpent.toFixed(2)}</p>
        </div>

        <div style={cardStyle}>
          <h3>Average per Purchase</h3>
          <p style={valueStyle}>£{averageSpent}</p>
        </div>

        <div style={cardStyle}>
          <h3>Top Category</h3>
          <p style={valueStyle}>{highestCategory}</p>
        </div>

        <div style={cardStyle}>
          <h3>Transactions</h3>
          <p style={valueStyle}>{totalTransactions}</p>
        </div>
      </div>

      <div
        className="ag-theme-quartz"
        style={{ height: 300, marginBottom: 40 }}
      >
        <AgGridReact columnDefs={columns} rowData={financeData} />
      </div>

      <div style={{ height: "400px" }}>
        <AgCharts options={chartOptions} />
      </div>
    </div>
  );
}
