import { useEffect, useRef, useState } from 'react';
import './App.css';
import { submitCodeWithUpdatedDom } from './utils/evaluateDom';
import { evaluateDomChallenge } from './utils/evaluateProblemAndGiveResult';

function App() {
  const [src, setSrc] = useState('');
  const iframeRef = useRef();

  const [updatedDom,setUpdatedDom] = useState({});

  useEffect(()=>{
       console.dir(updatedDom)
  },[updatedDom])

  const handleSubmit = () =>{
    evaluateDomChallenge(updatedDom)
  }

  useEffect(() => {
    // Add event listener for receiving messages from the iframe
    const handleMessage = (event) => {
      // event.data contains the innerHTML sent from the iframe
      console.dir(event.source.document);
      setUpdatedDom(event.source.document)
    };

    // Attach the event listener
    window.addEventListener('message', handleMessage);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);


  const evaluateDom = () => {
    const doc = submitCodeWithUpdatedDom(); // Replace this with your actual logic
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
      <button onClick={handleSubmit}>Submit Problem</button>
    </>
  );
}

export default App;

