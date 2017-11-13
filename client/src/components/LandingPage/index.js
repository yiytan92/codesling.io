import React, { Component } from 'react';
import axios from 'axios';

import debug from '../../lib/debug';
import Button from '../globals/Button';
import Logo from '../globals/Logo';

import './LandingPage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      valid: true,
      loading: false,
      slingId: ''
    }
  }

  componentDidMount() {
    if (this.props.history.location.state) {
      const { valid } = this.props.history.location.state;
      this.setState({ valid });
    }
  }

  fetchSlingId = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/new-sling`,{
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        }
      });
      const { slingId } = data;
      this.props.history.push({
        pathname: `/${slingId}`,
      });
    } catch (e) {
      debug('error retrieving slingId. e = ', e);
    }
  }

  handleStartProgrammingClick = () => {
    this.setState({
      loading: true,
    }, this.fetchSlingId);
  }

  render() {
    const { valid } = this.state;
    if (valid) {
      return (
        <div className="landing-page-container">
          <Logo
            className="landing-page-logo"
          />
          <Button
            className="auth-btn-container"
            backgroundColor="red"
            color="white"
            loading={this.state.loading}
            text='Start Pair Programming!'
            onClick={this.handleStartProgrammingClick}
          />
        </div>
      )
    } else {
      return (
        <div className="landing-page-container">
          <Logo
            className="landing-page-logo"
          />
          <br />
          Invalid Sling! Create One Here
          <br />
          <br />
          <br />
          <Button
            className="auth-btn-container"
            backgroundColor="red"
            color="white"
            loading={this.state.loading}
<<<<<<< HEAD
            text='Log In'
            onClick={this.handleLoginClick}
          />
          <Button
            className="auth-btn-container"
            backgroundColor="red"
            color="white"
            loading={this.state.loading}
            text='Sign Up'
            onClick={this.handleSetupClick}
=======
            text='Start Pair Programming!'
            onClick={this.handleStartProgrammingClick}
>>>>>>> [ops] - signup sets token into localstorage, login landingpage styling, global protected component
          />
        </div>
      )
    }
  }
}

export default LandingPage;
