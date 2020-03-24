import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Api from './api'

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  
  state = {
    authorization_token: localStorage.getItem('authorization_token'),
  }
  
  updateToken() {
    this.setState({
      authorization_token: localStorage.getItem('authorization_token'),
    });
  }

  onLogoutClick() {
    Api.logoutAdmin().then((response) => {
      if (response.status === 204) { 
        localStorage.removeItem('authorization_token');
        this.setState({
          authorization_token: undefined,
        });
      };
    });
  }

  render() {
    const { authorization_token } = this.state;
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
          { /* wyswietlic modal zamiast linka */ }
          { authorization_token ? (
            <div className="logout-button" onClick={this.onLogoutClick}>
              Logout
            </div>
          ) : (
            <NavLink className="item login-button" to="/login">Login</NavLink>
          )
          }
        </div>
      </div>
    );
  }
}

export default Navbar;