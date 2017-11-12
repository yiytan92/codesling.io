import React, { Component } from 'react';
import axios from 'axios';

import Button from '../globals/Button/';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { 
      username,
      password,
    } = this.state;
    await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/users/false`, {
      username,
      password,
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignupSubmit}>
          <input
            name='username'
            placeholder='username'
            onChange={this.handleInputChange}
          />
          <input
            name='password'
            placeholder='password'
            onChange={this.handleInputChange}
          />
          <Button
            text='Sign Up'
          />
        </form>
      </div>
    );
  }
}

export default Signup;
