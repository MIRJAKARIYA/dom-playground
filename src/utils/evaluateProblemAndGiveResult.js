const expectedProblemArray = 
    {
      challenge_name:"dom challenge test 1",
      initial_html:``,
      test_cases:[
        {
          isEvent:true,
          event:"click",
          selector_name:"#myButton",
          what_selector_to_check:"#myButton",
          what_to_check:"innerText"
        },
        {
          isEvent:false,
          selector_name:".jack",
          what_selector_to_check:".jack",
          what_to_check: "style",
        }
      ],
      expected_output:["OFF","color:red"]
    }


const evaluateDomChallenge = (updatedDom) =>{
     
     
     let isCorrect = true;
     const {challenge_name,initial_html,test_cases,expected_output} = expectedProblemArray
     for(let i =0;i<test_cases.length;i++){
      const test = test_cases[i];
      if(test.isEvent){
        switch(test.event){
          case "click":
            updatedDom.querySelector(test.selector_name).click();
          default:
            console.log("no event")
        }
      }
      let checkedValue;
      if(test.isEvent){
        checkedValue = updatedDom.querySelector(test.what_selector_to_check)[test.what_to_check];
      }
      else{
        checkedValue = updatedDom.querySelector(test.what_selector_to_check).getAttribute(test.what_to_check);
      }
      console.log(checkedValue)
      checkedValue = checkedValue.split(";").join("").split(" ").join("")
      if(!expected_output.includes(checkedValue)){
        isCorrect = false;
      }

     }
     return isCorrect
}

export {evaluateDomChallenge}