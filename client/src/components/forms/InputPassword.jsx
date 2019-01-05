import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputPassword extends Component {
    static propTypes = {
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      id: PropTypes.string.isRequired,
    }

    static defaultProps = {
      placeholder: undefined,
    }

    constructor(props) {
      super(props);
      this.state = {
        value: '',
        confirmValue: '',
      };
    }

    handleChange = (e) => {
      const regUp = /[A-Z]+/;
      const regLow = /[a-z]+/;
      const regNumber = /[0-9]+/;
      var password = e.target.value;
      var errorPass = document.getElementById('errorPass');
      if (password.search(regUp) !== -1 && password.search(regLow) !== -1 && password.search(regNumber) !== -1 && password.length > 5) {
        errorPass.style.display = 'none';
        e.target.style.color = 'green';
      } else {
        errorPass.style.display = 'block';
        errorPass.style.color = 'red';
        e.target.style.color = 'red';
      }

      this.setState({ value: e.target.value });
    }

    handleChangeConfirm = (e) => {
      var errorPassConfirm = document.getElementById('errorPassConfirm');
      this.setState({ confirmValue: e.target.value });
      if (this.state.value === e.target.value) {
        e.target.style.color = 'green';
        errorPassConfirm.style.display = 'none';
      } else {
        errorPassConfirm.style.display = 'block';
        e.target.style.color = 'red';
      }
    }

    checked = (e) => {
      var errorPass = document.getElementById('errorPass');
      var errorPassConfirm = document.getElementById('errorPassConfirm');
      errorPass.style.display = 'none';
      errorPassConfirm.style.display = 'none';
    }

    render() {
      const { label, name, id, placeholder } = this.props;
      return (
        <div>
          <div className="form-group">
            <label htmlFor={label}>
              {label}
            </label>
            <input
              type="password"
              placeholder={placeholder}
              name={name}
              id={id}
              className="form-control"
              onChange={this.handleChange}
              onBlur={this.checked}
              value={this.state.value}
              required
            />
            <p id="errorPass">Votre mot de passe doit contenir au moins une minuscule, une majuscule, un nombre, et contenir minimum 5 caractères</p>
          </div>
          <div className="form-group">
            <label htmlFor="PasswordConfirm">
              PasswordConfirm
            </label>
            <input
              type="password"
              name="passwordConfirm"
              id="PasswordConfirm"
              className="form-control"
              onChange={this.handleChangeConfirm}
              onBlur={this.checked}
              value={this.state.confirmValue}
              required
              placeholder={placeholder}
            />
            <p id="errorPassConfirm">Les mots de passes ne sont pas identiques</p>
          </div>
        </div>
      );
    }
}

export default InputPassword;
