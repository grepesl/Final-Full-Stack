import React from 'react';
import './Pagination.css';

const Pagination = ({ filteredDataAmount, pageSize, currentPage, changePage }) => {
    const lastPage = Math.ceil(filteredDataAmount / pageSize);

    const renderPageButton = (page) => (
        <button key={page} onClick={() => changePage(page)}>
            {page}
        </button>
    );

    const renderEllipsis = (key) => <span key={key}>...</span>;

    const pages = [];

    if (currentPage > 1) pages.push(renderPageButton(1));
    if (currentPage - 3 > 1) pages.push(renderEllipsis("start-ellipsis"));
    if (currentPage - 2 > 1) pages.push(renderPageButton(currentPage - 2));
    if (currentPage - 1 > 1) pages.push(renderPageButton(currentPage - 1));

    pages.push(
        <button key={currentPage} disabled>
            {currentPage}
        </button>
    );

    if (currentPage + 1 < lastPage) pages.push(renderPageButton(currentPage + 1));
    if (currentPage + 2 < lastPage) pages.push(renderPageButton(currentPage + 2));
    if (currentPage + 3 < lastPage) pages.push(renderEllipsis("end-ellipsis"));
    if (currentPage !== lastPage) pages.push(renderPageButton(lastPage));

    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, filteredDataAmount);

    return (
        <div>
            <div className="pagination-buttons">
                <button
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                >
                    Back
                </button>
                {pages}
                <button
                    disabled={currentPage === lastPage}
                    onClick={() => changePage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
            <p>
                Rodoma {from} - {to} iš {filteredDataAmount} klausimų
            </p>
        </div>
    );
};

export default Pagination;