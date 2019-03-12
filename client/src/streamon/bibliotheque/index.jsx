import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Movie from '../movie';
import './index.css';
import Header from '../../components/header';

const HYPERTUBE_ROUTE = 'localhost:3001';

function getMovies(api, page = 0) {
  return fetch(`http://${HYPERTUBE_ROUTE}/apifetch`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ normal: 'normal', api, page: page + 1 }),
  })
    .then(res => res.json());
}

class Stream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      vus: undefined,
    };
    this.pagination = this.pagination.bind(this);
  }

  componentDidMount() {
    const { token, api } = this.props;
    getMovies(api)
      .then(movies => this.setState({ movies }))
      .then(() => this.getVu(token));
  }

  getVu(token) {
    fetch(`http://${HYPERTUBE_ROUTE}/getvu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(success => success.json())
      .then(success => this.setState({ vus: success.success }));
  }

  pagination() {
    const { api } = this.props;
    const { movies } = this.state;

    if (api === 'bay') {
      return;
    }
    getMovies(api, movies.length / 30)
      .then(response => this.setState({ movies: movies.concat(response) }));
  }

  render() {
    const { dispatch } = this.props;
    const { movies, vus } = this.state;
    if (!movies || !vus) {
      return null;
    }
    return (
      <div>
        <Header />
        <div id="bandeau_button">
          <button
            onClick={() => {
              dispatch({ type: 'YTS', value: 'yts' });
              getMovies('yts').then(response => this.setState({ movies: response }));
            }}
            type="button"
            className="apibutton"
            id="api_yts"
          >
            API YTS
          </button>
          <button
            onClick={() => {
              dispatch({ type: 'BAY', value: 'bay' });
              getMovies('bay')
                .then(response => this.setState({ movies: response }));
            }}
            type="button"
            className="apibutton"
            id="api_bay"
          >
            API bay
          </button>
        </div>
        <InfiniteScroll
          pageStart={0}
          hasMore
          loadMore={this.pagination}
        >
          <div id="mini_container">
            {movies && vus && movies.map((movie) => {
              const isSeen = vus.filter(
                elem => elem.movie_id === `${movie.id}`,
              ).length !== 0;
              return (
                <div key={movie.id}>
                  <Movie style={{ borderColor: isSeen ? 'green' : 'white' }} movie={movie} />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

Stream.propTypes = {
  token: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
