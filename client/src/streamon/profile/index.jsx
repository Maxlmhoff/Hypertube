import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import InputText from '../../components/forms/InputText';
import InputEmail from '../../components/forms/InputEmail';
import InputPassword from '../../components/forms/InputPassword';
import InputFile from '../../components/forms/InputFile';
import SendButton from '../../components/forms/SendButton';

const HYPERTUBE_ROUTE = 'localhost:3001';

class Profile extends Component {
  constructor(props) {
    super(props);
    const { token } = this.props;
    this.state = {
      username: '',
      mail: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      image: '',
      loadingBtn: false,
      allUser: {},
    };
    this.getUser(token);
    this.getAllUser();
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
      .then(response => dispatch({ type: 'GET_USER', value: response.user }));
  }

  getAllUser() {
    const { dispatch } = this.props;
    fetch(`http://${HYPERTUBE_ROUTE}/getallusers`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => dispatch({ type: 'ALL_USERS', value: response.user }));
  }

  render() {
    const { user, allUsers } = this.props;
    return (
      <div className="page">
        <h1>Pourquoi pas mettre une bannière menu ici</h1>
        <div className="middle">
          <div className="your_profile">
            <form onSubmit={this.handleSubmit}>
              <div className="photo_div">
                <label htmlFor="photo">
                  <img src={`http://localhost:3001/img/${user.img}`} alt="Profil" className="profile_picture" />
                  <InputFile style={{ display: 'none' }} name="photo" label="" id="photo" />
                </label>
              </div>
              <div className="big_form_div">
                <div className="form_div">
                  <InputText placeholder={user.firstname} label="Prenom" name="prenom" id="Prenom" />
                  <InputText placeholder={user.name} label="Nom" name="nom" id="Nom" />
                  <InputText placeholder={user.login} label="Login" name="login" id="Login" />
                </div>
                <div className="form_div">
                  <InputEmail placeholder={user.email} label="Email" name="email" id="Email" />
                  <InputPassword placeholder="********" label="Password" name="password" id="Password" />
                </div>
              </div>
              <div className="form_div">
                <SendButton bootstrapButtonType="btn btn-warning" value="Modifier" />
              </div>
              <p id="flash" />
            </form>
          </div>
          <div className="other">
            <h2>Tous les profils</h2>
            <div className="all_profiles">
              {
                Object.values(allUsers).map(elem => (
                  <div key={elem.login} className="one_profile">
                    <img src={`http://localhost:3001/img/${elem.img}`} alt="Profil" className="profile_picture" />
                    <div className="info_all">
                      <p>{elem.firstname}</p>
                      <p>{elem.name}</p>
                      <p>{elem.login}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
