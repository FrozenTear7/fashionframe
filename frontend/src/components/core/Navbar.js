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
              {this.props.isAuthorized && (
                <Link className="nav-item nav-link" to={"/setups/new"}>
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
              <a
                type="button"
                class="nav-item nav-link"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                About
              </a>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        About the app
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      Hi!
                      <br />I decided to make an app for sharing fashion with
                      other Warframe players. <br />I am still an amateur
                      programmer, so the app will have some bugs and it might
                      not have the best looking interface. <br />
                      If you have any issues regarding existing problems or want
                      to share your feedback visit the app repository on Github
                      and create an Issue.
                      <a
                        className="nav-item nav-link"
                        href={
                          "https://github.com/FrozenTear7/fashionframe/issues"
                        }
                      >
                        Visit repository <i className="fa fa-github"></i>
                      </a>
                      Or{" "}
                      <a href="mailto:pawelmendroch7@gmail.com">
                        write to me personally
                      </a>
                      Or whisper in-game at FrozenTear7
                      <br />
                      If you like the app and have a Github account it would be
                      awesome if you gave the project a Star
                      <i className="fa fa-star"></i>.
                      <br />
                      <br />
                      The app is deployed to Heroku running on a free plan
                      server, so there might be some maintenance time every
                      month if there is too much traffic. <br />I will act
                      accordingly depending on the popularity of this project.
                      It's an open source project and I don't plan putting ads
                      here, but it's also the reason I don't have a custom
                      domain for the app and a better server.
                      <br />
                      <br />
                      <br />
                      <small>
                        Fashionframe isn’t endorsed by Digital Extremes and
                        doesn’t reflect the views or opinions of Digital
                        Extremes or anyone officially involved in producing or
                        managing Warframe. Warframe and Digital Extremes are
                        trademarks or registered trademarks of Digital Extremes
                        ©.
                      </small>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
