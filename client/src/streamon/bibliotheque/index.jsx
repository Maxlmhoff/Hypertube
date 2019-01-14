import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import './index.css';
import Header from '../../components/header';
// import down_arrow from '../../img/down_arrow.png';
// import profile_icon from '../../img/profile_icon.png';
import play_button from '../../img/play_button.png';

// const HYPERTUBE_ROUTE = 'localhost:3001';


function getMovies() {
  return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating&limit=30', {
    method: 'GET',
  })
    .then(res => res.json())
}


class Movie extends Component {

  render() {
    return (
      <div className="mini">
        <Link to={"/movie/" + this.props.movie.id}>
          <div className="div_play_button">
            <img src={play_button}></img>
          </div>
          <img src={this.props.movie.medium_cover_image}></img>
        </Link>
      </div>
    )
  }
}

class Stream extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: undefined,
    }
  }

  componentDidMount() {
    getMovies()
      .then(movies => this.setState({ movies }))
    // .then(() => console.log(this.state.movies.data))
  }

  render() {
    const { user, dispatch } = this.props;

    return (

      <div>
        <Header />
        <div id="mini_container">
          {this.state.movies && console.log(this.state.movies)}
          {this.state.movies && this.state.movies.data.movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />
          })}
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
