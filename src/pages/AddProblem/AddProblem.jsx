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
  const [testCase, setTestCase] = useState({
    isEvent: true,
    event: "",
    event_selector: "",
    what_selector_to_check: "",
    what_to_check: "",
  });



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
      Add Test Cases:
      <button onClick={()=>setIsOpen(true)}>Open Modal</button>
      <CustomModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} testCase={testCase} setTestCase={setTestCase}></CustomModal>
    </div>
  );
};

export default AddProblem;
