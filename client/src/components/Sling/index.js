import React, { Component } from 'react';
import axios from 'axios';

import Sling from './Sling';

class ProtectedSling extends Component {
  async componentDidMount() {
    const slingExists = await this.slingExistsinDB();
    if (!slingExists) {
      throw new Error('error')
      // this.props.history.push(`/${this.props.match.params.slingId}`);
    }
  }
  
  slingExistsinDB = async () => {
    const slingId = this.props.match.params.slingId
    const { data } = await axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/slings/${slingId}`);
    const { sling } = data
    return !!sling;
  }

  render() {
    return (
      <Sling slingId={this.props.match.params.slingId}/>
    );
  }
}

export default ProtectedSling;
