import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {motion, Variants} from 'framer-motion';

const MAX_HARVEST_VALUE = 180;

const tooltipVariants = {
  hidden: {
    opacity: [0, 0], 
    display: ['block','none'],
    transition: {duration: .25}
  },
  show: {
    opacity: [0, 1],
    display: ['block','block'],
    transition: {duration: .25}
  }
}

interface DotProps {
	value: number,
	variants: Variants,
	animate: string,
}

const Dot = ({value, variants, animate}: DotProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const treeLightness = (MAX_HARVEST_VALUE - value)/3 + 30;

  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  const handleMouseLeave = () => {
    setIsHovered(false);
  }
  return(
    <motion.div 
      className={`dot ${isHovered ? 'top' : ''}`} 
      style={{backgroundColor: `hsl(110deg 55% ${treeLightness}%)`}}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      variants={variants}
      animate={animate}
      initial='fistPage'
    >
      <motion.div 
        className={`dot-tooltip`}
        initial='hidden'
        animate={isHovered ? 'show': 'hidden'}
        variants={tooltipVariants}
      >
        {`${value.toFixed(2)} кг`}
      </motion.div>
    </motion.div>
  )
};

Dot.propTypes = {
	value: PropTypes.number.isRequired,
  variants: PropTypes.any.isRequired,
	animate: PropTypes.string.isRequired,
};

export default Dot;

