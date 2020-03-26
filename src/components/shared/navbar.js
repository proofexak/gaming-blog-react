import React from 'react';
import Login from '../gaming_blog/login';
import * as Api from './api'
import reduxConnect from './reduxConnect'

import { NavLink } from 'react-router-dom';


class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  state = {
    loginModal: false,
  }

  onLogoutClick() {
    Api.logoutAdmin().then((response) => {
      if (response.status === 204) { 
        localStorage.removeItem('authorization_token');
        this.props.clearToken()
      };
    });
  }

  render() {
    const authorization_token = this.props.token;
    const { loginModal } = this.state;
    return (
      <div className="navbar">
        <div className="left-menu">
          <NavLink className="item" to="/">BLOG</NavLink>
        { authorization_token ? (
            <NavLink className="item add-post" to="/post">Add post</NavLink>
          ) : undefined
          }
        </div>
        <div className="right-menu">
          { authorization_token ? (
            <div className="logout-button" onClick={this.onLogoutClick}>
              Logout
            </div>
          ) : (
            <div className="login-panel">
              <div className="login-button" onClick={() => this.setState({ loginModal: !loginModal })}>
                Login
              </div>
              { loginModal ? (
                <Login closeLoginPanel={() => this.setState({ loginModal: false })} />
              ) : undefined
              }
            </div>
          )
          }
        </div>
      </div>
    );
  }
}

export default reduxConnect(Navbar);
