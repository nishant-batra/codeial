import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { getAuthTokenFromLocalStorage } from "../helpers/Utils";
import React from "react";
import { fetchPosts } from "../actions/posts";
import { Navbar, Home, Page404, Login, Signup, Settings, User } from "./";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import auth from "../Reducers/auth";

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        //props are the ones that react router dom sends like history,location,etc.
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = getAuthTokenFromLocalStorage();
    let user;
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.log(error);
      return;
    }
    console.log("user", user);
    this.props.dispatch(
      authenticateUser({
        email: user.email,
        name: user.name,
        _id: user._id,
      })
    );
  }

  render() {
    console.log("props", this.props);
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => {
                return <Home {...props} posts={posts}></Home>;
              }}
            ></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={Signup}></Route>
            <PrivateRoute
              path="/user/:userID"
              component={User}
              isLoggedIn={this.props.auth.isLoggedin}
            />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedIn={this.props.auth.isLoggedin}
            />
            <Route path="" component={Page404}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}
App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
