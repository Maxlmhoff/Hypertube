import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';
import profileIcon from '../../img/profileIcon.png';
import duck from '../../img/duck.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.search = this.search.bind(this);
  }

  handleKeyPress(e) {
    this.setState({ query: e.target.value });
  }

  search(e) {
    const { query } = this.state;
    if (e.key === 'Enter') {
      window.location = `/search/${query}`;
    }
  }


  render() {
    const { dispatch } = this.props;
    const { value } = this.state;
    return (
      <div>
        <div className="main_banner">
          <div id="div_title">
            <Link to="/stream">
              <img alt="duck" src={duck} className="duck" />
            </Link>
            <h1>Hypertube</h1>
          </div>
          <div id="div_menu">
            <input type="text" name="search" id="search" placeholder="Rechercher Film, Série, ..." value={value} onChange={this.handleKeyPress} onKeyPress={this.search} />
          </div>
          <div id="div_search_disconnect">
            <Link to="/profile">
              <img src={profileIcon} id="profile_icon" alt="profile_icon" />
            </Link>
            <Link to="/">
              <button id="dc_button" type="button" onClick={() => dispatch({ type: 'DISCONNECT' })}>
                Log out
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
