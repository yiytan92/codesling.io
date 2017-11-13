import React, { Component } from 'react';
import axios from 'axios';

import Input from '../globals/forms/Input';
import Button from '../globals/Button/';

import './Auth.css';

class Signup extends Component {
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
      <div className="signup-form-container">
        <form 
          className="auth-form"
          onSubmit={this.handleSignupSubmit}
        >
          <h2>Sign Up</h2>
          <Input
            type='text'
            name='username'
            placeholder='username'
            onChange={this.handleChange}
          />
          <Input
            type='password'
            name='password'
            placeholder='password'
            onChange={this.handleChange}
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
