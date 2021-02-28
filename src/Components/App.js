import { connect } from "react-redux";

import React from "react";
import { fetchPosts } from "../actions/posts";
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log("PORPS", this.props);
    return <div></div>;
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}
export default connect(mapStateToProps)(App);
