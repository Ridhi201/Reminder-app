import React from "react";
import { FaFileCsv, FaFileExcel } from "react-icons/fa";

export default function TableToolbar({
  data,
  columns,
  selectedIds,
  bulkActions = [],
  rowsPerPage,
  setRowsPerPage,
  keyField = "id"
}) {
  const selectedCount = selectedIds.size;
  const selectedRows = data.filter((row) => selectedIds.has(row[keyField]));

  // Helper to format values for file export (strips out HTML / React components)
  const formatExportValue = (val) => {
    if (val === null || val === undefined) return "";
    // If it's a JSX or object, we fallback to stringifying or empty (usually raw data key value is best)
    if (React.isValidElement(val)) return ""; 
    return String(val);
  };

  // CSV Export
  const exportCSV = (exportSelectedOnly) => {
    const targetData = exportSelectedOnly ? selectedRows : data;
    const exportColumns = columns.filter(col => col.key !== "actions");
    
    const headers = exportColumns.map(col => `"${col.label || col.key}"`).join(",");
    const rows = targetData.map(row => 
      exportColumns.map(col => {
        const val = formatExportValue(row[col.key]);
        const cleanVal = val.replace(/"/g, '""');
        return `"${cleanVal}"`;
      }).join(",")
    );

    const csvContent = "\uFEFF" + [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `export_users_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Excel Export
  const exportExcel = (exportSelectedOnly) => {
    const targetData = exportSelectedOnly ? selectedRows : data;
    const exportColumns = columns.filter(col => col.key !== "actions");

    const headers = exportColumns.map(col => `<th>${col.label || col.key}</th>`).join("");
    const rows = targetData.map(row => {
      const cells = exportColumns.map(col => `<td>${formatExportValue(row[col.key])}</td>`).join("");
      return `<tr>${cells}</tr>`;
    }).join("");

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Export</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <meta charset="utf-8">
      </head>
      <body>
        <table border="1">
          <thead>
            <tr style="background-color: #f8fafc; font-weight: bold;">${headers}</tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `export_users_${new Date().toISOString().slice(0,10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="table-toolbar">
      <div className="toolbar-left">
        {selectedCount > 0 ? (
          <div className="bulk-actions-bar">
            <span className="selected-count">{selectedCount} selected</span>
            <div className="bulk-btn-group">
              {bulkActions.map((action, idx) => (
                <button
                  key={idx}
                  className={`bulk-btn ${action.className || ""}`}
                  onClick={() => action.onClick(Array.from(selectedIds))}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="rows-selector">
            <span>Show</span>
            <select
              className="rows-select"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
        )}
      </div>

      <div className="toolbar-right">
        <div className="export-btn-group">
          <button
            className="export-btn"
            onClick={() => exportCSV(selectedCount > 0)}
            title={selectedCount > 0 ? "Export selected rows to CSV" : "Export all rows to CSV"}
          >
            <FaFileCsv size={16} color="#10b981" />
            <span>CSV {selectedCount > 0 ? "Selected" : "All"}</span>
          </button>
          <button
            className="export-btn"
            onClick={() => exportExcel(selectedCount > 0)}
            title={selectedCount > 0 ? "Export selected rows to Excel" : "Export all rows to Excel"}
          >
            <FaFileExcel size={16} color="#217346" />
            <span>Excel {selectedCount > 0 ? "Selected" : "All"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
