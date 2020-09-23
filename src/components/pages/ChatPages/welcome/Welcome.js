import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Welcome.css";

class WelcomeCard extends Component {
  render() {
    return (
      <div className="viewWelcomeBoard">
        <img
          className="avatarWelcome"
          src={this.props.currentUserPhoto}
          alt=""
        />
        <span className="textTileWelcome">{`Welcome, ${this.props.currentUserName}`}</span>
        <span className="textDescriptionWelcome">Let's connect the world</span>
      </div>
    );
  }
}

export default WelcomeCard;
