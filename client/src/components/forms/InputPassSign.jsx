import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputPassword extends Component {
    static propTypes = {
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      required: PropTypes.bool,
      value: PropTypes.string,
    }

    static defaultProps = {
      required: true,
      value: undefined,
    }

    render() {
      const {
        label, name, id, required, value,
      } = this.props;
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
            value={value}
            required={required}
          />
        </div>
      );
    }
}

export default InputPassword;
