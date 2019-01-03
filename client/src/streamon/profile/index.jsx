import React, { Component } from 'react';
import './index.css';
import InputText from '../../components/forms/InputText';
import InputEmail from '../../components/forms/InputEmail';
import InputPassword from '../../components/forms/InputPassword';
import InputFile from '../../components/forms/InputFile';
import SendButton from '../../components/forms/SendButton';

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      mail: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      image: '',
      loadingBtn: false
    }
  }

  render() {
    return (
      <div className="page">
        <h1>Pourquoi pas mettre une bannière menu ici</h1>
        <div className="middle">
          <div className="your_profile">
            <h2>Ton profil</h2>
            <form onSubmit={""}>
              <InputFile label="Nouvelle photo de profil" name="photo" id="photo" />
              <div className="form_div">
                <InputText placeholder="tutu" label="Nouveau prenom" name="prenom" id="Prenom" />
                <InputText label="Nouveau nom" name="nom" id="Nom" />
              </div>
              <div className="form_div">
                <InputText label="Nouveau login" name="login" id="Login" />
                <InputEmail label="Nouvel email" name="email" id="Email" />
              </div>
              <div className="form_div">
                <InputPassword label="Nouveau password" name="password" id="Password" />
              </div>
              <div className="form_div">
                <SendButton bootstrapButtonType="btn btn-warning" value="Valider" />
              </div>
              <p id="flash" />
            </form>
          </div>
          <div className="other">
            <h2>Autres profils</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
