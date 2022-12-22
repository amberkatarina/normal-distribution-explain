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

const HarvestAxix = ({page}) => (
	<motion.div 
		class="axis"
		initial={'hidden'}
		animate={page == 1 ? 'firstPage': 'show'}
		variants={axisVariants}
	>
		<svg width="652" height="12" viewBox="0 0 652 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<motion.path 
				d="M1 6H651M651 6L645.574 11M651 6L645.574 1" 
				stroke="#1F1F1F" 
				strokeWidth="2" 
				strokeLinecap="round" 
				strokeLinejoin="round"
				initial={'hidden'}
				animate={page == 1 ? 'hidden': 'show'}
				variants={pathVariants}
				/>
		</svg>
		<span class="axis-caption">
			Урожайность
		</span>
	</motion.div>
);

export default HarvestAxix;