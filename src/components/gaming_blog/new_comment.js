import React from 'react';
import Comment from './comment';
import * as Api from '../shared/api';

class NewComment extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    comment: {
      nickname: '',
      content: '',
    },
  }

  onChange(e) {
    this.setState({
      comment: {
        ...this.state.comment,
        [e.target.name]: e.target.value,
      }
    });
  }
  
  onSubmit() {
    const { comment } = this.state;
    const body = {
      comment: {
        ...comment,
        post_id: this.props.postId,
      }
    };
    Api.makePostRequest({
      url: '/api/comments',
      body: body,
    }).then((response) => {
      this.props.pushComment(response.data);
      this.setState({
        comment: {
          nickname: '',
          content: '',
        },
      });
    });
  }

  render() {
    const { comment } = this.state;

    return (
      <div className="new-comment-container">
        <form>
          <div className="form-group">
            <input type="text" placeholder="Nickname" name="nickname" value={comment.nickname} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <textarea placeholder="Content" name="content" value={comment.content} onChange={this.onChange} />
          </div>
        </form>
        <button className="btn btn-primary" onClick={this.onSubmit}>
          Submit
        </button>

      </div>
    )
  }
}

export default NewComment;