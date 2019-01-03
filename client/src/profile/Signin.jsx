import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Signup.css';
import InputText from '../components/forms/InputText';
import InputPassSign from '../components/forms/InputPassSign';
import SendButton from '../components/forms/SendButton';
// import { Route, Redirect } from 'react-router-dom'

const HYPERTUBE_ROUTE = 'localhost:3001';


class Signin extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('http://' + HYPERTUBE_ROUTE + '/signin', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(users => {
        var flash = document.getElementById('flash');
        if (users[0].connected) {
          window.location = '/';
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
        <div className="topBanner">
          <div className="divsInBanner">
            <p className="smallText" id="white">
              <a href="resetPass" className="smallText" id="linkForgot">
                I forgot my User ID or Password
              </a>
            </p>
          </div>
        </div>
        <div>
          <h1><a href="/">Hypertube</a></h1>
        </div>
        <div className="containerForm">
          <h3>Sign in</h3>
          <div className="divForm">
            <form onSubmit={this.handleSubmit}>
              <InputText label="Login" name="login" id="Login" />
              <InputPassSign label="Password" name="password" id="Password" />
              <SendButton bootstrapButtonType="btn btn-warning" value="Sign in" />
              <p id="flash" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
