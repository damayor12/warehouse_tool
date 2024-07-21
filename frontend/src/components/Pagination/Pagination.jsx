import React from 'react';

const Pagination = ({ totalPages, currentPage, setPage }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
      data-testid="pagination"
    >
      <ul
        className="pagination"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
            style={{ marginRight: '16px', backgroundColor: 'red' }}
          >
            <button
              onClick={() => setPage(page)}
              className="page-link"
              data-testid="pagination-page"
              style={{
                backgroundColor: currentPage === page ? 'cyan' : '',
                padding: '1rem',
                cursor: 'pointer',
              }}
            >
              &#x2022; {page} &#x2022;
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
