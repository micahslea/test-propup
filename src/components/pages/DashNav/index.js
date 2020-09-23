import React, { Component } from "react";
import OwnerDash from "../OwnerDash";
import RenterDash from "../RenterId";

class DashNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "is-active",
      bid: "",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.state.owner === ""
      ? this.setState({ owner: "is-active", bid: "" })
      : this.setState({ bid: "is-active", owner: "" });
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid" style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="tabs is-centered is-boxed is-medium">
            <ul>
              <li className={this.state.owner}>
                <a onClick={this.toggle}>
                  <span>Owned Props</span>
                </a>
              </li>
              <li className={this.state.bid}>
                <a onClick={this.toggle}>
                  <span>Bid Props</span>
                </a>
              </li>
            </ul>
          </div>
          {this.state.bid === "is-active" ? <RenterDash /> : <OwnerDash />}
        </div>
      </div>
    );
  }
}

export default DashNav;
