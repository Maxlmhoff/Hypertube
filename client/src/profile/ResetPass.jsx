import React, { Component } from 'react';
import './Signup.css';
import InputEmail from '../components/forms/InputEmail';
import SendButton from '../components/forms/SendButton';

const HYPERTUBE_ROUTE = 'localhost:3001';


class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // const {} = this.props;
    event.preventDefault();
    const data = new FormData(event.target);
    fetch(`https://${HYPERTUBE_ROUTE}/resetPass`, {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(users => {
        var flash = document.getElementById('flash');
        if (users[0].success) {
          flash.textContent = users[0].success;
          flash.style.color = 'green';
        }
        if (users[0].error) {
          flash.textContent = users[0].error;
          flash.style.color = 'red';
        }
      })
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++)
      inputs[i].value = '';
  }

  render() {
    return (
      <div className="backgroundGrey">
        <div className="topBanner" />
        <div>
          <h1><a href="/">Hypertube</a></h1>
        </div>
        <div className="containerForm">
          <h3>Get new password</h3>
          <div className="divForm">
            <form onSubmit={this.handleSubmit}>
              <InputEmail label="Email" name="email" id="Email" />
              <SendButton bootstrapButtonType="btn btn-warning" value="Sign in" />
              <p id="flash" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPass;