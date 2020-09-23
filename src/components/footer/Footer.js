import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "./Footer.css";
import Logo from "../../Logo.png";

const footer = () => {
  return (
    <footer className="footer">
      <div className="upper-footer">
        <div className="column1">
          <a href="/">
            <img src={Logo} alt="PropUp" />
          </a>
        </div>
        <hr></hr>
        <div className="columns is-deaktop">
          <div className="column">
            <h5 className="white-text">
              <u>
                <strong>Team Bio</strong>
              </u>
            </h5>
            <p className="grey-text text-lighten-4">
              We are a team of students from Vanderbilt Bootcamp working on this
              project like it's our full time job. We love to code and are
              always looking for better and more innovatie ways to improve our
              applications.
            </p>
          </div>
          <div className="column">
            {" "}
            <h5 className="white-text">
              <u>
                <strong>Quick Links</strong>
              </u>
            </h5>
            <ul>
              <li>
                <a className="white-text" href="/Signup">
                  <i className="fas fa-user-plus"></i>&nbsp;Login / Sign Up
                </a>
              </li>
              <li>
                <a className="white-text" href="/OwnerDash">
                  <i className="fas fa-home"></i>&nbsp;Property Owner
                </a>
              </li>
              <li>
                <a className="white-text" href="/Renter">
                  <i className="fas fa-door-open"></i>&nbsp;Renter
                </a>
              </li>
              <li>
                <a className="white-text" href="/Who">
                  <i className="fas fa-users"></i>&nbsp;Who we are
                </a>
              </li>
            </ul>
          </div>
          <div className="column">
            <h5 className="white-text">
              <u>
                <strong>Connect</strong>
              </u>
            </h5>
            <ul>
              <li>
                <a
                  className="white-text"
                  target="blank"
                  href="mailto:jaswhitehead@gmail.com"
                >
                  <i className="fa fa-envelope"></i>&nbsp;Email Us
                </a>
              </li>
              <li>
                <a
                  className="white-text"
                  target="blank"
                  href="https://github.com/jaswhitehead/propUp"
                >
                  <i className="fab fa-github"></i>&nbsp;GitHub Repo
                </a>
              </li>
              <li>
                <a
                  className="white-text"
                  target="blank"
                  href="https://www.facebook.com/jaswhitehead"
                >
                  <i className="fab fa-facebook"></i>&nbsp;Facebook
                </a>
              </li>
              <li>
                <a
                  className="white-text"
                  target="blank"
                  href="https://www.linkedin.com/in/jasonwhitehead1/"
                >
                  <i className="fab fa-linkedin"></i>&nbsp;LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content has-text-centered level-item">
        <p>
          <strong>PropUp</strong> by{" "}
          <a href="https://github.com/jaswhitehead" target="blank">
            JSON Whitehead,{" "}
          </a>
          <a href="https://github.com/micahslea" target="blank">
            Micah Lea,{" "}
          </a>
          <a href="https://github.com/Mason-Shadrick" target="blank">
            Mason Shadrick &amp;{" "}
          </a>
          <a href="https://github.com/cjohnson1580" target="blank">
            Chip Johnson
          </a>
          . The PropUp website content is &#169; 2020
        </p>
      </div>
    </footer>
  );
};
export default footer;
