import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    // this.emailRef = React.createRef();
    // this.passRef = React.createRef();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleFormSubmit = () => {
    //console.log(this.emailRef.current.value, this.passRef.value);
    console.log(this.state);
  };
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePassChange = (e) => {
    this.setState({
      password: e.target.value,
    });
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
            //  ref={this.emailRef}
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            required
            placeholder="Password"
            //ref={this.passRef}
            onChange={this.handlePassChange}
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
