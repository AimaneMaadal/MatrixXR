import { Player } from '@lottiefiles/react-lottie-player';
import { useFrame } from '@react-three/fiber';
import { useState, useEffect } from 'react';

const App = () => {
  const [loadingText, setLoadingText] = useState('loading');
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(dots => (dots + 1) % 4);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoadingText('loading' + '.'.repeat(dots));
  }, [dots]);

  return (
    <div className='container'>
      <p className='loading'>{loadingText}</p>
    </div>
  )
}

export default App
