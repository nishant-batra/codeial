import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import React from "react";
import { fetchPosts } from "../actions/posts";
import { PostList, Navbar } from "./";
import PropTypes from "prop-types";
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <PostList posts={posts} />
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
