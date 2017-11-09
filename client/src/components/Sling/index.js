import React, { Component } from 'react';
import axios from 'axios';

import Sling from './Sling';
import ErrorBoundary from '../ErrorHandling/ErrorBoundary';

class ProtectedSling extends Component {
  state = {  }

  async componentDidMount() {
    const sling = await this.slingExistsinDB();
    if (sling) {
      this.props.history.push(`/${this.props.match.params.slingId}`);
    } else {
      throw new Error ('Invalid sling');
    }
  }
  
  slingExistsinDB = async () => {
    const slingId = this.props.match.params.slingId
    const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/slings/${slingId}`);
    const { sling } = data
    return sling;
  }

  render() {
    return (
      // <ErrorBoundary>
        <Sling slingId={this.props.match.params.slingId}/>
      // </ErrorBoundary>
    );
  }
}

export default ProtectedSling;
