import React, {useState} from 'react';
import {motion} from 'framer-motion';

const MAX_HARVEST_VALUE = 180;

const tooltipVariants = {
  hidden: {
    opacity: 0, 
    display: 'none'
  },
  show: {
    opacity: 1,
    display: 'block',
    transition: {
      duration: .4
    }
  }
}

const Dot = ({value, variants, animate}) => {
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
      initial={{...variants.fistPage}}
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

export default Dot;

