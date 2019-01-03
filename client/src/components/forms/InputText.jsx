import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputText extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    placeholder: undefined,
  }

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = (e) => {
    // e.target.style.color = 'green';
    this.setState({ value: e.target.value });
  }

  // checked = (e) => {
  //   e.target.style.color = "rgb(224, 224, 224)";
  // }

  render() {
    const {
      label, name, id, placeholder,
    } = this.props;
    const { value } = this.state;
    return (
      <div className="form-group">
        <label htmlFor={label}>
          {label}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          id={id}
          className="form-control"
          onChange={this.handleChange}
          value={value}
          required
        />
      </div>
    );
  }
}

export default InputText;
