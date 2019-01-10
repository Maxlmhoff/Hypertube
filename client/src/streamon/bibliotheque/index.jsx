import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';
import down_arrow from '../../img/down_arrow.png';
import profile_icon from '../../img/profile_icon.png';

const HYPERTUBE_ROUTE = 'localhost:3001';

// const Stream = ({ user, dispatch }) => (

class Stream extends Component {

  render() {
    const { user, dispatch } = this.props;
    fetch('https://yts.am/api/v2/list_movies.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then((movies) => {
        console.log(movies.data);
      })
    return (
      
      <div>
        <div id="div_name">Bonjour {user.login}</div>
        <div className="main_banner">
          <div id="div_title">
            <h1>Hypertube</h1>
          </div>
          <div id="div_menu">
            <ul>
              <li>ACCUEIL</li>
              <li>MENU FILMS <img src={down_arrow} className="down_arrow" /><div id="div_movies">test</div></li>
              <li>MENU SERIES <img src={down_arrow} className="down_arrow" /><div id="div_series">test</div></li>
              <li>MENUS MANGAS <img src={down_arrow} className="down_arrow" /><div id="div_mangas">test</div></li>
            </ul>
          </div>
          <div id="div_search_disconnect">
            <input type="text" name="search" id="search" placeholder="Rechercher Film, Série, ..." />
            <Link to="/profile">
              <img src={profile_icon} id="profile_icon" alt="profile_icon"></img>
            </Link>
            <button type="button" onClick={() => dispatch({ type: 'DISCONNECT' })}>
              LOG OUT
      </button>
          </div>
        </div>
        <div>
          TESTEST
        </div>
      </div>
    );
  }
}
Stream.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
