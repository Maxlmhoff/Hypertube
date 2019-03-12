import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Movie from '../movie';
import './index.css';
import Header from '../../components/header';

const HYPERTUBE_ROUTE = 'localhost:3001';

function getMovies(queryTerm) {
  return fetch(`http://${HYPERTUBE_ROUTE}/apifetch`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ api: 'search', queryTerm }),
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
    getMovies(match.params.value)
      .then((movie) => {
        movie.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return (0);
        });
        return movie;
      })
      .then(movie => {console.log(movie); return movie })
      .then(movie => this.setState({ movie }));
  }

  render() {
    const { movie } = this.state;
    return (
      <div>
        <Header />
        <div id="mini_container">
          {movie && movie.map(movies => (
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
