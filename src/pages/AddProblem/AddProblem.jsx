import React, { useCallback, useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import CustomModal from "../../components/Modal/CustomModal";

const AddProblem = () => {
  const [problem, setProblem] = useState({
    challenge_name: "",
    initial_html: "",
    initial_js: "",
    test_cases: [],
  });

  const [html, setHtml] = useState("");
  const [js, setJs] = useState("");
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    console.log(testCases);
  }, [testCases]);

  const onChangeJs = useCallback((value, viewUpdate) => {
    setJs(value);
  }, []);
  const onChangehtml = useCallback((value, viewUpdate) => {
    setHtml(value);
  }, []);

  useEffect(() => {
    console.log(html, js);
  }, [html, js]);

  //handle test case modal
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      challenge_name: e.target.challengeName.value,
      challenge_des: e.target.challengeDes.value,
      html: html,
      js: js,
    });
  };
  return (
    <div style={{display:"flex"}}>
      <div style={{width:"48%",border:"1px solid red"}}>
        <form onSubmit={handleSubmit}>
          <div>
            challenge Name: <input name="challengeName" type="text" />
          </div>
          <div>
            challenge Des: <input name="challengeDes" type="text" />
          </div>
          <div>
            Initial Html
            <CodeEditor onChange={onChangehtml}></CodeEditor>
          </div>
          <div>
            Initial Js
            <CodeEditor onChange={onChangeJs}></CodeEditor>
            <button type="submit">Add problem</button>
          </div>
        </form>
        Add Test Cases:
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <CustomModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          testCases={testCases}
          setTestCases={setTestCases}
        ></CustomModal>
      </div>

      {/* input pattern */}
      <div style={{width:"48%",border:"1px solid green"}}>
        {
          testCases.map((test,index)=>{
            return <div style={{backgroundColor:"red",width:"100%",marginBottom:"10px"}}>
              {
                test.isEvent && <>
                <p>Event: {test.event}</p>
              <p>Event Selector: {test.event_selector}</p>
                </>
                



              }
              <p>what selector to check: {test.what_selector_to_check}</p>
              <p>what to check: {test.what_to_check}</p>
              


            </div>
          })
        }
      </div>
    </div>
  );
};

export default AddProblem;
