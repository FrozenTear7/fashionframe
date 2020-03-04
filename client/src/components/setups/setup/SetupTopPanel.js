import React from "react";
import { Link } from "react-router-dom";

const SetupTopPanel = props => {
  const { setup, isAuthorized, userId, setupId, likeSetup } = props;

  return (
    <div className="d-flex flex-wrap">
      <div>
        <h2 style={{ wordBreak: "break-word" }}>{setup.name}</h2>
        <h3>
          Frame: <b> {setup.frame}</b>
        </h3>
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
        <br />
        <h5>
          Author: <b>{setup.username}</b>
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
        <br />
        <br />
        <h5 style={{ wordBreak: "break-word" }}>
          Description:<small> {setup.description}</small>
        </h5>
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
