import React from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FbLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: '',
    };
  }

  responseFacebook = (response) => {
    const {
      name, email, picture, userID,
    } = this.state;
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
    console.log(name);
    console.log(email);
    console.log(picture);
    console.log(userID);
  };


  render() {
    let FbContent;
    const {
      isLoggedIn, picture, name, email,
    } = this.state;
    if (isLoggedIn) {
      FbContent = (
        <div
          style={{
            width: '300px',
            height: '100px',
            backgroundColor: 'white',
          }
          }
        >
          <img src={picture} alt={name} />
          <p>
            Tu es log
            {name}
          </p>
          <p>
            Mail :
            {email}
          </p>
        </div>
      );
    } else {
      FbContent = (
        <FacebookLogin
          autoLoad
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
