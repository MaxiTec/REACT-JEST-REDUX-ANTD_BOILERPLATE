import React, { Component } from 'react';
import { Alert } from 'antd';

class Alerta extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ visible: false });
    this.props.clearMessage();
  }

  render() {
    return (
      <div>
        {this.state.visible ? (
          <Alert
            message={this.props.message}
            type={this.props.type}
            closable
            afterClose={this.handleClose}
          />
        ) : null}
      </div>
    );
  }
}

export default Alerta;
