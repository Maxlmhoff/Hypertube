import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';

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
    });
  }

  render() {
    return (
      <div className="backgroundGrey">
        <div className="topBanner">
          <div className="divsInBanner">
            <p className="smallText" id="white">
              Already have a Matcha account?
              <br />
              <a href="#" className="smallText" id="linkForgot">
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
          <h1><a href="#">Hypertube</a></h1>
        </div>
        <div className="containerForm">
          <h3>Hypertube</h3>
          <div className="divForm">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="firstname">
                  Prenom
                </label>
                <input type="text" name="firstname" id="firstname" class="form-control"></input>
              </div>
              <div class="form-group">
                <label for="name">
                  Nom
                </label>
                <input type="text" name="name" id="name" class="form-control"></input>
              </div>
              <div class="form-group">
                <label for="email">
                  Adresse email
                </label>
                <input type="email" name="email" id="email" class="form-control"></input>
              </div>
              <div class="form-group">
                <label for="login">
                  Login
                  </label>
                <input type="text" name="login" id="login" class="form-control"></input>
              </div>
              <div class="form-group">
                <label for="password">
                  Mot de passe
                    </label>
                <input type="password" name="password" id="password" class="form-control"></input>
              </div>
              <div class="form-group">
                <label for="passConfirm">
                  Confirmez votre mot de passe
                      </label>
                <input type="password" name="passConfirm" id="passConfirm" class="form-control">
                </input>
              </div>
              <button type="submit" class="btn btn-warning" id="submitButton">
                Create account
            </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;