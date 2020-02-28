import React from "react";
import { Link } from "react-router-dom";

const SearchListItem = props => {
  const { setup } = props;

  return (
    <div>
      <Link to={`/fashionframe/setups/${setup.id}`}>
        <li className="list-group-item" style={{ marginBottom: "10px" }}>
          <div className="row">
            <div className="col-6">
              <h3>{setup.name}</h3>
              <h4>Frame: {setup.frame}</h4>
              <hr className="divider" />
              <span className="badge badge-primary">
                <i className="fa fa-star"></i>
                {setup.liked}
              </span>
              <h5>Author: {setup.username}</h5>
              <small>
                Created at: {setup.created_at.match(/\w+-\w+-\w+/)[0]}
              </small>
            </div>
            <div className="col-6">
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
