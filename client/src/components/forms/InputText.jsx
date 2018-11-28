import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputText extends Component {
    static propTypes = {
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }
    constructor(props) {
      super(props)
      this.state = { value: '' }
    }

    handleChange = (e) => {
      // e.target.style.color = 'green';
      this.setState({ value: e.target.value });
    }
  
    // checked = (e) => {
    //   e.target.style.color = "rgb(224, 224, 224)";
    // }
  
    render() {
      const { label, name, id } = this.props;
      return (
        <div className="form-group">
          <label htmlFor={label}>
            {label}
          </label>
          <input
            type="text"
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

  export default InputText;