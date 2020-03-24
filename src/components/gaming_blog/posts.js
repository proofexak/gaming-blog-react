import React from 'react';
import Post from './post';

class Posts extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <div>
        Posts
        { posts.map(post => <Post key={post.id} post={post} />) }
      </div>
    );
  }
}

export default Posts;