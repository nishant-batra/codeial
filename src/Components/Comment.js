import React from "react";

function Comment({ comment }) {
  // console.log("comment", comment);
  let date = comment.createdAt.substr(0, 10);
  let time = comment.createdAt.substr(11, 8);
  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">{date + " " + time}</span>
        <span className="post-comment-likes">{comment.likes.length} likes</span>
      </div>

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

export default Comment;
