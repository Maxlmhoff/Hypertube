import React from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

const HYPERTUBE_ROUTE = 'localhost:3001';

class FbLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      name: '',
      picture: '',
      token: '',
    };
  }

  responseFacebook = (response) => {
    console.log('composant fb');
    console.log(response);
    this.setState({
      isLoggedIn: true,
      name: response.name,
      picture: response.picture.data.url,
      token: response.accessToken,
    });
    this.sendToken(this.state.token);
  };

  sendToken(token) {
    const { dispatch } = this.props;
    fetch(`http://${HYPERTUBE_ROUTE}/loginFb`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(res => dispatch({ type: 'NEW_TOKEN', value: res.token }));
  }

  render() {
    let FbContent;
    const {
      isLoggedIn, picture, name,
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
          onClick={this.componentClicked}
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

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FbLogin);
