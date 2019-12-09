import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Index from './gaming_blog/Index';
import Login from './gaming_blog/Login';
import Navbar from './shared/Navbar';
import './../stylesheets/gaming_blog.css';

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
            <Route path="/login" render={props => <Login updateNavbarToken={this.updateNavbarToken} />} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default GamingBlog;
