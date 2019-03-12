import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import playButton from '../../img/playButton.png';
import pirate from '../../img/pirate.png';

const HYPERTUBE_ROUTE = 'localhost:3001';

function putVu(token, movie) {
  fetch(`http://${HYPERTUBE_ROUTE}/putvu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      movie,
    }),
  });
}

const Movie = ({
  movie, token, style, api,
}) => (
  <div className="mini" style={style}>
    <Link to={`/movie/${movie.api || api}/${movie.id}`} onClick={() => putVu(token, movie.id)}>
      <div className="div_play_button">
        <p className="movie_title">{movie.title}</p>
        <p>{movie.year}</p>
        <img className="playbutton" alt="play" src={playButton} />
        <p>{movie.rating}</p>
      </div>
      <img className="cover_photo" alt="movies" src={movie.medium_cover_image || pirate} />
    </Link>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Movie.defaultProps = {
  style: {},
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
