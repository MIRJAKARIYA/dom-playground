import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { submitCodeWithUpdatedDom } from './utils/evaluateDom';
import { evaluateDomChallenge } from './utils/evaluateProblemAndGiveResult';
import CodeEditor from './components/CodeEditor/CodeEditor';
import { checkSyntaxError } from './utils/checkSyntaxError';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
const initialJs = `

const buttonElem = document.getElementById("myButton")
document.querySelector(".jack").style.color = "red";

buttonElem.addEventListener('click', () => {
  const oldText = buttonElem.innerText;
  buttonElem.innerText = oldText === "ON" ? "OFF" : "ON";

});
`
const initialHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IFrame Content</title>
</head>
<body>
  <button id="myButton">ON</button>
  <h1 class="jack">my name is mir jakariya</h1>
  <script>

  </script>
</body>
</html>
`
  const [js,setJs] = useState(initialJs)

  const [html,setHtml] = useState(initialHtml)



  const [src, setSrc] = useState('');
  const iframeRef = useRef();

  const [updatedDom,setUpdatedDom] = useState({});

  useEffect(()=>{
       console.log(updatedDom)
  },[updatedDom])

  const handleSubmit = () =>{
    try{
      const isOkay = evaluateDomChallenge(updatedDom)
      if(isOkay) {
        toast.success("Congratulations.You have completed the challenge")
      }
      else{
        toast.error("Sorry You couldn't complete the challenge")
      }
    }
    catch(err){
      console.log("Error in the code",err)

    }
    finally{
      setUpdatedDom({})
      setSrc("")
      setHtml(initialHtml)
      setJs(initialJs)
    }
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


  const evaluateDom =async () => {
      //check syntax error here
      const errorMgs = checkSyntaxError(html,js)
      if(errorMgs.error){
        toast.error(errorMgs.mgs)
      }
      else{
        const doc = submitCodeWithUpdatedDom(html,js);
        setSrc(doc);
      }

  
    
  };

  const onChange = useCallback((value, viewUpdate) => {
    setJs(value)

  }, []);
  const onChangehtml = useCallback((value, viewUpdate) => {
    setHtml(value)

  }, []);

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
      <div style={{display:"flex",}}>
      <CodeEditor onChange={onChangehtml} initialCode={html}></CodeEditor>
      <CodeEditor onChange={onChange} initialCode={js}></CodeEditor>
      </div>
      <button onClick={evaluateDom}>Evaluate Dom</button>
      <button onClick={handleSubmit}>Submit Problem</button>
      <ToastContainer />
    </>


  );
}

export default App;

