import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../actions/Profile";

class User extends Component {
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userID) {
      this.props.dispatch(fetchUserProfile(match.params.userID));
    }
  }

  render() {
    const { user } = this.props.profile;
    if (this.props.profile.inProgress) {
      return <h1>Fetching Data...</h1>;
    } else
      return (
        <div className="settings">
          {this.props.profile.error && (
            <div className="error-dailog alert">{this.props.profile.error}</div>
          )}
          <div className="img-container">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-dp"
            />
          </div>

          <div className="field">
            <div className="field-label">Email</div>
            <div className="field-value">{user.email}</div>
          </div>
          <div className="field">
            <div className="field-label">Name</div>

            <div className="field-value">{user.name}</div>
          </div>

          <div className="btn-grp">
            <button className="button save-btn">Add Friend</button>
          </div>
        </div>
      );
  }
}
function mapStateToProps({ profile }) {
  return {
    profile,
  };
}
export default connect(mapStateToProps)(User);
