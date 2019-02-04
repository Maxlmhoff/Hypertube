import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Movie from '../movie';
import './index.css';
import Header from '../../components/header';

function getMovies(queryTerm) {
  return fetch(`https://yts.am/api/v2/list_movies.json?query_term=${queryTerm}&limit=50`, {
    method: 'GET',
  })
    .then(res => res.json());
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
    };
    this.props = {
      match: undefined,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    console.log(match.params.value);
    getMovies(match.params.value)
      .then(movie => this.setState({ movie }))
      .then(() => { console.log(this.state); });
  }

  render() {
    const { movie } = this.state;
    return (
      <div>
        <Header />
        <div id="mini_container">
          {movie && console.log(movie.data.movie_count)}
          {movie && movie.data.movie_count > 0 && movie.data.movies.map(film => (
            <Movie key={film.id} movie={film} />
          ))}
        </div>
      </div>
    );
  }
}
Search.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Search);
