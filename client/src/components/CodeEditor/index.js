import React, { Component } from 'react';

import CodeMirror from 'react-codemirror2'

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';

class CodeEditor extends Component {
  state = {
    editorText: '// your code here'
  }

  render() {
    return (
      <div className="code-editor">
        <CodeMirror
          value={this.state.random}
          options={{
            mode: 'javascript',
            lineNumbers: true
          }}
          onChange={(editor, metadata, value) => {
          }}
        />
      </div>
    );
  }
}

export default CodeEditor;
