import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// const HYPERTUBE_ROUTE = 'localhost:3001';

class FourtyTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      name: '',
      picture: '',
      token: '',
    };
    // this.getUser = this.getUser.bind(this);
    // this.responseFacebook = this.responseFacebook.bind(this);
    // this.sendToken = this.sendToken.bind(this);
  }

  // getUser(token) {
  //   const { dispatch } = this.props;
  //   fetch(`http://${HYPERTUBE_ROUTE}/getuser`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ token }),
  //   })
  //     .then(response => response.json())
  //     .then(response => dispatch({ type: 'GET_USER', value: response.user }));
  // }

  // responseFacebook = (response) => {
  //   this.setState({
  //     isLoggedIn: true,
  //     name: response.name,
  //     picture: response.picture.data.url,
  //     token: response.accessToken,
  //   });
  //   const { token } = this.state;
  //   this.sendToken(token);
  // };

  // sendToken(token) {
  //   const { dispatch } = this.props;
  //   fetch(`http://${HYPERTUBE_ROUTE}/loginFb`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ token }),
  //   })
  //     .then(res => res.json())
  //     .then((res) => {
  //       dispatch({ type: 'NEW_TOKEN', value: res.token });
  //       this.getUser(res.token);
  //     });
  // }

  render() {
    let FourtyTwoContent;
    const {
      isLoggedIn, picture, name,
    } = this.state;
    if (isLoggedIn) {
      FourtyTwoContent = (
        <div
          style={{
            width: '300px',
            height: '200px',
            backgroundColor: 'white',
          }
          }
        >
          <img src={picture} alt={name} />
          <p>
            Tu es log
          </p>
        </div>
      );
    } else {
      FourtyTwoContent = (
        <button
        style={{
          width: '245px',
          height: '60px',
          backgroundColor: 'black',
          color: 'white',
          marginTop: '40px',
        }
        }
          // callback={this.responseFacebook}
        >
          LOGIN WITH 42
        </button>);
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
