import { Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";

class SideBar extends Component {
  render() {
    return (
      <>
        <div className="col-2">
          <Nav
            className="navbar navbar-expand-md navbar-white bg-navbar fixed-left justify-content-between"
            id="sidebar"
          >
            <div className="nav-container">
              <a className="navbar-brand" href="/">
                <img
                  src="/logo/Spotify_Logo.png"
                  alt="Spotify_Logo"
                  width="140"
                  height="45"
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <ul>
                    <li>
                      <a className="nav-item nav-link" href="/">
                        <i className="fas fa-home fa-lg"></i>&nbsp; Home
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="nav-btn">
              <button className="btn signup-btn" type="button">
                Sign Up
              </button>
              <button className="btn login-btn" type="button">
                Login
              </button>
            </div>
          </Nav>
        </div>
      </>
    );
  }
}
export default withRouter(SideBar);
