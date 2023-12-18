
function submitCodeWithUpdatedDom(html,js){

// const userCodeFull = userCode.split('').join("").replace(/}\)/g,`window.parent.postMessage("hi", '*');})`)

  const userCodeFull = js.replace(/\}\s*\)/g, '})').replace(/}\)/g,`window.parent.postMessage("hi", '*');})`)
  const combinedCode = html.split("<script></script>")
  const resultedCode = [combinedCode[0],"<script>",userCodeFull,`;window.parent.postMessage("hi", '*');`,"</script>",combinedCode[1]].join("")
  console.log(resultedCode)
  return resultedCode

  

}







export {submitCodeWithUpdatedDom}