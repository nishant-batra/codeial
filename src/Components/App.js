import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import React from "react";
import { fetchPosts } from "../actions/posts";
import { Navbar, Home, Page404, Login, Signup } from "./";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem("token");
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
  };
}
App.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);
