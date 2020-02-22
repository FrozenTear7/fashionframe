/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();
    this.state = { logoutRedirect: false };
  }

  render() {
    if (this.state.logoutRedirect) {
      this.setState({ logoutRedirect: false });
      return <Redirect push to="/" />;
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-bg-dark">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
              <Link className="nav-item nav-link" to={"/"}>
                Home
              </Link>
              <Link className="nav-item nav-link" to={"/search"}>
                Search
              </Link>
              {this.props.isAuthorized && (
                <Link className="nav-item nav-link" to={"/builds/new"}>
                  New setup
                </Link>
              )}
            </ul>
          </div>
          <div className="mx-auto order-0">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".dual-collapse2"
              style={{ position: "absolute", left: 0, marginLeft: "5%" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand mx-auto" to={"/"}>
              Fashionframe
            </Link>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              {this.props.isAuthorized && (
                <Link className="nav-item nav-link" to={"/settings"}>
                  Settings
                </Link>
              )}
              {!this.props.isAuthorized && (
                <Link className="nav-item nav-link" to={"/signin"}>
                  Sign in
                </Link>
              )}
              {this.props.isAuthorized && (
                <li className="nav-item nav-link disabled">
                  User: {this.props.userData.username}
                </li>
              )}
              {this.props.isAuthorized && (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href={"http://localhost:3001/auth/logout"}
                  >
                    Sign out
                  </a>
                  {/* {this.state.isAuthorized && (
                  <a
                    className="nav-link"
                    href=""
                    // href={"http://localhost:3001/auth/logout"}
                    onClick={() => {
                      this.setState({
                        isAuthorized: false,
                        logoutRedirect: true
                      });
                    }}
                  >
                    Sign out
                  </a>
                )} */}
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
