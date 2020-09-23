import React, { Component } from "react";
import "./Navbar.css";
import logo from "../toolbar/favicon.png";
import "react-bulma-components/dist/react-bulma-components.min.css";
import firebase from "../../auth/";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import LoginString from "../pages/Login/LoginStrings";

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loggedOut: false,
    };
    this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL);
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          console.log("user signed in");
          this.setState({
            loggedIn: true,
          });
        } else {
          console.log("user signed out");
          this.setState({
            loggedOut: true,
          });
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={logo} width="35" height="28" alt="" />
          </a>
            <label
                  role="button"
                  className="navbar-burger burger1"
                  aria-label="menu"
                  aria-expanded="false"
                  htmlFor="nav-toggle-state"
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
            </label>
        </div>
          <input type="checkbox" id="nav-toggle-state" />

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/Results">
              Start Your Vacation&nbsp;&nbsp;
              <i className="fas fa-map-marked-alt"></i>
            </a>
            <a className="navbar-item" href="/NewProp">
              List a Property&nbsp;&nbsp;<i className="fas fa-home"></i>
            </a>
            <a className="navbar-item" href="/Welcome">
              How it Works&nbsp;&nbsp;<i className="fas fa-question-circle"></i>
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="/">
                More
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="/Dashboard">
                  Your Dashboard
                </a>
                <a
                  className="navbar-item"
                  aria-label="Eventful"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open(
                      "https://jaswhitehead.github.io/PropUpEvents/",
                      "Popup",
                      "width=530, height=850, top=100"
                    );
                  }}
                >
                  Find Events
                </a>
                <a className="navbar-item" href="/Chat">
                  Chat
                </a>                
                <a className="navbar-item" href="/Who">
                  About Us
                </a>
                <a className="navbar-item" href="/Weather">
                  Local Weather
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" href="/Feedback">
                  Send Feedback
                </a>
              </div>
            </div>
          </div>
          {this.state.loggedIn ? <SignedInLinks /> : <SignedOutLinks />}
        </div>
      </nav>
    );
  }
}

export default navbar;
