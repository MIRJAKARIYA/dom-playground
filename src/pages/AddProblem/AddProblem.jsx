import React, { useCallback, useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import CustomModal from "../../components/Modal/CustomModal";

const AddProblem = () => {

  const [html, setHtml] = useState("");
  const [js, setJs] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [expectedOutput,setExpectedOutput] = useState([])

  useEffect(() => {
    console.log(testCases);
  }, [testCases]);

  const onChangeJs = useCallback((value, viewUpdate) => {
    setJs(value);
  }, []);
  const onChangehtml = useCallback((value, viewUpdate) => {
    setHtml(value);
  }, []);

  //handle test case modal
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
   const data ={
      challenge_name: e.target.challengeName.value,
      challenge_des: e.target.challengeDes.value,
      initial_html: html,
      initial_js: js,
      test_cases:testCases,
      expected_output:expectedOutput
    };
    fetch("http://localhost:5000/addDomProblem",{
      method:"POST",
      headers:{
        "Content-Type":"Application/json"
      },
      body:JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>console.log(data))
  };

  const handleRemove = index =>{
    const testCasesArrayCopy = [...testCases]
    const expectedOptCopy = [...expectedOutput]
    testCasesArrayCopy.splice(index, 1);
    expectedOptCopy.splice(index, 1);
    setTestCases(testCasesArrayCopy)
    setExpectedOutput(expectedOptCopy)
  }
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "48%", border: "1px solid red" }}>
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
           <div>
           Add Test Cases:
        <button type="button" onClick={() => setIsOpen(true)}>Add Test Case</button>
           </div>
            <button type="submit">Add problem</button>
          </div>
        </form>
        
        
      </div>

      {/* input pattern */}
      <div style={{ width: "48%", border: "1px solid green" }}>
        {testCases.map((test, index) => {
          return (
            <div
              style={{
                backgroundColor: "orange",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              {test.isEvent && (
                <>
                  <p>Event: {test.event}</p>
                  <p>Event Selector: {test.event_selector}</p>
                </>
              )}
              <p>what selector to check: {test.what_selector_to_check}</p>
              <p>what to check: {test.what_to_check}</p>
              <button onClick={()=>handleRemove(index)}>Remove</button>
            </div>
          );
        })}
      </div>
      <CustomModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          testCases={testCases}
          setTestCases={setTestCases}
          expectedOutput = {expectedOutput}
          setExpectedOutput = {setExpectedOutput}
        ></CustomModal>
    </div>
  );
};

export default AddProblem;
