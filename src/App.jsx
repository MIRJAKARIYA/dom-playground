import { useEffect, useRef, useState } from 'react';
import './App.css';
import { evaluateDomFunctionality } from './utils/evaluateDom';

function App() {
  const [src, setSrc] = useState('');
  const iframeRef = useRef();

  useEffect(() => {
    // Add event listener for receiving messages from the iframe
    const handleMessage = (event) => {
      // event.data contains the innerHTML sent from the iframe
      console.dir(event.source.document);
    };

    // Attach the event listener
    window.addEventListener('message', handleMessage);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);


  const evaluateDom = () => {
    const doc = evaluateDomFunctionality(); // Replace this with your actual logic
    setSrc(doc);
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        srcDoc={src}
        width="600"
        height="400"
        title="Embedded Content"
        style={{ border: '2px solid red' }}
      />
      <button onClick={evaluateDom}>Evaluate Dom</button>
    </>
  );
}

export default App;

