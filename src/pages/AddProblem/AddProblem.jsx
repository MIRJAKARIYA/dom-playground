import React, { useCallback, useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor/CodeEditor";

const AddProblem = () => {
  const [problem, setProblem] = useState({
    challenge_name:"",
    initial_html:"",

    test_cases:[],
  });

  const [html,setHtml] = useState("")
  const [js,setJs] = useState("")


  const onChangeJs = useCallback((value, viewUpdate) => {
    setJs(value);
  }, []);
  const onChangehtml = useCallback((value, viewUpdate) => {
    setHtml(value);
  }, []);

  useEffect(()=>{
    console.log(html,js)
  },[html,js])

  const handleSubmit = (e) => {};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          challenge Name: <input type="text" />
        </div>
        <div>
          challenge Name: <input type="text" />
        </div>
        <div>
            Initial Html 
            
            <CodeEditor onChange={onChangehtml}></CodeEditor>
        </div>
        <div>
            Initial Js 
            <CodeEditor onChange={onChangeJs}></CodeEditor>
        </div>
      </form>
    </div>
  );
};

export default AddProblem;
