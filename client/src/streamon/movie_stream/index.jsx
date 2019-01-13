import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';
import Header from '../../components/header';


function getMovie(title) {
    return fetch('https://yts.am/api/v2/list_movies.json?query_term=' + title, {
        method: 'GET',
    })
        .then(res => res.json())
}

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: undefined,
        }
    }

    componentDidMount() {
        getMovie(this.props.match.params.value)
            .then(movie => this.setState({ movie }))
            .then(() => console.log(this.state.movie.data.movies))

    }

    render() {
        return (
            <div>
                <Header />
                <div id="main_div">
                    <div id="player_stream">

                    </div>
                    <div id="movie_infos">
                        <div className="mini_info">
                            <img src={this.state.movie && this.state.movie.data.movies[0].medium_cover_image}></img>
                        </div>
                        <div className="infos">
                            <div id="infos_title">{this.state.movie && this.state.movie.data.movies[0].title_english}</div>
                            <div id="rty_infos">
                                Rating: {this.state.movie && this.state.movie.data.movies[0].rating}/10
                                Time: {this.state.movie && this.state.movie.data.movies[0].runtime} min
                                Year: {this.state.movie && this.state.movie.data.movies[0].year}
                            </div>
                            <div id="synopsys_title">
                                Synopsys {this.state.movie && this.state.movie.data.movies[0].title_english}
                            </div>
                            <div></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

Movie.propTypes = {
    token: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
