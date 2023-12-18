import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllProblems from "../pages/AllProblems/AllProblems";
import SingleProblem from "../pages/SingleProblem/SingleProblem";
import AddProblem from "../pages/AddProblem/AddProblem";

 const routes = createBrowserRouter([
    {
        path:"/",
        element:<App></App>,
        children:[
            {
                path:"/",
                element:<AllProblems></AllProblems>
            },
            {
                path:"/singleProblem/:id",
                element:<SingleProblem></SingleProblem>,
                loader:async ({params})=> {
                    const res =await fetch('/problems.json')
                    console.log(res)
                    const data = await res.json()
                    return data.find(d=>d.challenge_id == params.id)
                }
            },
            {
                path:"/addProblem",
                element:<AddProblem></AddProblem>
            }
        ]
    }
 ])

 export default routes