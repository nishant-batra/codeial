import userEvent from "@testing-library/user-event";
import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAuthState, editUser } from "../actions/auth";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      password: "",
      confirmPassword: "",
      editMode: false,
    };
  }
  handleInput = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };
  handleClick = () => {
    const { password, confirmPassword, name } = this.state;
    const { user } = this.props.auth;
    if (!name) {
      window.alert("Please Enter a valid name");
      return;
    }
    if (password !== confirmPassword) {
      window.alert("Passwords Dont match");
      return;
    }
    this.props.dispatch(editUser(name, password, confirmPassword, user._id));
  };
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  render() {
    const { user, error } = this.props.auth;
    const { editMode } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        {error && <div className="alert error-dailog">{error}</div>}
        {error === false && (
          <div className="alert success-dailog">
            Successfully Updated Profile!
          </div>
        )}
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleInput("name", e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>
        {editMode && (
          <div className="field">
            <div className="field-label">New Password</div>
            <input
              type="password"
              onChange={(e) => this.handleInput("password", e.target.value)}
              value={this.state.password}
            />
          </div>
        )}
        {editMode && (
          <div className="field">
            <div className="field-label">Confirm Password</div>
            <input
              type="password"
              onChange={(e) =>
                this.handleInput("confirmPassword", e.target.value)
              }
              value={this.state.confirmPassword}
            />
          </div>
        )}
        <div className="btn-grp">
          {editMode ? (
            <button className="button save-btn" onClick={this.handleClick}>
              Save
            </button>
          ) : (
            <button
              className="button edit-btn"
              onClick={(e) => this.handleInput("editMode", true)}
            >
              Edit Profile
            </button>
          )}
          {editMode && (
            <div
              className="go-back"
              onClick={(e) => this.handleInput("editMode", false)}
            >
              Go Back
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    auth,
  };
}
export default connect(mapStateToProps)(Settings);
