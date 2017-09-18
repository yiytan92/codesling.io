import React, { Component } from 'react';

import CodeMirror from 'react-codemirror2'
import io from 'socket.io-client/dist/socket.io.js';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';

class CodeEditor extends Component {
  
  state = {
    text: ''
  }
  
  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_LOCAL_HOST, {
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
      </div>
    );
  }
}

export default CodeEditor;
