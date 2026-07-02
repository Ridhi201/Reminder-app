import React, { useState, useMemo, useEffect } from "react";
import Checkbox from "../Checkbox";
import TableToolbar from "./TableToolbar";
import TablePagination from "./TablePagination";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "./DataTable.css";

export default function DataTable({
  data = [],
  columns = [],
  keyField = "id",
  selectable = true,
  bulkActions = [],
  initialRowsPerPage = 10,
  initialSortField = "",
  initialSortDirection = "asc"
}) {
  // States
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [sortField, setSortField] = useState(initialSortField);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  // Reset page to 1 when search/filter changes the dataset length
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set()); // Reset selections on list change
  }, [data.length]);

  // Sort Data
  const sortedData = useMemo(() => {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Format comparisons (strings case-insensitive, empty values last)
      if (aVal === undefined || aVal === null) aVal = "";
      if (bVal === undefined || bVal === null) bVal = "";

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // Numbers or other comparable types
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDirection]);

  // Paginate Data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  // Handle Select All Checkbox
  const isAllSelected = useMemo(() => {
    if (data.length === 0) return false;
    // Check if every item in currently filtered dataset is selected
    return data.every((row) => selectedIds.has(row[keyField]));
  }, [data, selectedIds, keyField]);

  const handleSelectAll = () => {
    const newSelected = new Set(selectedIds);
    if (isAllSelected) {
      // Remove all items in the current filtered list from selection
      data.forEach((row) => newSelected.delete(row[keyField]));
    } else {
      // Add all items in the current filtered list to selection
      data.forEach((row) => newSelected.add(row[keyField]));
    }
    setSelectedIds(newSelected);
  };

  // Handle Single Selection Checkbox
  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Handle Header Sort Click
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Render sort icon helper
  const renderSortIcon = (col) => {
    if (!col.sortable) return null;
    const isActive = sortField === col.key;
    return (
      <span className={`sort-icon-container ${isActive ? "active" : ""}`}>
        {isActive ? (
          sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />
        ) : (
          <FaSort />
        )}
      </span>
    );
  };

  return (
    <div className="data-table-container">
      {/* Toolbar (Export, Bulk Actions, Rows Selector) */}
      <TableToolbar
        data={data}
        columns={columns}
        selectedIds={selectedIds}
        bulkActions={bulkActions}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        keyField={keyField}
      />

      {/* Table Element */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              {selectable && (
                <th className="checkbox-cell">
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.sortable ? "sortable" : ""}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="header-content">
                    <span>{col.label}</span>
                    {renderSortIcon(col)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ textAlign: "center", padding: "40px" }}>
                  <div style={{ color: "#64748b", fontSize: "15px" }}>No items found</div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const rowId = row[keyField];
                const isSelected = selectedIds.has(rowId);
                return (
                  <tr key={rowId} className={isSelected ? "selected" : ""}>
                    {selectable && (
                      <td className="checkbox-cell">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowId)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Showing Info, Prev/Next controls) */}
      {data.length > 0 && (
        <TablePagination
          totalEntries={data.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
