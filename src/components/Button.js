import React from 'react';
import PropTypes from 'prop-types';

const Button = ({kind, children, onClick}) => (
	<button className={`button-${kind}`} onClick={onClick}>
		{children}
	</button>
);

Button.propTypes = {
	kind: PropTypes.oneOf(['primary', 'reset']),
  children: PropTypes.element.isRequired,
	onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  kind: 'primary',
};

export default Button;