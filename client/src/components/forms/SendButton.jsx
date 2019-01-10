import React, { Component } from 'react';

class SendButton extends Component {
    render() {
      return (
        <button onClick={this.props.onClick} type="submit" className={this.props.bootstrapButtonType} id="submitButton">
          {this.props.value}
          </button>
      );
    }
  }

  export default SendButton;