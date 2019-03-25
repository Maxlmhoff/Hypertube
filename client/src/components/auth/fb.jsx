import React from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';

const HYPERTUBE_ROUTE = 'localhost:3001';

class FbLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      name: '',
      picture: '',
      token: '',
      id: '',
    };
    this.getUser = this.getUser.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.sendToken = this.sendToken.bind(this);
  }

  getUser(token) {
    const { dispatch } = this.props;
    fetch(`https://${HYPERTUBE_ROUTE}/getuser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then(response => response.json())
      .then(response => dispatch({ type: 'GET_USER', value: response.user }));
  }

  responseFacebook = (response) => {
    this.setState({
      token: response.accessToken,
    });
    const { token } = this.state;
    this.sendToken(token);
  };

  sendToken(token) {
    const { dispatch } = this.props;
    fetch(`https://${HYPERTUBE_ROUTE}/loginFb`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then((res) => {
        dispatch({ type: 'NEW_TOKEN', value: res.token });
        this.getUser(res.token);
      });
  }

  render() {
    let FbContent;
    const {
      isLoggedIn, picture, name, id,
    } = this.state;
    if (isLoggedIn) {
      FbContent = (
        <div
          style={{
            width: '300px',
            height: '200px',
            backgroundColor: 'white',
          }
          }
        >
          <img src={picture} alt={name} />
          {id}
          <p>
            Tu es log
          </p>
        </div>
      );
    } else {
      FbContent = (
        <FacebookLogin
          // autoLoad
          appId="355821668516129"
          fields="name,email,picture"
          callback={this.responseFacebook}
        />);
    }
    return (
      <div>
        {FbContent}
      </div>
    );
  }
}

FbLogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FbLogin);
