import React from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";



const CodeEditor = ({initialCode,onChange}) => {
    return (
        <CodeMirror
            width='500px'
            minHeight='300px'
            value={initialCode}
          
            onChange={onChange}
        />
    );
};

export default CodeEditor;