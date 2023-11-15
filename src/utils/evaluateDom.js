
const html = `<button type="button" id="button">OFF</button>` //<p id="myId">Original Text</p>
const userCode = `
const buttonElem = document.getElementById("button");

buttonElem.addEventListener('click', () => {
  const oldText = buttonElem.innerText;
  return button.innerText = oldText === "ON" ? "OFF" : "ON";
});`
function evaluateDomFunctionality(){


    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>IFrame Content</title>
    </head>
    <body>
      <button id="myButton">ON</button>
      <script>
        // document.getElementById('myButton').addEventListener('click', function() {
        //   // Assuming there's an element with id 'changedElement' that you want to access
        //   var changedElement = document.getElementById('myButton');
        //   // Send the innerHTML of the changed element to the parent window
        //   window.parent.postMessage(changedElement.innerHTML, '*');
        // });
        
const buttonElem = document.getElementById("myButton")

buttonElem.addEventListener('click', () => {
  const oldText = buttonElem.innerText;
  buttonElem.innerText = oldText === "ON" ? "OFF" : "ON";
  window.parent.postMessage("hi", '*');
});
      </script>
    </body>
    </html>
  `

}







export {evaluateDomFunctionality}