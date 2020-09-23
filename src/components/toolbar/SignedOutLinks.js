import React from "react";

const SignedOutLinks = () => {
  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button logged-out" href="/Signup">
            <strong>Sign up</strong>
          </a>
          <a className="button is-light logged-out" href="/Login">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignedOutLinks;
