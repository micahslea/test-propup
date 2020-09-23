import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import UploadProp from "../pages/UploadProp";
import Renter from "../pages/Renter";
import Events from "../pages/Events/Events";
import Who from "../pages/Who";
import Weather from "../pages/Weather";
import Chat from "../pages/ChatPages/chat/Chat";
import Feedback from "../pages/Feedback";
import Results from "../pages/Results";
import Welcome from "../pages/Welcome";
import Property from "../pages/Property";
// import OwnerDash from "../pages/OwnerDash";
import Edit from "../pages/Edit";
// import RenterId from "../pages/RenterId";
import DashNav from "../pages/DashNav";

import Terms from "../pages/Terms";

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Signup} exact path="/Signup" />
        <Route component={Login} exact path="/Login" />
        <Route component={UploadProp} exact path="/NewProp" />
        <Route component={Renter} path="/Renter/:location/:province" />
        {/* <Route component={RenterId} exact path="/Renter" /> */}
        <Route component={DashNav} exact path="/Dashboard" />
        <Route component={Events} exact path="/Events" />
        <Route component={Who} exact path="/Who" />
        <Route component={Weather} exact path="/Weather" />
        <Route component={Chat} exact path="/Chat" />
        <Route component={Feedback} exact path="/Feedback" />
        <Route component={Results} exact path="/Results" />
        <Route component={Welcome} exact path="/Welcome" />
        <Route component={Property} path="/property/:id" />
        <Route component={Edit} path="/edit/:id" />
        {/* <Route component={OwnerDash} path="/OwnerDash" /> */}
        <Route component={Terms} path="/Terms" />
      </Switch>
    );
  }
}
export default Router;
