import React, { useState } from 'react';

import Button from './components/Button';
import ResetIcon from './components/ResetIcon';
import HarvestAxix from './components/HarvestAxis';
import Dot from './components/Dot';
import { Variants } from 'framer-motion';

const TREES_NUMBER = 576;
const MIN_HARVEST_VALUE = 120;
const MAX_HARVEST_VALUE = 180;
const MEAN = 150;
const SIGMA = 10;

const PAGE_NUMBER = 2;

interface Coordinate {
	x: number,
	y: number,
}

// NORMAL DISTRIBUTION

const getNormalValueByMullerMethod = (): number => {
	const [r1, r2] = [Math.random(), Math.random()];
	return Math.sqrt(-2 * Math.log(r1))*Math.cos(2 * Math.PI * r2);
}

// const getNormalValueByCentraLimitTheorem = () => {
//	 const V = Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random();
//	 return (V - 3) / Math.sqrt(1 / 2);
// }

const transformNormalValue= (val: number): number	=> {
	return val*SIGMA + MEAN;
}

const normalDistributionFunction = (X: number): number => {
	return 1 / (SIGMA*Math.sqrt(2*Math.PI)) * Math.exp(-1 * Math.pow(X - MEAN, 2) / (2* Math.pow(SIGMA, 2)));
}


// CREATE OR GET DATA

const createAppletreesArr = (): number[] => {
	let index = 0;
	let treesArr = [];
	let value = 0;
		
	while(index < TREES_NUMBER) {
		value = transformNormalValue(getNormalValueByMullerMethod());
		if (value < MIN_HARVEST_VALUE) {
			value = MIN_HARVEST_VALUE;
		} else if (value > MAX_HARVEST_VALUE) {
			value = MAX_HARVEST_VALUE;
		}
		treesArr.push(value);
		index = index+1;
	}
	return treesArr;
}

const getAppletreesArr = (): number[] => {
	const savedTrees = localStorage.getItem("treesArr");
	let initialTreesArr = [];
	if (savedTrees) {
		initialTreesArr = JSON.parse(savedTrees);
	} else {
		initialTreesArr = createAppletreesArr();
		localStorage.setItem("treesArr", JSON.stringify(initialTreesArr));
	}
	return initialTreesArr;
}
const treesArr = getAppletreesArr();




// APP COMPONENT

const App = () => {
	const [page, setPage] = useState(1);

	const handleNext = () => setPage(currentPage => currentPage + 1);
	const handleReset = () => setPage(1);

	const getOrderedCoordinates = (index: number): Coordinate => {
		const colNumber = 24;
		const sectionNumber = 6;
		const col = Math.trunc(index / colNumber);
		const row = index % colNumber;
		const horCoef = 11;
		const vertCoef = 11;
		const sectionHorCoef = 20;
		const sectionVerCoef = 10;

		const xCoord = col * horCoef + Math.trunc(col / sectionNumber)*sectionHorCoef + 175; 
		const yCoord = 310 - (row * vertCoef + Math.trunc(row / sectionNumber)*sectionVerCoef);

		return {x: xCoord, y: yCoord};
	}

	const getNormalDistributionCoordinates = (value: number): Coordinate => {
		const xCoord = (value - MIN_HARVEST_VALUE)*10.5;
		const yCoord = 300 - normalDistributionFunction(value)*5000;
		return {x: xCoord, y: yCoord};
	}

	const getDotPagesVariants = (treeVal: number, treeIndex: number) : Variants => {
			const pageFirstCoord = getOrderedCoordinates(treeIndex);
			const pageSecondCoord = getNormalDistributionCoordinates(treeVal);
		
			return {
				fistPage: {
					transform: `translate(${pageFirstCoord.x}px, ${pageFirstCoord.y}px)`, 
					transition: {duration: 0.5}
				},
				secondPage: {
					transform: `translate(${pageSecondCoord.x}px, ${pageSecondCoord.y}px)`, 
					transition: {duration: 0.5}
				},
			}
	}

	return (
		<div className="explanation-wrap">
			<p>В яблоневом саду 576 яблонь, которые высажены квадратами 6×6 деревьев с межами между ними. У каждого дерева известна урожайность в кг с дерева. Урожайность распределена нормально от 120 до 180 кг с медианой в 150 кг и сигмой 10 кг.</p>
			<div className='illustration-wrap'>
				<div className='visualization-block'>
					<HarvestAxix page={page} />
					<div>
						{treesArr.map((treeVal, index) => 
							<Dot 
								key={index}
								value={treeVal} 
								animate={page === 1 ? "fistPage" : "secondPage"}
								variants={getDotPagesVariants(treeVal, index)}
							/>
						)}
					</div>
				</div>
			</div>
			<div className='pagination-wrap'>
				<span>{page} из {PAGE_NUMBER}</span>
				{PAGE_NUMBER !== page
					? <Button onClick={handleNext}>
							<span>Далее</span>
						</Button>
					: <Button kind='reset' onClick={handleReset}>
							<ResetIcon />
						</Button>
				}
			</div>
		</div>
	);
}

export default App;