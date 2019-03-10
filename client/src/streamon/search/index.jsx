import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Movie from '../movie';
import './index.css';
import Header from '../../components/header';

const HYPERTUBE_ROUTE = 'localhost:3001';

// function getMovies(queryTerm) {
//   return fetch(`https://yts.am/api/v2/list_movies.json?query_term=${queryTerm}&limit=50`, {
//     method: 'GET',
//   })
//     .then(res => res.json());
// }

function getMovies(queryTerm) {
  return fetch(`http://${HYPERTUBE_ROUTE}/apifetch`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ yts: 'oui', queryTerm }),
  })
    .then(res => res.json());
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    // console.log(match.params.value);
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
          {movie && console.log(movie.data)}
          {movie && movie.data.movie_count > 0 && movie.data.movies.map(movies => (
            <Movie key={movies.id} movie={movies} />
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
