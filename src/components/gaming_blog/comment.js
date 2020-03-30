import React from 'react';

class Comment extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment">
        <div className="comment-nickname">
          {comment.nickname}
        </div>
        <div className="comment-content">
          {comment.content}
        </div>
      </div>
    )
  }
}

export default Comment;