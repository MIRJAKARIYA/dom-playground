function checkSyntaxError(userHtmlCode,userJsCode) {
// const userHtmlCode = '<button id="myButton">Click me</button>';
// const userJsCode = `
//   const buttonElem = document.getElementById("myButton");

//   buttonElem.addEventListener('click', () => {
//     const oldText = buttonElem.innerText;
//     buttonElem.innerText = oldText === "ON" ? "OFF" : "ON";
//   });
// `;
let iframe;
try {
  // Create a virtual environment using a sandboxed iframe
   iframe = document.createElement('iframe');
  iframe.style.display = 'none'; // Hide the iframe
  document.body.appendChild(iframe);

  // Get the iframe document and write the HTML code
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  iframeDocument.write(userHtmlCode);
  iframeDocument.close();

  // Evaluate the JavaScript code in the iframe context
  iframe.contentWindow.eval(userJsCode);

  return {error:false,mgs:'No syntax errors in the user-provided DOM code'}
} catch (error) {
  return {error:true,mgs:error.message}
} finally {
  // Remove the iframe from the document
  document.body.removeChild(iframe);
}
}

export {checkSyntaxError}
