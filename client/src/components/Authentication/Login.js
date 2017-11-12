import React, { Component } from 'react';
import axios from 'axios';

import Button from '../globals/Button/';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const {
      username,
      password,
    } = this.state;
    const { data } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/users/auth`, {
      username,
      password,
    });
    const { accessToken } = data;
    localStorage.setItem('token', accessToken);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLoginSubmit}>
          <input
            name='username'
            placeholder='username'
            onChange={this.handleChange}
          />
          <input
            name='password'
            placeholder='password'
            onChange={this.handleChange}
          />
          <Button
            text='Log In'
            onClick={this.loginClick}
          />
        </form>
      </div>
    );
  }
}

export default Login;
