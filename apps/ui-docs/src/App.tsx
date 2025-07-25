import { Button } from 'polpo/components';
import { useState } from 'react';

import reactLogo from './assets/react.svg';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <main className='grid place-content-center min-h-screen p-24 gap-4'>
      <div className='flex gap-4'>
        <a href='https://vite.dev' target='_blank' rel='noopener'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noopener'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1 className='text-2xl text-center text-nowrap'>Hello world, welcome to monorepo</h1>

      <Button onClick={() => setCount(count => count + 1)}>Count is {count}</Button>
    </main>
  );
};

export default App;
