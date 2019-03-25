import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Signup.css';
import InputText from '../components/forms/InputText';
import InputPassSign from '../components/forms/InputPassSign';
import SendButton from '../components/forms/SendButton';
// import { Route, Redirect } from 'react-router-dom'

const HYPERTUBE_ROUTE = 'localhost:3001';


function getUser(token, dispatch) {
  fetch(`https://${HYPERTUBE_ROUTE}/getuser`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
    .then(response => response.json())
    .then(response => dispatch({ type: 'GET_USER', value: response.user }));
}

function handleSubmit(event, dispatch) {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch(`https://${HYPERTUBE_ROUTE}/signin`, {
    method: 'POST',
    body: data,
  })
    .then(res => res.json())
    .then((users) => {
      var flash = document.getElementById('flash');
      // if (users[0].connected) {
      //   window.location = '/';
      // }
      if (users.error) {
        flash.textContent = users[0].error;
        flash.style.color = 'red';
      }
      return users;
    })
    .then((users) => {
      dispatch({ type: 'NEW_TOKEN', value: users.token });
      getUser(users.token, dispatch);
    });
  // var inputs = document.getElementsByTagName('input');
  // for (var i = 0; i < inputs.length; i++)
  //   inputs[i].value = '';
}

const Signin = ({ dispatch }) => (
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
        <form onSubmit={event => handleSubmit(event, dispatch)}>
          <InputText label="Login" name="login" id="Login" />
          <InputPassSign label="Password" name="password" id="Password" />
          <SendButton bootstrapButtonType="btn btn-warning" value="Sign in" />
          <p id="flash" />
        </form>
      </div>
    </div>
  </div>
);

Signin.propTypes = {
  // token: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

// Signin.defaultProps = {
//   token: undefined,
// };

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
