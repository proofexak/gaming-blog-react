import React from 'react';
import * as Api from '../shared/api';
import reduxConnect from '../shared/reduxConnect';
import { Redirect } from 'react-router-dom';

class ShowPost extends React.Component {
  constructor(props) {
    super(props);

    this.getPost = this.getPost.bind(this);
  }

  state = {
    post: undefined,
    edit: false,
  }

  componentDidMount() {
    const postId = parseInt(this.props.match.params.id, 10);
    this.getPost(postId);
  }

  getPost(postId) {
    Api.makeGetRequest({
      url: `/api/posts/${postId}`,
    }).then((response) => {
      this.setState({
        post: response.data,
      });
    })
  }

  render() {
    const { post, edit } = this.state;
    if (edit && post) { return (<Redirect to={`/post/${post.id}/edit`} />) }

    if (post) {
      return (
        <div className="post-container">
          { this.props.token ? (
            <div className="edit-button" onClick={() => this.setState({ edit: true })}>
              Edit
            </div>
          ) : undefined
          }
          <div className="post-image">
            <img src={post.title_image.url} alt="" />
          </div>
          <div className="post-title">
            {post.title}
          </div>
          <div className="post-description">
            {post.description}
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} />
        </div>
      )
    } else {
      return (
        <div>
          Loading
        </div>
      )
    }
  }
}

export default reduxConnect(ShowPost);
