import React, { Component } from "react";
import Router from "./components/routes/Router";
import Navbar from "./components/toolbar/Navbar";
import Footer from "./components/footer/Footer";
import { BrowserRouter } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "../src/index.css";

// console.log(process.env.REACT_APP_FIREBASE_API_KEY)

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Navbar />

          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
