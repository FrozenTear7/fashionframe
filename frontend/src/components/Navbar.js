/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
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
          <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul class="navbar-nav mr-auto">
              <Link className="nav-item nav-link" to={"/search"}>
                Search
              </Link>
              <Link className="nav-item nav-link" to={"/create"}>
                New setup
              </Link>
              {this.props.isAuthorized && (
                <Link className="nav-item nav-link" to={"/settings"}>
                  Settings
                </Link>
              )}
            </ul>
          </div>
          <div class="mx-auto order-0">
            <Link className="navbar-brand mx-auto" to={"/"}>
              Fashionframe
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".dual-collapse2"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ml-auto">
              {!this.props.isAuthorized && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropleft"
                    href=""
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sign in
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a
                      className="dropdown-item"
                      href="http://localhost:3001/auth/google"
                    >
                      Google+
                    </a>
                  </div>
                </li>
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
