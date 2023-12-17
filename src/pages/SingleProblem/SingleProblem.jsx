import React, { useCallback, useEffect, useRef, useState } from "react";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { submitCodeWithUpdatedDom } from "../../utils/evaluateDom";
import { checkSyntaxError } from "../../utils/checkSyntaxError";
import { evaluateDomChallenge } from "../../utils/evaluateProblemAndGiveResult";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const SingleProblem = () => {
  const {challenge_id,challenge_name,expected_output,initial_html,initial_js,test_cases} = useLoaderData();

  const [js, setJs] = useState(initial_js);


  const [html, setHtml] = useState(initial_html);

  const [src, setSrc] = useState("");
  const iframeRef = useRef();

  const [updatedDom, setUpdatedDom] = useState({});

  useEffect(() => {
    console.log(updatedDom);
  }, [updatedDom]);

  const handleSubmit = () => {
    try {
      const isOkay = evaluateDomChallenge(updatedDom);
      if (isOkay) {
        toast.success("Congratulations.You have completed the challenge");
      } else {
        toast.error("Sorry You couldn't complete the challenge");
      }
    } catch (err) {
      console.log("Error in the code", err);
    } finally {
      setUpdatedDom({});
      setSrc("");
      setHtml(initial_html);
      setJs(initial_js);
    }
  };

  useEffect(() => {
    // Add event listener for receiving messages from the iframe
    const handleMessage = (event) => {
      // event.data contains the innerHTML sent from the iframe
      console.dir(event.source.document);
      setUpdatedDom(event.source.document);
    };

    // Attach the event listener
    window.addEventListener("message", handleMessage);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const evaluateDom = async () => {
    //check syntax error here
    const errorMgs = checkSyntaxError(html, js);
    if (errorMgs.error) {
      toast.error(errorMgs.mgs);
    } else {
      const doc = submitCodeWithUpdatedDom(html, js);
      setSrc(doc);
    }
  };

  const onChange = useCallback((value, viewUpdate) => {
    setJs(value);
  }, []);
  const onChangehtml = useCallback((value, viewUpdate) => {
    setHtml(value);
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        srcDoc={src}
        width="600"
        height="400"
        title="Embedded Content"
        style={{ border: "2px solid red" }}
      />
      <div style={{ display: "flex" }}>
        <CodeEditor onChange={onChangehtml} initialCode={html}></CodeEditor>
        <CodeEditor onChange={onChange} initialCode={js}></CodeEditor>
      </div>
      <button onClick={evaluateDom}>Evaluate Dom</button>
      <button onClick={handleSubmit}>Submit Problem</button>
    </>
  );
};

export default SingleProblem;
