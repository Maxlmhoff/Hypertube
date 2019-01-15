import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import './index.css';
import Header from '../../components/header';
import play_button from '../../img/play_button.png';
import person_icon from '../../img/person_icon.png';


function getMovies(query_term) {
  return fetch('https://yts.am/api/v2/list_movies.json?query_term=' + query_term, {
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

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.value)
    getMovies(this.props.match.params.value)
        .then(movie => this.setState({ movie }))
        .then(() => {console.log(this.state)})

}

  render() {
    const { user, dispatch } = this.props;

    return (

      <div>
        <Header />
        <div id="mini_container">
          {this.state.movie && console.log(this.state.movie)}
          {this.state.movie && this.state.movie.data.movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />
          })}
        </div>
      </div>
    );
  }
}
Search.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Search);
