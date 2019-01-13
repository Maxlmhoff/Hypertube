import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LandingPage from './profile/LandingPage';
import Signup from './profile/Signup';
import Signin from './profile/Signin';
import ResetPass from './profile/ResetPass';
import Stream from './streamon/bibliotheque/index';
import Profile from './streamon/profile/index';

// const HYPERTUBE_ROUTE = 'localhost:3001';

const App = ({ token }) => (
  <Router>
    <div className="App">
      <div>
        <Route exact path="/signup" render={() => (token ? (<Redirect to="/stream" />) : (<Signup />))} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/stream" render={() => (!token ? (<Redirect to="/" />) : (<Stream />))} />
        <Route exact path="/signin" render={() => (token ? (<Redirect to="/stream" />) : (<Signin />))} />
        <Route exact path="/resetPass" component={ResetPass} />
        <Route exact path="/profile" render={() => (!token ? (<Redirect to="/" />) : (<Profile />))} />
      </div>
    </div>
  </Router>
);

App.propTypes = {
  token: PropTypes.string,
};

App.defaultProps = {
  token: undefined,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
