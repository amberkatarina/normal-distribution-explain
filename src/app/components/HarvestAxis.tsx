import React from 'react';
import PropTypes from 'prop-types';

import {motion} from 'framer-motion';


const pathVariants = {
	hidden: {pathLength: 0},
	show: {pathLength: 1}
}
const axisVariants = {
	hidden: {opacity: 0},
	show: {
		opacity: 1,
		transition: {
			delayChildren: 1,
		}
	},
}

interface HarvestAxixProps {
	page: number,
}

const HarvestAxix = ({page}: HarvestAxixProps) => (
	<motion.div 
		className="axis"
		initial={'hidden'}
		animate={page === 1 ? 'firstPage': 'show'}
		variants={axisVariants}
	>
		<svg width="652" height="12" viewBox="0 0 652 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<motion.path 
				d="M1 6H650.9L645.574 1L651 6L645.574 11" 
				stroke="#1F1F1F" 
				strokeWidth="2" 
				strokeLinecap="round" 
				strokeLinejoin="round"
				initial={'hidden'}
				animate={page === 1 ? 'hidden': 'show'}
				variants={pathVariants}
				/>
		</svg>
		<span className="axis-caption">
			Урожайность
		</span>
	</motion.div>
);

HarvestAxix.propTypes = {
	page: PropTypes.number.isRequired,
}

export default HarvestAxix;