import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import InputText from '../components/forms/InputText';
import InputEmail from '../components/forms/InputEmail';
import InputPassword from '../components/forms/InputPassword';
import InputFile from '../components/forms/InputFile';
import SendButton from '../components/forms/SendButton';
import FacebookLogin from '../components/auth/fb.jsx';

const HYPERTUBE_ROUTE = 'localhost:3001';
const signin = require('../img/signin.png');


class Signup extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('http://' + HYPERTUBE_ROUTE + '/register', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(users => {
        var flash = document.getElementById('flash');
        if (users[0].success)
        {
          flash.textContent = users[0].success;
          flash.style.color = 'green';
        }
        if (users[0].error)
        {
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
              Already have a Matcha account?
              <br />
              <a href="resetPass" className="smallText" id="linkForgot">
                I forgot my User ID or Password
                </a>
            </p>
          </div>
          <div className="divsInBanner">
            <Link to="/signin">
              <button className="btn btn-primary" type="button">
                <img src={signin} className="icon" alt="signin" />
                Sign in
                </button>
            </Link>
          </div>
        </div>
        <div>
          <h1><a href="/">Hypertube</a></h1>
        </div>
        <div className="containerForm">
          <h3>Hypertube</h3>
          <div className="divForm">
            <form onSubmit={this.handleSubmit}>
              <InputText label="Prenom" name="prenom" id="Prenom" />
              <InputText label="Nom" name="nom" id="Nom" />
              <InputEmail label="Email" name="email" id="Email" />
              <InputText label="Login" name="login" id="Login" />
              <InputFile label="Votre photo de profil" name="photo" id="photo" />
              <InputPassword label="Password" name="password" id="Password" />
              <SendButton bootstrapButtonType="btn btn-warning" value="Create account" />
              <p id="flash"></p>
            </form>
            <p id="ou">OU</p>
              <FacebookLogin />
          </div>
        </div>
      </div>
    );
  }
}


export default Signup;
