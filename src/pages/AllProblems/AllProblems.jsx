import React from "react";
import { useNavigate } from "react-router-dom";

const AllProblems = () => {
    const navigate = useNavigate()
  const problemArray = [
    {
      challenge_id: 1,
      challenge_name: "dom challenge test 1",
      initial_html: `
            <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IFrame Content</title>
</head>
<body>
  <button id="myButton">ON</button>
  <h1 class="jack">my name is mir jakariya</h1>
  <script>

  </script>
</body>
</html>
            `,
      initial_js: `
            const buttonElem = document.getElementById("myButton")
document.querySelector(".jack").style.color = "red";

buttonElem.addEventListener('click', () => {
  const oldText = buttonElem.innerText;
  buttonElem.innerText = oldText === "ON" ? "OFF" : "ON";

});
            `,
      test_cases: [
        {
          isEvent: true,
          event: "click",
          selector_name: "#myButton",
          what_selector_to_check: "#myButton",
          what_to_check: "innerText",
        },
        {
          isEvent: false,
          selector_name: ".jack",
          what_selector_to_check: ".jack",
          what_to_check: "style",
        },
      ],
      expected_output: ["OFF", "color:red"],
    },
  ];
  return <div>

    {
        problemArray.map((prob,index)=>{
            return <button onClick={()=>navigate(`/singleProblem/${prob.challenge_id}`)}>Problem1</button>
        })
    }
  </div>;
};

export default AllProblems;
