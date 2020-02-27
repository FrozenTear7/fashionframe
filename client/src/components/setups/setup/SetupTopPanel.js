import React, { Component } from "react";
import { Link } from "react-router-dom";

class SetupTopPanel extends Component {
  render() {
    const { setup, isAuthorized, userId, setupId } = this.props;

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
              Check user's profile
            </Link>
            <br />
            <small>
              Created at: {setup.created_at.match(/\w+-\w+-\w+/)[0]}
            </small>
            <br />
            {isAuthorized && (
              <button
                className={`btn btn-${
                  setup.likedbyyou ? "primary" : "secondary"
                }`}
                onClick={() => this.likeSetup()}
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
            <img
              src={setup.screenshot}
              alt="Thumbnail"
              className="setup-image"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SetupTopPanel;
