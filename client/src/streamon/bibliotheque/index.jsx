import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Movie from '../movie';
import './index.css';
import Header from '../../components/header';

const HYPERTUBE_ROUTE = 'localhost:3001';

function getMovies(api, page = 0, genre, sort) {
  return fetch(`http://${HYPERTUBE_ROUTE}/apifetch`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api, page: page + 1, genre, sort,
    }),
  })
    .then(res => res.json());
}

class Stream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      vus: undefined,
      genre: 'Action',
      sort: 'rating',
    };
    this.pagination = this.pagination.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
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

  handleChangeGenre(event) {
    this.setState({ genre: event.target.value });
  }

  handleChangeSort(event) {
    this.setState({ sort: event.target.value });
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
    const { dispatch, api } = this.props;
    const {
      movies, vus, genre, sort,
    } = this.state;
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
        {api === 'yts' && (
          <div id="div_genre_sort">
            <div className="div_all_sort">
              <label htmlFor={genre}>
                Pick your genre:
                <select value={genre} onChange={this.handleChangeGenre}>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Horror">Horror</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Western">Western</option>
                </select>
              </label>
              <button className="button_submit_filter" onClick={() => getMovies(api, 0, genre).then(response => this.setState({ movies: response }))} type="submit" value="Submit">Submit</button>
            </div>
            <div className="div_all_sort">
              <label htmlFor={sort}>
                Sort by:
                <select value={sort} onChange={this.handleChangeSort}>
                  <option value="rating">rating</option>
                  <option value="title">title</option>
                  <option value="year">year</option>
                  <option value="download_count">download_count</option>
                  <option value="like_count">like_count</option>
                </select>
              </label>
              <button className="button_submit_filter" onClick={() => getMovies(api, 0, undefined, sort).then(response => this.setState({ movies: response }))} type="submit" value="Submit">Submit</button>
            </div>
          </div>
        )}
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
