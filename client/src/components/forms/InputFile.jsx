import React from 'react';
import PropTypes from 'prop-types';

const InputFile = ({
  label, name, id, style, required, onChange,
}) => (
  <div className="form-group">
    <label htmlFor={label}>
      {label}
    </label>
    <input
      onChange={onChange}
      type="file"
      name={name}
      id={id}
      style={style}
      className="form-control"
      required={required}
      accept="image/png, image/jpeg, image/jpg"
    />
  </div>
);

InputFile.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

InputFile.defaultProps = {
  label: undefined,
  name: undefined,
  id: undefined,
  style: {},
  required: true,
  onChange: undefined,
};

export default InputFile;
