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
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  loginClick = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/users/auth`, {
      username: this.state.username,
      password: this.state.password,
    });
    const { accessToken } = data;
    localStorage.setItem('token', accessToken);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <input name='username' placeholder='username' onChange={this.handleChange} />
        <br />
        <input name='password' placeholder='password' onChange={this.handleChange} />
        <Button
          text='Log In'
          onClick={this.loginClick}
        />
      </div>
    );
  }
}

export default Login;