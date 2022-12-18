import React, { useState, memo } from 'react';

// import './styles/App.css';
import Button from './components/Button';
import ResetIcon from './components/ResetIcon';
import Wrapper from './components/Wrapper';

const App = () => {
  const pageCount = 2;
  const minValue = 120;
  const maxValue = 180;
  const mean = 150;
  const standardDeviation = 10;
  const treesNumber = 576;
  const [page, setPage] = useState(1);
  
  const handleNext = () => setPage(currentPage => currentPage + 1);
  const handleReset = () => setPage(1);
  
  const getNormalValueByMullerMethod = () => {
    const [r1, r2] = [Math.random(), Math.random()];
    return Math.sqrt(-2 * Math.log(r1))*Math.cos(2 * Math.PI * r2);
  }
  
  const getNormalValueByCentraLimitTheorem = () => {
    const V = Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random();
    return (V - 3) / Math.sqrt(1 / 2);
  }
  
  const transformValue = (val) => {
    return val*standardDeviation + mean;
  }
  
  const createAppletrees = (number) => {
    let index = 0;
    let treesArr = [];
    let value = 0;
    
    while(index < number) {
      value = transformValue(getNormalValueByMullerMethod());
      if (value < minValue) {
        value = minValue;
      } else if (value > maxValue) {
        value = maxValue;
      }
      treesArr[index] = value;
      index = index+1;
    }
    console.log(Math.max(...treesArr));
    console.log(Math.min(...treesArr));
    return treesArr;
  }
  
  const getCoordinates = (index) => {
    const colNumber = 24;
    const sectionNumber = 6;
    const col = Math.trunc(index / colNumber);
    const row = index % colNumber;
    const horCoef = 10;
    const vertCoef = 10;
    const sectionHorCoef = 20;
    const sectionVerCoef = 10;
    const xCoord = col * horCoef + Math.trunc(col / sectionNumber)*sectionHorCoef; 
    const yCoord = 300 - (row * vertCoef + Math.trunc(row / sectionNumber)*sectionVerCoef);

    return {x: xCoord, y: yCoord};
  }
  const normalDistributionFunction = (X) => {
    return 1 / (standardDeviation*Math.sqrt(2*Math.PI)) * Math.exp(-1 * Math.pow(X - mean, 2) / (2* Math.pow(standardDeviation, 2)));
  }
  const getNormalDistributionCoordinates = (value) => {
    const xCoord = (value - minValue)*10;
    const yCoord = 300 - normalDistributionFunction(value)*5000;
    return {x: xCoord, y: yCoord};
  }
  
  const appleTreesArr = createAppletrees(treesNumber);
  return (
    <Wrapper>
      <p>В яблоневом саду 576 яблонь, которые высажены квадратами 6×6 деревьев с межами между ними. У каждого дерева известна урожайность в кг с дерева. Урожайность распределена нормально от 120 до 180 кг с медианой в 150 кг и сигмой 10 кг.</p>
      <div className='illustration-wrap'>
        <div className='visualization-block'>
            {appleTreesArr.map((treeVal, index) => {
              console.log(index);
              const pageFirstCoord = getCoordinates(index);
              const pageSecondCoord = getNormalDistributionCoordinates(treeVal);
              const coord = page == 1 ? pageFirstCoord : pageSecondCoord;
              
              return (
                <Dot 
                  key={index}
                  value={treeVal} 
                  style={{
                    transform: `translate(${coord.x}px, ${coord.y}px)`,
                    backgroundColor: `hsl(110deg 55% ${(maxValue - treeVal)/3 + 30}%)`
                  }}
                />
              )
            })}
        </div>
      </div>
      <div className='pagination-wrap'>
        <span>{page} из {pageCount}</span>
        {pageCount !== page
          ? <Button onClick={handleNext}>Далее</Button>
          : <Button kind='reset' onClick={handleReset}><ResetIcon /></Button>
        }
      </div>
    </Wrapper>
  );
}


const Dot = ({value, style}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  const handleMouseLeave = () => {
    setIsHovered(false);
  }
  return(
    <div className={`dot ${isHovered ? 'top' : ''}`} style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`dot-tooltip ${isHovered ? 'shown' : ''}`}>{`${value.toFixed(2)} кг`}</div>
    </div>
  )
};

// function App() {
//   return(
  // <Wrapper>
//     <p>Это подготовительная страничка для объяснялки про нормальное распределение</p>
//   );
//  </Wrapper>
// }

export default App;