import React, { useState, memo } from 'react';

// import './styles/App.css';
import Button from './components/Button';
import ResetIcon from './components/ResetIcon';
import Wrapper from './components/Wrapper';

const App = () => {
  const [page, setPage] = useState(1);
  const pageCount = 2;

  const handleNext = () => setPage(currentPage => currentPage + 1);
  const handleReset = () => setPage(1);

  return (
    <Wrapper>
      <p>В яблоневом саду 576 яблонь, которые высажены квадратами 6×6 деревьев с межами между ними. У каждого дерева известна урожайность в кг с дерева. Урожайность распределена нормально от 120 до 180 кг с медианой в 150 кг и сигмой 10 кг.</p>
      <div className='illustration-wrap'>
        {page == 1 &&
          <div>Иллюстрация 1</div>}
        {page == 2 &&
          <div>Иллюстрация 2</div>}
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


const Wrap = ({children}) => (
  <div className='explanation-wrap'>
    {children}
  </div>
);

// function App() {
//   return(
  // <Wrapper>
//     <p>Это подготовительная страничка для объяснялки про нормальное распределение</p>
//   );
//  </Wrapper>
// }

export default App;