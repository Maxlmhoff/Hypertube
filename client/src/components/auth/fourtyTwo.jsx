import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const HYPERTUBE_ROUTE = 'localhost:3001';

class FourtyTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const response = queryString.parse(window.location.href);
    if (response.token) {
      dispatch({ type: 'NEW_TOKEN', value: response.token });
      this.getUser(response.token);
    }
  }

  getUser(token) {
    const { dispatch } = this.props;
    fetch(`http://${HYPERTUBE_ROUTE}/getuser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then(response => response.json())
      .then(response => dispatch({ type: 'GET_USER', value: response.user }))
      .then(response => console.log(response))
      .then(() => window.location.replace('https://localhost:3000/stream'));
  }

  render() {
    let FourtyTwoContent;
    const {
      isLogged,
    } = this.state;
    if (isLogged) {
      FourtyTwoContent = (
        <p>
          Tu es log
        </p>
      );
    } else {
      FourtyTwoContent = (
        <a href="https://api.intra.42.fr/oauth/authorize?client_id=95ef3ef0c29389c329128b8eb8213b07d2ec51fa0a39ebf2ef364d0a04e71438&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Flogin42&response_type=code">
          <button
            style={{
              width: '245px',
              height: '60px',
              backgroundColor: 'black',
              color: 'white',
              marginTop: '40px',
            }
          }
            type="button"
          >
            LOGIN WITH 42
          </button>
        </a>
      );
    }
    return (
      <div>
        {FourtyTwoContent}
      </div>
    );
  }
}

FourtyTwo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FourtyTwo);
