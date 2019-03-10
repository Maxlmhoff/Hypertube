import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Movie from '../movie';
import './index.css';
import Header from '../../components/header';

const HYPERTUBE_ROUTE = 'localhost:3001';

function getMovies(api) {
  return fetch(`http://${HYPERTUBE_ROUTE}/apifetch`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ normal: 'normal', api }),
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
  }

  componentDidMount() {
    const { token } = this.props;
    getMovies('yts')
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
      // .then(success => console.log(success.success))
      .then(success => this.setState({ vus: success.success }));
  }

  // test() {
  //   console.log('hey');
  // }

  render() {
    const { movies, vus } = this.state;
    if (!movies || !vus) {
      return null;
    }
    return (
      <div>
        <Header />
        {/* <InfiniteScroll
          pageStart={0}
          hasMore
          loadMore={this.test}
        > */}
          <div id="mini_container">
            {movies && vus && movies.map((movie) => {
              const isSeen = vus.filter(
                elem => parseInt(elem.movie_id, 10) === movie.id,
              ).length !== 0;
              return (
                <div key={movie.id}>
                  <Movie style={{ borderColor: isSeen ? 'green' : 'white' }} movie={movie} />
                </div>
              );
            })}
          </div>
        {/* </InfiniteScroll> */}
      </div>
    );
  }
}

Stream.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
