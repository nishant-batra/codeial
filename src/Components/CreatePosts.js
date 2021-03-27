import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../actions/posts";

class CreatePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }
  handleChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };
  handleClick = () => {
    //dispatch action
    this.props.dispatch(createPost(this.state.content));
  };
  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <div>
          <button id="add-post-btn" onClick={this.handleClick}>
            Add Post
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CreatePosts);
