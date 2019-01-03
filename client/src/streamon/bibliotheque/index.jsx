import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';

const Stream = ({ dispatch, token }) => (
  <div className="test">
    <h1>Carl fais le front stp</h1>
    <button type="button" onClick={() => dispatch({ type: 'DISCONNECT' })}>
      Disconnect (remise du token à 0)
    </button>
    <p>
      Token :
      {token}
    </p>
  </div>
);

Stream.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
