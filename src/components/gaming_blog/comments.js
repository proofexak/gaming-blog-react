import React from 'react';
import Comment from './comment';
import * as Api from '../shared/api';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    comments: [],
  }

  componentDidMount() {
    Api.makeGetRequest({
      url: `/api/comments?post_id=${this.props.postId}`,
    }).then((response) => {
      this.setState({
        comments: response.data,
      });
    })
  }

  pushComment(comment) {
    const { comments } = this.state;
    comments.push(comment);
    this.setState({
      comments,
    });
  }

  render() {
    const { comments } = this.state;
    
    return (
      <div className="comments">
        {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
      </div>
    );
  }
}

export default Comments;