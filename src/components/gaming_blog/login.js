import React from 'react';
import { Redirect } from 'react-router-dom';
import * as Api from '../shared/api';

import reduxConnect from '../shared/reduxConnect';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  state = {
    login: undefined,
    password: undefined,
    redirect: false,
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmitClick() {
    const { login, password } = this.state;
    Api.loginAdmin({
      body: { admin: {email: login, password: password } }
    }).then((response) => {
      if (response.data.id) { 
        localStorage.setItem('authorization_token', response.data.token);
        this.props.setToken(response.data.token)
        this.props.closeLoginPanel();
      }
    });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmitClick();
    }
  }

  render() {
    if (this.state.redirect) { return (<Redirect to='/' />); }
    return (
      <div className="login-panel-content">
        <div className="login-card">
          <div className="title">
            Logowanie
          </div>
          <div className="login-form">
            <div className="login-field">
              <label>Login</label>
              <input name="login" type="text" placeholder="Login" onChange={this.onInputChange} onKeyPress={this.onKeyPress} />
            </div>
            <div className="password-field">
              <label>Password</label>
              <input name="password" type="password" placeholder="Password" onChange={this.onInputChange} onKeyPress={this.onKeyPress} />
            </div>
            <div className="actions">
              <button className="login-button" onClick={this.onSubmitClick}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxConnect(Login);
