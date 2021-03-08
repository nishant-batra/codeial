import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passRef = React.createRef();
  }
  handleFormSubmit = () => {
    console.log(this.emailRef.current.value, this.passRef.value);
  };
  render() {
    return (
      <form className="login-form">
        <div className="login-signup-header"> Log In</div>
        <div className="field">
          <input
            type="email"
            required
            placeholder="Email"
            ref={this.emailRef}
          />
        </div>
        <div className="field">
          <input
            type="password"
            required
            placeholder="Password"
            ref={this.passRef}
          />
        </div>
        <div className="field">
          <button type="button" onClick={this.handleFormSubmit}>
            Log In
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
