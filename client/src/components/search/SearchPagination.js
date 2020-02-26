import React, { Component } from "react";

const paginationPagesLimit = 5;

const getSurroundingPageNumbers = (numberOfPages, currentPage) => {
  let startIndex = Math.max(
    currentPage - Math.floor(paginationPagesLimit / 2),
    1
  );

  if (startIndex + paginationPagesLimit > numberOfPages)
    startIndex = numberOfPages - paginationPagesLimit + 1;

  if (numberOfPages < paginationPagesLimit) startIndex = 1;

  let resultArray = [];

  for (let i = 0; i < Math.min(numberOfPages, paginationPagesLimit); i++) {
    resultArray = [...resultArray, startIndex + i - 1];
  }

  return resultArray;
};

class SearchPagination extends Component {
  render() {
    return (
      <nav aria-label="...">
        <ul className="pagination center">
          <li
            className={
              this.props.currentFetchPage - 1 === 0
                ? "page-item disabled"
                : "page-item"
            }
          >
            <button
              className="page-link"
              disabled={this.props.currentFetchPage - 1 === 0}
              onClick={() => this.props.fetchSetups(1)}
            >
              {"<<"}
            </button>
          </li>
          <li
            className={
              this.props.currentFetchPage - 1 === 0
                ? "page-item disabled"
                : "page-item"
            }
          >
            <button
              className="page-link"
              disabled={this.props.currentFetchPage - 1 === 0}
              onClick={() =>
                this.props.fetchSetups(this.props.currentFetchPage - 1)
              }
            >
              {"<"}
            </button>
          </li>
          {getSurroundingPageNumbers(
            this.props.numberOfPages,
            this.props.currentFetchPage
          ).map(i => (
            <li
              key={i}
              className={
                i + 1 === this.props.currentFetchPage
                  ? "page-item active"
                  : "page-item"
              }
            >
              <button
                className="page-link"
                disabled={i + 1 === this.props.currentFetchPage}
                onClick={() => this.props.fetchSetups(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={
              this.props.currentFetchPage === this.props.numberOfPages ||
              (this.props.currentFetchPage - 1 === this.props.numberOfPages &&
                this.props.numberOfPages === 0)
                ? "page-item disabled"
                : "page-item"
            }
          >
            <button
              className="page-link"
              disabled={
                this.props.currentFetchPage === this.props.numberOfPages ||
                (this.props.currentFetchPage - 1 === this.props.numberOfPages &&
                  this.props.numberOfPages === 0)
              }
              onClick={() =>
                this.props.fetchSetups(this.props.currentFetchPage + 1)
              }
            >
              {">"}
            </button>
          </li>
          <li
            className={
              this.props.currentFetchPage === this.props.numberOfPages ||
              (this.props.currentFetchPage - 1 === this.props.numberOfPages &&
                this.props.numberOfPages === 0)
                ? "page-item disabled"
                : "page-item"
            }
          >
            <button
              className="page-link"
              disabled={
                this.props.currentFetchPage === this.props.numberOfPages ||
                (this.props.currentFetchPage - 1 === this.props.numberOfPages &&
                  this.props.numberOfPages === 0)
              }
              onClick={() => this.props.fetchSetups(this.props.numberOfPages)}
            >
              {">>"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default SearchPagination;
