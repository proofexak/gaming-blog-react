import React from 'react';
import Posts from './posts'
import * as Api from '../shared/api';

class Index extends React.Component {
  state = {
    posts: undefined,
  }

  componentDidMount() {
    Api.makeGetRequest({
      url: '/api/posts',
    }).then((response) => {
      this.setState({
        posts: response.data,
      });
    });
  }

  render() {
    const { posts } = this.state;
    if (posts !== undefined) {
      return (
        <div>
          <Posts posts={posts} />
        </div>
      )
    } else {
      return (
        <div>
          Loading
        </div>
      );
    }
  }
}

export default Index;