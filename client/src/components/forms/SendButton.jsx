import React from 'react';
import PropTypes from 'prop-types';

const SendButton = ({
  onClick, bootstrapButtonType, value,
}) => (
  <button onClick={onClick} type="submit" className={bootstrapButtonType} id="submitButton">
    {value}
  </button>
);

SendButton.propTypes = {
  onClick: PropTypes.func,
  bootstrapButtonType: PropTypes.string,
  value: PropTypes.string,

};

SendButton.defaultProps = {
  onClick: undefined,
  bootstrapButtonType: undefined,
  value: undefined,
};

export default SendButton;
