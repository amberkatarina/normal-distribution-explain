import React from 'react';
import PropTypes from 'prop-types';


interface ButtonProps {
	kind?: 'primary' | 'reset',
	children: React.ReactNode,
	onClick: (e: React.MouseEvent) => void,
}

const Button = ({kind, children, onClick}: ButtonProps) => (
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