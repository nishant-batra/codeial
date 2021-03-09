import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions/auth";
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
    //  console.log(this.state);
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
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
    //  console.log("proprs", this.props);
    const { error, inProgress } = this.props.auth;
    return (
      <form className="login-form">
        <div className="login-signup-header"> Log In</div>
        {error && <div className="alert error-dailog">{error}</div>}
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
          {inProgress ? (
            <button
              type="button"
              onClick={this.handleFormSubmit}
              disabled={inProgress}
            >
              Logging In
            </button>
          ) : (
            <button
              type="button"
              onClick={this.handleFormSubmit}
              disabled={inProgress}
            >
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
