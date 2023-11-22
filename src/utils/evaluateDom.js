





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
  <script>

  </script>
</body>
</html>
` //<p id="myId">Original Text</p>
const userCode = `
const buttonElem = document.getElementById("myButton");

buttonElem.addEventListener('click', () => {
  const oldText = buttonElem.innerText;
  buttonElem.innerText = oldText === "ON" ? "OFF" : "ON";
  window.parent.postMessage("hi", '*');
});
window.parent.postMessage("hi", '*');
`
function submitCodeWithUpdatedDom(){


  const combinedCode = initialHtml.split("<script></script>")
  const resultedCode = [combinedCode[0],"<script>",userCode,"</script>",combinedCode[1]].join("")
  return resultedCode
  

}







export {submitCodeWithUpdatedDom}