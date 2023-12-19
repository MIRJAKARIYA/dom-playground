import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllProblems from "../pages/AllProblems/AllProblems";
import SingleProblem from "../pages/SingleProblem/SingleProblem";
import AddProblem from "../pages/AddProblem/AddProblem";
import ManageProblems from "../pages/ManageProblems/ManageProblems";
import ManageSingleProblem from "../pages/ManageSingleProblem/ManageSingleProblem";

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
                    const res =await fetch('http://localhost:5000/allProblems')
                    console.log(res)
                    const data = await res.json()
                    return data.find(d=>d._id == params.id)
                }
            },
            {
                path:"/addProblem",
                element:<AddProblem></AddProblem>
            },
            {
                path:"/manageProblems",
                element:<ManageProblems></ManageProblems>
            },
            {
                path:"/manageSingleProblem/:id",
                element:<ManageSingleProblem></ManageSingleProblem>,
                loader:async ({params})=> {
                    const res =await fetch('http://localhost:5000/allProblems')
                    console.log(res)
                    const data = await res.json()
                    return data.find(d=>d._id == params.id)
                }
            }
        ]
    }
 ])

 export default routes