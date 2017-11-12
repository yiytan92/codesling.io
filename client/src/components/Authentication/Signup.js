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

  signupClick = async () => {
    await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/users/false`, {
      username: this.state.username,
      password: this.state.password
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <input name='username' placeholder='username' onChange={this.handleInputChange} />
        <br />
        <input name='password' placeholder='password' onChange={this.handleInputChange} />
        <Button
          text='Sign Up'
          onClick={this.signupClick}
        />
      </div>
    );
  }
}

export default Signup;