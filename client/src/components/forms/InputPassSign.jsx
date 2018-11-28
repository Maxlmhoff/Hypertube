import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputPassword extends Component {
    static propTypes = {
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }
    constructor(props) {
      super(props)
      this.state = {
        value: '',
      }
    }
  
    handleChange = (e) => {
      this.setState({ value: e.target.value });
    }
  
    render() {
      const { label, name, id } = this.props;
      return (
          <div className="form-group">
            <label htmlFor={label}>
              {label}
            </label>
            <input
              type="password"
              name={name}
              id={id}
              className="form-control"
              onChange={this.handleChange}
              value={this.state.value}
              required
            >
            </input>
          </div>
      );
    }
  }
  
  export default InputPassword;