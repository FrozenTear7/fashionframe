import React from "react";
import { Link } from "react-router-dom";

const SetupTopPanel = props => {
  const { setup, isAuthorized, userId, setupId, likeSetup } = props;

  return (
    <div className="d-flex flex-wrap">
      <div>
        <h1>{setup.name}</h1>
        <h3>Frame: {setup.frame}</h3>
        <br />
        {isAuthorized && userId === setup.user_id && (
          <div>
            <Link
              className={`btn btn-primary`}
              to={`/fashionframe/setups/${setupId}/edit`}
            >
              Edit
            </Link>
          </div>
        )}
        <h5>
          Author: {setup.username}
          {"  "}
          {isAuthorized && (
            <button
              className={`btn-sm btn-${
                setup.likedbyyou ? "primary" : "secondary"
              }`}
              onClick={likeSetup}
            >
              {setup.likedbyyou ? "Unlike" : "Like"}:{" "}
              <i className="fa fa-star"></i>{" "}
              <span className="badge badge-light">{setup.liked}</span>
            </button>
          )}
          <br />
          <Link
            to={`/fashionframe/profile/${setup.user_id}`}
            className="btn-sm btn-primary"
          >
            Go to profile
          </Link>
        </h5>
        <small>Created at: {setup.created_at.match(/\w+-\w+-\w+/)[0]}</small>
        <h5>Description: {setup.description}</h5>
      </div>
      <img
        src={setup.screenshot}
        alt="Thumbnail"
        className="search-thumbnail"
      />
    </div>
  );
};

export default SetupTopPanel;
