import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllProblems = () => {
    const navigate = useNavigate()
    const [problemArray,setProblemArray] = useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/allProblems")
        .then(res=>res.json())
        .then(data=>setProblemArray(data))
    },[])
  return <div>

    {
        problemArray.map((prob,index)=>{
            return <button onClick={()=>navigate(`/singleProblem/${prob._id}`)}>{prob.challenge_name}</button>
        })
    }
  </div>;
};

export default AllProblems;
