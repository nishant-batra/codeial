import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../actions/Profile";
import { APIurls } from "../helpers/url";
import { getAuthTokenFromLocalStorage } from "../helpers/Utils";
import { addFriend } from "../actions/friends";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userID) {
      this.props.dispatch(fetchUserProfile(match.params.userID));
    }
  }
  checkIfUserIsAFriend = () => {
    const { match, friends } = this.props;
    console.log("Friends", friends);
    const userId = match.params.userID;
    // console.log("this is userid", userId);
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    //console.log("INDEX", index);
    if (index !== -1) return true;
    return false;
  };
  handleAddFriend = async () => {
    const userID = this.props.match.params.userID;
    const url = APIurls.addFriend(userID);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        error: null,
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };
  render() {
    const { user } = this.props.profile;
    const { success, error } = this.state;
    const isUserFriend = this.checkIfUserIsAFriend();

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
            {isUserFriend ? (
              <button
                className="button save-btn"
                onClick={this.handleAddFriend}
              >
                Add Friend
              </button>
            ) : (
              <button className="button save-btn">Remove Friend</button>
            )}
          </div>
          {success && (
            <div className="alert success-dailog">
              Friend Added Successfully
            </div>
          )}
          {error && <div className="alert error-dialog">{error}</div>}
        </div>
      );
  }
}
function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(User);
