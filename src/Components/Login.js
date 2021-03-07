import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <form className="login-form">
        <div className="login-signup-header"> Log In</div>
        <div className="field">
          <input type="email" required placeholder="Email" />
        </div>
        <div className="field">
          <input type="password" required placeholder="Password" />
        </div>
        <div className="field">
          <button>Log In</button>
        </div>
      </form>
    );
  }
}

export default Login;
