import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Player, BigPlayButton,
} from 'video-react';
import './index.css';
import '../../../node_modules/video-react/dist/video-react.css';
import Header from '../../components/header';
import personIcon from '../../img/personIcon.png';
import chargement from '../../img/chargement.jpg';
import pirate from '../../img/pirate.png';
import InputTextArea from '../../components/forms/InputTextArea';
import SendButton from '../../components/forms/SendButton';

const HYPERTUBE_ROUTE = 'localhost:3001';

function getRelatedMovies(id, api) {
  return fetch(`https://${HYPERTUBE_ROUTE}/apifetch`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ api, id }),
  })
    .then(res => res.json());
}

function getMoviesId(api, id, stream = 'oui') {
  return fetch(`https://${HYPERTUBE_ROUTE}/apifetch`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api, id, stream,
    }),
  })
    .then(res => res.json());
}

class MovieStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      related: undefined,
      trailer: '',
      comment: '',
      allComments: [],
      video: undefined,
    };
    this.putComment = this.putComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.getComment = this.getComment.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    const { match } = this.props;
    getMoviesId(match.params.api, match.params.value)
      .then((movie) => {
        if (this.mounted && match.params.api === 'yts') {
          this.setState({ movie });
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
      .then((movie) => {
        if (this.mounted && match.params.api === 'yts') {
          getRelatedMovies(match.params.value, match.params.api)
            .then(related => this.setState({ related: related.data.movies }));
        }
        return (movie);
      })
      .then((movie) => { this.getComment(movie); return (movie); });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getComment(movie) {
    const { api } = this.props;
    fetch(`https://${HYPERTUBE_ROUTE}/getcomment`, {
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
    if (this.mounted) {
      this.setState({ comment: event.target.value });
    }
  }

  putComment() {
    const { token, user } = this.props;
    const { comment, movie } = this.state;
    fetch(`https://${HYPERTUBE_ROUTE}/comment`, {
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
    const { api, match, langue } = this.props;
    const {
      movie, related, comment, allComments, trailer, video,
    } = this.state;
    if (!movie) {
      return null;
    }
    return (
      <div>
        <Header />
        <div id="main_div">
          {(video === undefined) ? (
            <div id="player_stream">
              <Player
                playsInline
                poster={movie && (movie.large_cover_image || pirate)}
                // src={test}
                fluid={false}
                width="100%"
                height={600}
              >
                <source src={`https://localhost:3001/getstream/${api}/${match.params.value}`} />
                <track label="English" kind="subtitles" srcLang="en" src={`https://localhost:3001/subtitles/${api}/${match.params.value}`} default />
                <BigPlayButton position="center" />
              </Player>
            </div>
          ) : (
            <div id="player_stream">
              <Player
                playsInline
                poster={chargement}
                // src={test}
                fluid={false}
                width="100%"
                height={600}
              >
                <source src={video} />
                <BigPlayButton position="center" />
              </Player>
            </div>
          )}
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
                  Synopsis
                  {movie && ` ${movie.title_english}`}
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
                {movie && movie.genres && movie.genres.map(genre => (
                  <span key={genre}>
                    {genre}
                  </span>
                ))
                }
              </div>
              <br />
              <h4 className="h">Casting :</h4>
              <div id="cast_div">
                {movie && movie.cast && movie.cast.map(cast => (
                  <span className="cast_name" key={cast.imdb_code}>
                    {cast.character_name}
                    :
                    <img src={cast.url_small_image || personIcon} className="person_icon" alt="person_icon" />
                    {cast.name}
                    <br />
                  </span>
                ))}
              </div>
              <div id="b">
                <h4 className="h">Trailer</h4>
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
              <p id="title_suggestions">
                {langue === 'fr' ? (
                  <p>
                    Films associés
                  </p>
                ) : (
                  <p>
                  Movies associates
                  </p>
                )}
              </p>
              <div className="suggestions_div">
                {related && related.map(suggestion => (
                  <Link key={suggestion.id} to={`/movie/${api}/${suggestion.id}`}>
                    <div
                      className="suggestion_movie"
                    >
                      <img
                        src={suggestion.medium_cover_image || pirate}
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
            <p id="title_comment">
              {langue === 'fr' ? (
                <p>
                  Laissez un commentaire
                </p>
              ) : (
                <p>
                Let a comment
                </p>
              )}
            </p>
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
  langue: PropTypes.string.isRequired,
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
