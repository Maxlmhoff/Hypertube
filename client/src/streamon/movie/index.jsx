import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';
import playButton from '../../img/playButton.png';

const Movie = ({ movie }) => (
  <div className="mini">
    <Link to={`/movie/${movie.id}`}>
      <div className="div_play_button">
        <img alt="play" src={playButton} />
      </div>
      <img alt="movies" src={movie.medium_cover_image} />
    </Link>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default (Movie);
