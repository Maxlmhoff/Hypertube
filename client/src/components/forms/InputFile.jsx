import React from 'react';


const InputFile = ({ label, name, id, style }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={id}
        style={style}
        className="form-control"
        required
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
  );
};

export default InputFile;
