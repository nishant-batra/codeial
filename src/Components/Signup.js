import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signup extends Component {
  render() {
    return (
      <form className="login-form">
        <div className="login-signup-header"> Sign Up</div>
        <div className="field">
          <input required placeholder="Your Name" type="text"></input>
        </div>
        <div className="field">
          <input required type="email" placeholder="Your Email" />
        </div>
        <div className="field">
          <input required type="password" placeholder="Password" />
        </div>
        <div className="field">
          <input required type="password" placeholder="Confirm Password" />
        </div>
        <br />
        <div className="field">
          Alread have an account &nbsp;
          <Link to="/login">
            <u>Log In</u>
          </Link>
        </div>

        <div className="field">
          <button>Sign Up</button>
        </div>
      </form>
    );
  }
}

export default Signup;
