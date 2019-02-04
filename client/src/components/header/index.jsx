import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';
// import down_arrow from '../../img/down_arrow.png';
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
    if (e.key === 'Enter') {
      window.location = `/search/${this.state.query}`;  
    }
  }


  render() {
    const { dispatch, user } = this.props;
    return (
      <div>
        <div id="div_name">
          Bonjour
          {user.login}
        </div>
        <div className="main_banner">
          <div id="div_title">
            <Link to="/stream">
              <img alt="duck" src={duck} className="duck" onClick={this.setRedirect} />
            </Link>
            <h1>Hypertube</h1>
          </div>
          <div id="div_menu">
            <ul>
              <li>ACCUEIL</li>
              <li>
                FILMS
                {/* <img alt="arrow" src={down_arrow} className="down_arrow" /> */}
                <div id="div_movies">
                  test
                </div>
              </li>
              <li>
                SERIES
                {/* <img alt="arrow" src={down_arrow} className="down_arrow" /> */}
                <div id="div_series">
                  test
                </div>
              </li>
              <li>
                MANGAS
                {/* <img alt="arrow" src={down_arrow} className="down_arrow" /> */}
                <div id="div_mangas">
                  test
                </div>
              </li>
            </ul>
          </div>
          <div id="div_search_disconnect">
            <input type="text" name="search" id="search" placeholder="Rechercher Film, Série, ..." value={this.state.value} onChange={this.handleKeyPress} onKeyPress={this.search} />
            <Link to="/profile">
              <img src={profileIcon} id="profile_icon" alt="profile_icon" />
            </Link>
            <button type="button" onClick={() => dispatch({ type: 'DISCONNECT' })}>
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Header);
