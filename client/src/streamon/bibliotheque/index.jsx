import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';

const disconnet = require('../../img/powerof.png');

const Stream = ({ dispatch}) => (
  <div className="main_banner">
    <h1>Hypertube</h1>
    <button type="button" onClick={() => dispatch({ type: 'DISCONNECT' })}>
      Disconnect
    </button>
  </div>
);

Stream.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
