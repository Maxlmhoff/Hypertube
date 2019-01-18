import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Player, BigPlayButton, ReplayControl, ControlBar } from 'video-react';

import './index.css';
import "../../../node_modules/video-react/dist/video-react.css";
import Header from '../../components/header';
import play_button from '../../img/play_button.png';
import person_icon from '../../img/person_icon.png';
import InputTextArea from '../../components/forms/InputTextArea';
// import test from '../../tmp/Fight Club (1999)/Fight.Club.10th.Anniversary.Edition.1999.720p.BrRip.x264.YIFY.mp4';



const HYPERTUBE_ROUTE = 'localhost:3001';





// function getMovie(id) {
//   return fetch('https://yts.am/api/v2/movie_details.json?movie_id=' + id + '&with_cast=true', {
//     method: 'GET',
//   })
//     .then(res => res.json())
// }

function getRelatedMovies(id) {
  return fetch('https://yts.am/api/v2/movie_suggestions.json?movie_id=' + id, {
    method: 'GET',
  })
    .then(res => res.json())
}

function getStream(id) {
  return fetch(`http://${HYPERTUBE_ROUTE}/stream`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then(res => res.json());
    // .then(response => response.json());

    // .then(() => {console.log("telechargement")})
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
    // getMovie(this.props.match.params.value)
    //   .then(movie => this.setState({ movie }))
    //   .then(() => {getStream(this.state.movie.data)})


    getStream(this.props.match.params.value)
      .then(movie => this.setState({ movie: movie.movie }))
      // .then(response => {console.log(response)})





      // .then(() => console.log(this.state.movie.data.movie))
      // .then(() => this.setState({ trailer: 'https://www.youtube.com/embed/' + this.state.movie.data.movie.yt_trailer_code }));
    getRelatedMovies(this.props.match.params.value)
      .then(related => this.setState({ related }))
    // .then(() => console.log(this.state.related.data.movies))
  }

  render() {
    // eslint-disable-next-line
    const video = this.state.movie ? require(`../../tmp/${this.state.movie.data.movie.title_long}/The Shawshank Redemption 1994.720p.BRRip.x264.YIFY.mp4`) : undefined;
    return (
      <div>
        <Header />
        <div id="main_div">
          <div id="player_stream">
            {video
              && (
                <Player
                  playsInline
                  poster={this.state.movie && this.state.movie.data.movie.large_cover_image}
                  src={video}
                  fluid={false}
                  width="100%"
                  height={600}
                >
                  <BigPlayButton position="center" />
                  <ControlBar>
                    <ReplayControl seconds={5} order={2.1} />
                    <ReplayControl seconds={10} order={2.2} />
                    <ReplayControl seconds={30} order={2.3} />
                  </ControlBar>
                </Player>
              )
            }
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
              {this.state.movie && this.state.movie.data.movie.cast > 0 && this.state.movie.data.movie.cast.map((genre) => {
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
            <p id="title_comment">Leave a comment</p>
            <InputTextArea name="comment" label="comment" id="comment" />
            <button id="comment_button">LEAVE A COMMENT</button>
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

const MovieConnected = connect(mapStateToProps, mapDispatchToProps)(Movie);

const exportedComponent = (props) => {
  const { match: { params: { value } } } = props;
  return (<MovieConnected key={value} {...props} />);
};

export default exportedComponent;
