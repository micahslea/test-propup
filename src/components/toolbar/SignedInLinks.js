import React, { Component } from "react";
import firebase from "../../auth";
import "react-bulma-components/dist/react-bulma-components.min.css";
import ProfileModal from "../pages/Modal";

class SignedInLinks extends Component {
  logout() {
    firebase.auth().signOut();
 
    localStorage.clear();
  }
  render() {
    return (
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a
              className="button is-light logged-in"
              href="/"
              onClick={this.logout}
            >
              Log out
            </a>

            <ProfileModal />
          </div>
        </div>
      </div>
    );
  }
}

export default SignedInLinks;
