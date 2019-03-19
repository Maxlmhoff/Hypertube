import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Player, BigPlayButton, ReplayControl, ControlBar,
} from 'video-react';

import './index.css';
import '../../../node_modules/video-react/dist/video-react.css';
import Header from '../../components/header';
import playButton from '../../img/playButton.png';
import personIcon from '../../img/personIcon.png';
import pirate from '../../img/pirate.png';
import InputTextArea from '../../components/forms/InputTextArea';
import SendButton from '../../components/forms/SendButton';
// import test from '../../tmp/movies/The Dark Knight (2008)/The.Dark.Knight.2008.720p.BluRay.x264.YIFY.mp4';

const HYPERTUBE_ROUTE = 'localhost:3001';

function getRelatedMovies(id, api) {
  return fetch(`http://${HYPERTUBE_ROUTE}/apifetch`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ api, id }),
  })
    .then(res => res.json());
}

function getStream(id, api) {
  return fetch(`http://${HYPERTUBE_ROUTE}/stream`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, api }),
  })
    .then(res => res.json());
}

const tryRequire = (path) => {
  try {
    return (require(`../../tmp/movies/${path}`));
  } catch (err) {
    console.log(err);
    return undefined;
  }
};


class MovieStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      related: undefined,
      trailer: '',
      comment: '',
      allComments: [],
    };
    this.putComment = this.putComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.getComment = this.getComment.bind(this);
    // const { user } = this.props;
  }

  componentDidMount() {
    this.mounted = true;
    const { match } = this.props;
    getStream(match.params.value, match.params.api)
      .then((movie) => {
        if (this.mounted && match.params.api === 'yts') {
          console.log(movie.movie.data.movie);
          this.setState({ movie: movie.movie.data.movie });
          return movie;
        }
        if (this.mounted && match.params.api === 'bay') {
          this.setState({ movie });
          return movie;
        }
        return undefined;
      })
      .then((movie) => {
        if (this.mounted && match.params.api === 'yts') {
          this.setState({ trailer: `https://www.youtube.com/embed/${movie.yt_trailer_code}` });
        }
        return movie;
      })
      .then(movie => this.getComment(movie));

    if (match.params.api === 'yts') {
      getRelatedMovies(match.params.value, match.params.api)
        .then(related => this.setState({ related: related.data.movies }));
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getComment(movie) {
    const { api } = this.props;
    fetch(`http://${HYPERTUBE_ROUTE}/getcomment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movie, api }),
    })
      .then(response => response.json())
      .then((response) => {
        if (this.mounted) {
          this.setState({ allComments: response });
        }
      });
  }

  handleChangeComment(event) {
    this.setState({ comment: event.target.value });
  }

  putComment() {
    const { token, user } = this.props;
    const { comment, movie } = this.state;
    fetch(`http://${HYPERTUBE_ROUTE}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        comment,
        user,
        movie,
      }),
    });
  }

  render() {
    // eslint-disable-next-line
    // const video = this.state.movie ? `../../tmp/movies/${this.state.movie.path}` : undefined;
    // console.log("page movie_stream");
    // eslint-disable-next-line
    // const test = this.state.movie ? require(`../../tmp/movies/${this.state.movie.path}`) : undefined;
    // console.log(this.state.movie ? this.state.movie.title_long : undefined)
    const { api } = this.props;
    const {
      movie, related, comment, allComments, trailer,
    } = this.state;

    // eslint-disable-next-line
    const video = movie ? tryRequire(movie.path) : undefined;
    // const video = movie ? require(`../../tmp/movies/Schindlers List (1993)/Schindlers.List.1993.720p.BrRip.x264.BOKUTOX.YIFY.mp4`) : undefined;
    console.log(video);
    // console.log(video);
    // const { user } = this.props;
    if (!movie) {
      return null;
    }
    return (
      <div>
        <Header />
        <div id="main_div">
          <div id="player_stream">
            <Player
              playsInline
              poster={movie && (movie.large_cover_image || pirate)}
              // src={test}
              fluid={false}
              width="100%"
              height={600}
            >
              <source src={video} />
              <BigPlayButton position="center" />
              <ControlBar>
                <ReplayControl seconds={5} order={2.1} />
                <ReplayControl seconds={10} order={2.2} />
                <ReplayControl seconds={30} order={2.3} />
              </ControlBar>
            </Player>
            {/* <video controls preload="metadata">
              <source src={video} type="video/mp4"></source>
            <track label="English" kind="subtitles" srcLang="en" src="../../tmp/Forrest Gump
            (1994)/Forrest.Gump.1994.720p.BrRip.x264.YIFY.srt.srt" default></track>
            </video> */}
          )
          </div>
          <div id="movie_infos">
            <div className="mini_info">
              <img
                src={movie && (movie.medium_cover_image || pirate)}
                alt={movie && movie.title}
              />
            </div>
            {api === 'yts' && (
              <div className="infos">
                <div id="infos_title">{movie && movie.title_english}</div>
                <div id="rty_infos">
                  Rating:
                  {movie && movie.rating}
                  /10
                  Time:
                  {movie && movie.runtime}
                  min
                  Year:
                  {movie && movie.year}
                </div>
                <div id="synopsys_title">
                  Synopsys
                  {movie && movie.title_english}
                </div>
                <div id="synopsys">
                  {movie && movie.description_full}
                </div>
              </div>
            )}
          </div>
          {api === 'yts' && (
            <div id="more_infos">
              <div id="genre">
                <span id="span_genre">Genre: </span>
                {movie && movie.genres.map(genre => (
                  <span key={genre}>
                    {genre}
                  </span>
                ))
                }
              </div>
              <div id="cast_div">
                {/* Cast: */}
                {/* <br /> */}
                {movie && movie.cast > 0 && movie.cast.map(genre => (
                  <span className="cast_name" key={genre}>
                    <img src={personIcon} className="person_icon" alt="person_icon" />
                    {genre.name}
                    <br />
                  </span>
                ))}
              </div>
              <div id="trailer_button">
                <a href={trailer} target="_blank" rel="noopener noreferrer">
                  <button type="button">
                    <img src={playButton} id="play_button" alt="play_button" />
                    REGARDER LA BANDE ANNONCE
                  </button>
                </a>
              </div>
              <div>
                <iframe
                  width="560"
                  height="315"
                  src={trailer}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="auto"
                />
              </div>
              <p id="title_suggestions">Films associés</p>
              <div className="suggestions_div">
                {related && related.map(suggestion => (
                  <Link key={suggestion.id} to={`/movie/${api}/${suggestion.id}`}>
                    <div
                      className="suggestion_movie"
                    >
                      <img
                        src={suggestion.medium_cover_image}
                        alt={suggestion.title}
                      />
                      <p className="title_movie_suggested">{suggestion.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div id="form_div">
            <p id="title_comment">Leave a comment</p>
            <InputTextArea onChange={this.handleChangeComment} value={comment} name="comment" label="comment" id="comment" />
            <SendButton onClick={this.putComment} bootstrapButtonType="btn btn-warning" value="Envoyer" />
            <h3 id="title_comment">Comment :</h3>
            {allComments.comment && allComments.comment.map(avis => (
              <div key={avis.id} id="all_comment">
                <h4 key={avis.id}>
                  {avis.login}
                  :
                </h4>
                {avis.comment}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

MovieStream.propTypes = {
  api: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

const MovieConnected = connect(mapStateToProps, mapDispatchToProps)(MovieStream);

const exportedComponent = (props) => {
  const { match: { params: { value } } } = props;
  return (<MovieConnected key={value} {...props} />);
};

export default exportedComponent;
