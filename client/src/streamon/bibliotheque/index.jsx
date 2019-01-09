import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import down_arrow from '../../img/down_arrow.png';

const Stream = ({ user, dispatch }) => (
  <div>
    <div id="div_name">Bonjour {user.login}</div>
    <div className="main_banner">
      <div id="div_title">
        <h1>Hypertube</h1>
      </div>
      <div id="div_menu">
        <ul>
          <li>ACCUEIL</li>
          <li>MENU FILMS <img src={down_arrow} class="down_arrow" /><div id="div_movies">test</div></li>
          <li>MENU SERIES <img src={down_arrow} class="down_arrow" /><div id="div_series">test</div></li>
          <li>MENUS MANGAS <img src={down_arrow} class="down_arrow" /><div id="div_mangas">test</div></li>
        </ul>
      </div>
      <div id="div_search_disconnect">
        <input type="text" name="search" id="search" placeholder="Rechercher Film, Série, ..." />
        <button type="button" onClick={() => dispatch({ type: 'DISCONNECT' })}>
          LOG OUT
      </button>
      </div>
    </div>
  </div>
);

Stream.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
