import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Index from './gaming_blog/index';
import Navbar from './shared/navbar';
import NewPost from './gaming_blog/new_post';
import ShowPost from './gaming_blog/show_post';
import './../stylesheets/gaming_blog.scss';
import './../stylesheets/navbar.scss';
import './../stylesheets/posts.scss';
import './../stylesheets/login.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class GamingBlog extends React.Component {
  constructor(props) {
    super(props);

    this.updateNavbarToken = this.updateNavbarToken.bind(this);
  }

  updateNavbarToken() {
    this.navbar.updateToken();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app container">
          <Navbar ref={(navbar) => { this.navbar = navbar; }}/>
          <div className="content">
            <Route path="/" exact component={Index} />
            <Route path="/post" exact component={NewPost} />
            <Route path="/post/:id" exact component={ShowPost} />
            <Route path="/post/:id/edit" exact component={NewPost} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default GamingBlog;
