import React from 'react';
function Pagination(props) {
  const { currentPage, totalPages, onPageChange } = props;
  // c pour creer un tableau pour numeroter les  pages
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹ Précédent
      </button>  {pages.map(page => (
  <button
    key={page}
    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
    onClick={() => onPageChange(page)}
  >
    {page}
  </button>
))}  <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      > Suivant ›
      </button>
    </div>
  );
}
export default Pagination;