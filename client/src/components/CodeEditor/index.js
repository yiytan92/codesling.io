import React, { Component } from 'react';
import axios from 'axios';
import CodeMirror from 'react-codemirror2';
import io from 'socket.io-client/dist/socket.io.js';

import Button from '../globals/Button';
import StdOut from './StdOut';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';

class CodeEditor extends Component {

  state = {
    text: '',
    stdout: ''
  }

  runCode = () => {
    axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/run`, {
      code: this.state.text
    })
      .then(({ data }) => {
        const { stdout } = data;
        this.setState({ stdout });
      })
      .catch(err => {
        console.log('runCode post request err. err = ', err);
      });
  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: 'roomId=default'
    });

    this.socket.on('connect', () => {
      this.socket.emit('client.ready');
    });

    this.socket.on('server.initialState', ({ text }) => {
      this.setState({ text });
    });

    this.socket.on('server.changed', ({ text }) => {
      this.setState({ text });
    });
  }

  render() {
    return (
      <div className="code-editor">
        <CodeMirror
          value={this.state.text}
          options={{
            mode: 'javascript',
            lineNumbers: true
          }}
          onChange={(editor, metadata, value) => {
            this.socket.emit('client.update', { text: value });
          }}
        />
        <Button
          text="Run Code"
          onClick={this.runCode}
        />
        <StdOut text={this.state.stdout} />
      </div>
    );
  }
}

export default CodeEditor;
