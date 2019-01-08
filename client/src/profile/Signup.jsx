import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Signup.css';
import InputText from '../components/forms/InputText';
import InputEmail from '../components/forms/InputEmail';
import InputPassword from '../components/forms/InputPassword';
import InputFile from '../components/forms/InputFile';
import SendButton from '../components/forms/SendButton';
import FbLogin from '../components/auth/fb';

const HYPERTUBE_ROUTE = 'localhost:3001';
const signin = require('../img/signin.png');

function handleSubmit(event, dispatch) {
  event.preventDefault();
  const data = new FormData(event.target);
  fetch(`http://${HYPERTUBE_ROUTE}/register`, {
    method: 'POST',
    body: data,
  })
    .then(res => res.json())
    .then((users) => {
      console.log("un utilisateur est crée: ")
      console.log(users);
      const flash = document.getElementById('flash');
      if (users.success) {
        flash.textContent = users.success;
        flash.style.color = 'green';
      }
      if (users.error) {
        flash.textContent = users.error;
        flash.style.color = 'red';
      }
      return (users);
    })
    .then(users => dispatch({ type: 'NEW_TOKEN', value: users.token }));
  // const inputs = document.getElementsByTagName('input');
  // // for (let i = 0; i < inputs.length; i += 1) {
  // //   inputs[i].value = '';
  // // }
}

const Signup = ({ token, dispatch }) => (
  <div className="backgroundGrey">
    <div className="topBanner">
      <div className="divsInBanner">
        <p className="smallText" id="white">
          Already have a Hypertube account?
          <br />
          <a href="resetPass" className="smallText" id="linkForgot">
            I forgot my User ID or Password
          </a>
          Token :
          {token}
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
        <form onSubmit={event => handleSubmit(event, dispatch)}>
          <InputText label="Prenom" name="prenom" id="Prenom" />
          <InputText label="Nom" name="nom" id="Nom" />
          <InputEmail label="Email" name="email" id="Email" />
          <InputText label="Login" name="login" id="Login" />
          <InputFile label="Votre photo de profil" name="photo" id="photo" />
          <InputPassword label="Password" name="password" id="Password" />
          <SendButton bootstrapButtonType="btn btn-warning" value="Create account" />
          <p id="flash" />
        </form>
        <p id="ou">OU</p>
        <FbLogin />
      </div>
    </div>
  </div>
);

Signup.propTypes = {
  token: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

Signup.defaultProps = {
  token: undefined,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
