/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-bg-dark">
          <a className="navbar-brand" href={"/"}>
            Navbar
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href={"/search"}>
                  Search
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/create"}>
                  New setup
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={"/profile"}>
                  Profile
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sign in
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a
                    className="dropdown-item"
                    href="http://localhost:3001/auth/google"
                  >
                    Google+
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href={"http://localhost:3001/auth/logout"}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
