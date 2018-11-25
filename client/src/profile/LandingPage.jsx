import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const signin = require('../img/signin.png');
const signup = require('../img/signup.png');


class LandingPage extends Component {
  // componentDidMount is invoked after a component is mounted (inserted into the DOM).
  // componentDidMount is used if we need to load data from a remote endpoint (network request).
  componentDidMount() {
    const elem = document.querySelector('body');
    elem.className = 'login-page';
  }

  componentWillUnmount() {
    const elem = document.querySelector('body');
    elem.className = '';
  }

  render() {
    return (
      <div>
        <div className="loginSigninBanner">
          <div>
            <h3>Hypertube</h3>
          </div>
          <div id="sign">
            <div id="link1">
              <Link to="/signin">
                <button className="btn btn-primary" type="button">
                  <img src={signin} className="icon" alt="signin" />
                  Sign in
                </button>
              </Link>
            </div>
            <div id="link2" className="whiteFont">
              <Link to="/signup">
                <button className="btn btn-warning" type="button">
                  <img src={signup} className="icon" alt="signup" />
                  SIGN UP
                </button>
              </Link>
            </div>
          </div>
        </div>
        <h1 id="title1" className="text-center">Hypertube</h1>
        <p id="subTitle" className="text-center">Watch free movies on hypertube !</p>
      </div>
    );
  }
}

export default LandingPage;
