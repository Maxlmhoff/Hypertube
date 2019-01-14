import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';
import Header from '../../components/header';
import play_button from '../../img/play_button.png';
import person_icon from '../../img/person_icon.png';
import InputTextArea from '../../components/forms/InputTextArea';


function getMovie(id) {
    return fetch('https://yts.am/api/v2/movie_details.json?movie_id=' + id + '&with_cast=true', {
        method: 'GET',
    })
        .then(res => res.json())
}

function getRelatedMovies(id) {
    return fetch('https://yts.am/api/v2/movie_suggestions.json?movie_id=' + id, {
        method: 'GET',
    })
        .then(res => res.json())
}


class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: undefined,
            related: undefined,
            trailer: '',
        }
    }

    componentDidMount() {
        getMovie(this.props.match.params.value)
            .then(movie => this.setState({ movie }))
            // .then(() => console.log(this.state.movie.data.movie))
            .then(() => this.setState({ trailer: 'https://www.youtube.com/embed/' + this.state.movie.data.movie.yt_trailer_code }));
        getRelatedMovies(this.props.match.params.value)
            .then(related => this.setState({ related }))
        // .then(() => console.log(this.state.related.data.movies))

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
                            <img src={this.state.movie && this.state.movie.data.movie.medium_cover_image} alt={this.state.movie && this.state.movie.data.movie.title}></img>
                        </div>
                        <div className="infos">
                            <div id="infos_title">{this.state.movie && this.state.movie.data.movie.title_english}</div>
                            <div id="rty_infos">
                                Rating: {this.state.movie && this.state.movie.data.movie.rating}/10
                                Time: {this.state.movie && this.state.movie.data.movie.runtime} min
                                Year: {this.state.movie && this.state.movie.data.movie.year}
                            </div>
                            <div id="synopsys_title">
                                Synopsys {this.state.movie && this.state.movie.data.movie.title_english}
                            </div>
                            <div id="synopsys">
                                {this.state.movie && this.state.movie.data.movie.description_full}
                            </div>
                        </div>
                    </div>
                    <div id="more_infos">
                        <div id="genre"><span id="span_genre">Genre: </span>{this.state.movie && this.state.movie.data.movie.genres.map((genre) => {
                            return (<span key={genre}> {genre} </span>)
                        })}
                        </div>
                        <div id="cast_div">
                            Cast:<br />
                            {this.state.movie && this.state.movie.data.movie.cast.map((genre) => {
                                return (<span className="cast_name" key={genre.name}><img src={person_icon} className="person_icon" alt="person_icon"></img>{genre.name} <br /></span>)
                            })}
                        </div>
                        <div id="trailer_button">
                            <a href={this.state.trailer} target="_blank" rel="noopener noreferrer">
                                <button>
                                    <img src={play_button} id="play_button" alt="play_button"></img>
                                    REGARDER LA BANDE ANNONCE
                                    </button>
                            </a>
                        </div>
                        {/* <div>
                            <iframe
                                width="560"
                                height="315"
                                src={this.state.trailer}
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                        </div> */}
                        <p id="title_suggestions">Films associés</p>
                        <div className="suggestions_div">
                            {this.state.related && this.state.related.data.movies.map((suggestion) => {
                                return (
                                    <Link to={"/movie/" + suggestion.id}>
                                        <div
                                            className="suggestion_movie"
                                            key={suggestion.id}>
                                            <img
                                                src={suggestion.medium_cover_image}
                                                alt={suggestion.title}>
                                            </img>
                                            <p className="title_movie_suggested">{suggestion.title}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div id="form_div">
                        <p id="title_comment">Laisser un commentaire</p>
                        <InputTextArea name="comment" label="comment" id="comment"/>
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
