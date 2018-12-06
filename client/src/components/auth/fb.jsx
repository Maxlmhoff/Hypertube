import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FbLogin extends React.Component {
  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <FacebookLogin
        appId="355821668516129"
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
    );
  }
}

export default FbLogin;
