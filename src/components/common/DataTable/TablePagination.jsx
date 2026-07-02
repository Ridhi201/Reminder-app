import React from "react";

export default function TablePagination({
  totalEntries,
  rowsPerPage,
  currentPage,
  setCurrentPage
}) {
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const start = totalEntries === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalEntries);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1 && totalEntries <= rowsPerPage) {
    // Optional: Hide pagination controls if there's only 1 page or no records,
    // but still show the info.
  }

  return (
    <div className="table-pagination">
      <div className="pagination-info">
        Showing {start} to {end} of {totalEntries} entries
      </div>
      <div className="pagination-controls">
        <button
          className="page-btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="page-btn"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
