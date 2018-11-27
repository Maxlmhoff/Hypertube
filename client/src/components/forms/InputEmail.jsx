import React, { Component } from 'react';
import PropTypes from 'prop-types';


class InputEmail extends Component {
    static propTypes = {
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }
    constructor(props) {
      super(props)
      this.state = { value: '' }
    }
  
    handleChange = (e) => {
      const regMail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
      if (e.target.value.search(regMail) !== -1)
        e.target.style.color = 'green';
      else
        e.target.style.color = 'red';
      this.setState({ value: e.target.value });
    }
  
    checked = (e) => {
      e.target.style.color = "rgb(224, 224, 224)";
    }
  
    render() {
      const { label, name, id } = this.props;
      return (
        <div className="form-group">
          <label htmlFor={label}>
            {label}
          </label>
          <input
            type="email"
            name={name}
            id={id}
            className="form-control"
            onChange={this.handleChange}
            onBlur={this.checked}
            value={this.state.value}
            required
          >
          </input>
        </div>
      );
    }
  }

  export default InputEmail;