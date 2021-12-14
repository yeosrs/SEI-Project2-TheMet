import React from "react";

const Pagination = (props) => {
  return (
    <nav className="nav">
      <ul className="pagination">
        {props.linkPages.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => props.paginate(number)}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
