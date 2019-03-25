import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputText from '../../components/forms/InputText';
import InputEmail from '../../components/forms/InputEmail';
import InputPassword from '../../components/forms/InputPassword';
import InputFile from '../../components/forms/InputFile';
import SendButton from '../../components/forms/SendButton';
import Header from '../../components/header';

const HYPERTUBE_ROUTE = 'localhost:3001';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeFistname = this.handleChangeFistname.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    const { token, langue } = this.props;
    this.state = {
      login: '',
      email: '',
      firstname: '',
      name: '',
      password: '',
      error: false,
      message: '',
      lang: langue,
    };
    this.getUser(token);
    this.getAllUser();
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

  getAllUser() {
    const { dispatch } = this.props;
    fetch(`https://${HYPERTUBE_ROUTE}/getallusers`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => dispatch({ type: 'ALL_USERS', value: response.user }));
  }

  handleSubmit() {
    const { token, dispatch } = this.props;
    const { lang } = this.state;
    const data = new FormData();
    if (lang === 'en') {
      dispatch({ type: 'EN', value: 'en' });
    } else {
      dispatch({ type: 'FR', value: 'fr' });
    }
    Object.entries(this.state).map(([key, value]) => {
      data.append(key, value);
      return ({ key, value });
    });
    fetch(`https://${HYPERTUBE_ROUTE}/modify`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: token,
      },
    })
      .then(response => response.json())
      .then((response) => {
        if (response.error) {
          this.setState({ error: true, message: response.error });
        } else {
          this.setState({ error: false, message: response.success });
        }
      })
      // .then(response => console.log(response.error))
      .then(() => this.getUser(token))
      .then(() => this.getAllUser());
  }

  handleChangeRadio(value) {
    this.setState({ lang: value.target.value });
  }

  handleChangeFile(event) {
    this.setState({ photo: event.target.files[0] });
  }

  handleChangeLogin(event) {
    this.setState({ login: event.target.value });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeFistname(event) {
    this.setState({ firstname: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    const { user, allUsers, langue } = this.props;
    const {
      login, name, firstname, email, error, message, lang,
    } = this.state;
    return (
      <div className="page">
        <Header />
        <div className="middle">
          <div className="your_profile">
            <div className="photo_div">
              <label htmlFor="photo">
                <img src={`${user.img}`} alt="Profil" className="profile_picture" />
                <InputFile onChange={this.handleChangeFile} required={false} style={{ display: 'none' }} name="photo" label="" id="photo" />
              </label>
            </div>
            <div className="big_form_div">
              <div className="form_div">
                <InputText value={firstname} onChange={this.handleChangeFistname} required={false} placeholder={user.firstname} label={langue === 'fr' ? 'Prenom' : 'Firstname'} name="prenom" id="Prenom" />
                <InputText value={name} onChange={this.handleChangeName} required={false} placeholder={user.name} label={langue === 'fr' ? 'Nom' : 'Name'} name="nom" id="Nom" />
                <InputText value={login} onChange={this.handleChangeLogin} required={false} placeholder={user.login} label="Login" name="login" id="Login" />
              </div>
              <div className="form_div">
                <InputEmail value={email} onChange={this.handleChangeEmail} required={false} placeholder={user.email} label="Email" name="email" id="Email" />
                <InputPassword onChange={this.handleChangePassword} required={false} placeholder="********" label={langue === 'fr' ? 'Mot de passe' : 'Password'} name="password" id="Password" />
              </div>
            </div>
            <div id="fdp">
              <div className="radio2">
                <input type="radio" value="en" checked={lang === 'en'} onChange={this.handleChangeRadio} />
                <p>English</p>
              </div>
              <div className="radio2">
                <input type="radio" value="fr" checked={lang === 'fr'} onChange={this.handleChangeRadio} />
                <p>Français</p>
              </div>
            </div>
            <div className="form_div">
              <SendButton onClick={this.handleSubmit} bootstrapButtonType="btn btn-warning" value={langue === 'fr' ? 'Modifier' : 'Modify'} />
              <p id="flash" className={error ? 'error' : 'success'}>
                {message}
              </p>
            </div>
          </div>
          <div className="other">
            {langue === 'fr' ? (
              <h2>
                Tous les profils
              </h2>
            ) : (
              <h2>
                All profiles
              </h2>
            )}
            <div className="all_profiles">
              {
                Object.values(allUsers).map(elem => (
                  <div key={elem.login} className="one_profile">
                    <img src={`${elem.img}`} alt="Profil" className="profile_picture" />
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

Profile.propTypes = {
  token: PropTypes.string.isRequired,
  langue: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  allUsers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
