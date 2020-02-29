import React from "react";
import { Link } from "react-router-dom";

const SetupTopPanel = props => {
  const { setup, isAuthorized, userId, setupId, likeSetup } = props;

  return (
    <div>
      <h1 className="center">{setup.name}</h1>
      <br />
      <div className="row">
        <div className="col-4">
          <h3>Frame: {setup.frame}</h3>
          <br />
          <h5>Description: {setup.description}</h5>
          <br />
          <h5>Author: {setup.username}</h5>
          <Link
            to={`/fashionframe/profile/${setup.user_id}`}
            className="btn btn-primary"
          >
            Check user's other setups
          </Link>
          <br />
          <small>Created at: {setup.created_at.match(/\w+-\w+-\w+/)[0]}</small>
          <br />
          {isAuthorized && (
            <button
              className={`btn btn-${
                setup.likedbyyou ? "primary" : "secondary"
              }`}
              onClick={likeSetup}
            >
              {setup.likedbyyou ? "Unlike" : "Like"}:{" "}
              <i className="fa fa-star"></i>{" "}
              <span className="badge badge-light">{setup.liked}</span>
            </button>
          )}
          {isAuthorized && userId === setup.user_id && (
            <div>
              <br />
              <Link
                className={`btn btn-primary`}
                to={`/setups/${setupId}/edit`}
              >
                Edit
              </Link>
            </div>
          )}
        </div>
        <div className="col-8">
          <img src={setup.screenshot} alt="Thumbnail" className="setup-image" />
        </div>
      </div>
    </div>
  );
};

export default SetupTopPanel;