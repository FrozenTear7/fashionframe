import React from "react";
import { Link } from "react-router-dom";

const SearchListItem = props => {
  const { setup } = props;

  return (
    <div>
      <Link to={`/fashionframe/setups/${setup.id}`}>
        <li className="search-list-item">
          <div className="d-flex flex-wrap justify-content-between">
            <div className="flex-grow-1">
              <h3>{setup.name}</h3>
              <h4>Frame: {setup.frame}</h4>
              <span className="badge badge-primary">
                <i className="fa fa-star"></i>
                {setup.liked}
              </span>
              <h5>Author: {setup.username}</h5>
              <small>
                Created at: {setup.created_at.match(/\w+-\w+-\w+/)[0]}
              </small>
            </div>
            <div className="flex-shrink-1">
              <img
                src={setup.screenshot}
                alt="Thumbnail"
                className="search-thumbnail"
              />
            </div>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default SearchListItem;
