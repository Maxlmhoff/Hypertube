import React, { Component } from 'react';
import PropTypes from 'prop-types';


class InputEmail extends Component {
    static propTypes = {
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      onChange: PropTypes.func,
      value: PropTypes.string,
    }

  static defaultProps = {
    placeholder: undefined,
    required: true,
    onChange: undefined,
    value: undefined,
  }

  handleChange = (e) => {
    const { onChange = () => {} } = this.props;
    const regMail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    if (e.target.value.search(regMail) !== -1) {
      e.target.style.color = 'green';
    } else {
      e.target.style.color = 'red';
    }
    onChange(e);
  }

  checked = (e) => {
    e.target.style.color = 'rgb(224, 224, 224)';
  }

  render() {
    const {
      label, name, id, placeholder, required, value,
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={label}>
          {label}
        </label>
        <input
          type="email"
          name={name}
          placeholder={placeholder}
          id={id}
          className="form-control"
          onChange={this.handleChange}
          onBlur={this.checked}
          value={value}
          required={required}
        />
      </div>
    );
  }
}

export default InputEmail;
