const expectedProblemArray = [
    {
      challenge_name:"dom challenge test 1",
      initial_html:``,
      test_cases:[
        {
          event:"click",
          selector_type:"id",
          selector_tag:"button",
          selector_name:"myButton",
          what_to_check:"innerText"
        }
      ],
      expected_output:["OFF"]
    }
  ]


const evaluateDomChallenge = (updatedDom) =>{
     updatedDom.getElementById("myButton").click();
     console.log(updatedDom)
     let isCorrect = false;
     for(let i=0;i<expectedProblemArray.length;i++){
        const {test_cases,expected_output} = expectedProblemArray[i];
        for(let j=0;j<test_cases.length;j++){
            const {event,selector_type,selector_tag,selector_name,what_to_check} = test_cases[j];
            console.log(test_cases[j])
            const accesElement = updatedDom.getElementById(selector_name)[what_to_check]
            console.log(accesElement)

            if(expected_output.includes(accesElement)) {
                isCorrect = true;
                break
            }


        }
     }
     if(isCorrect) alert("Correct");else alert("Incorrect")
}

export {evaluateDomChallenge}