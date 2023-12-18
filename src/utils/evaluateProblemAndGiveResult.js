import eventDispatch from "./eventDispatch";

const evaluateDomChallenge = (updatedDom,problemData) =>{
     
     
     let isCorrect = true;
     const {challenge_name,initial_html,test_cases,expected_output,event_selector} = problemData
     for(let i =0;i<test_cases.length;i++){
      const test = test_cases[i];
      if(test.isEvent){
        eventDispatch(test.event,test.event_selector,updatedDom)
      }
      let checkedValue;
      if(test.isEvent){
        checkedValue = updatedDom.querySelector(test.what_selector_to_check)?.[test.what_to_check] || "elementRemoved"
      }
      else{
        checkedValue = updatedDom.querySelector(test.what_selector_to_check).getAttribute(test.what_to_check);
      }

console.log(checkedValue)
      if(checkedValue == "elementRemoved" && ("accessKey" == test.what_to_check)){
        return true;
      }
      console.log(checkedValue)
    
        if(typeof checkedValue === 'string'){
            // if(checkedValue.includes(":")){
          checkedValue = checkedValue.split(";").join("")   //TO_DO==> if there is a : in input test case then all the spaces of the test case must be removed.
           //   console.log(checkedValue)
      // }
        }
        
     

      if(!expected_output.includes(checkedValue)){
        isCorrect = false;
      }

     }
     return isCorrect
}

export {evaluateDomChallenge}