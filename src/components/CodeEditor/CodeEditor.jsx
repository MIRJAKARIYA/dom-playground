import React from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";



const CodeEditor = ({initialCode,onChange}) => {
    return (
        <CodeMirror
            width='100%'
            minHeight='300px'
            value={initialCode?initialCode:""}
          
            onChange={onChange}
        />
    );
};

export default CodeEditor;