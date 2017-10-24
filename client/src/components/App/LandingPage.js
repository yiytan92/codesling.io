import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

import Button from '../globals/Button';

export default class LandingPage extends Component {
  constructor() {
    super();

    this.state = {
      id: null,
    }
  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: `roomId=${this.state.id}`
    });

    this.socket.on('connect', () => {
      this.socket.emit('client.ready');
    });

    this.socket.on('server.initialState', ({ id }) => {
      this.setState({ id });
    });
  }

  startPairProgramming = () => {
    this.props.history.push(`/${this.state.id}`);
  }

  render() {
    return (
      <div>
        <Button 
          text='Start Pair Programming!'
          onClick={this.startPairProgramming}
        />
      </ div>
    )
  }
}

