import React from 'react'
import { Redirect } from 'react-router-dom';

class Post extends React.Component {
  state = {
    show: false,
  }

  render() {
    const { post } = this.props;
    const { show } = this.state;
    if (show) { return (<Redirect to={`/post/${post.id}`} />) }

    return (
      <div className="post">
        <div className="title-image">
          <img src={post.title_image.thumbnail.url} alt="" />
        </div>
        <div className="title" onClick={() => this.setState({ show: true })}>
          { post.title }
        </div>
        <div className="description">
          { post.description }
        </div>
      </div>
    );
  }
}

export default Post;
