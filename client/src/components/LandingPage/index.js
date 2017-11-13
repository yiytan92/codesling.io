import React, { Component } from 'react';
import axios from 'axios';

import debug from '../../lib/debug';
import Button from '../globals/Button';
import Logo from '../globals/Logo';

import './LandingPage.css';

class LandingPage extends Component {
  state = {
    authenticated: false,
    loading: false,
    slingId: ''
  }

  componentDidMount() {
    if(localStorage.token) {
      this.setState({ authenticated: true });
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
      this.props.history.push(`/${slingId}`);
    } catch (e) {
      debug('error retrieving slingId. e = ', e);
    }
  }

  handleStartProgrammingClick = () => {
    this.setState({
      loading: true,
    }, this.fetchSlingId);
  }

  handleLoginClick = () => {
    this.props.history.push('/login')
  }
  
  handleSetupClick = () => {
    this.props.history.push('/signup')
  }

  render() {
    if (this.state.authenticated) {
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
          <Button
            className="auth-btn-container"
            backgroundColor="red"
            color="white"
            loading={this.state.loading}
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
          />
        </div>
      )
    }
  }
}

export default LandingPage;
