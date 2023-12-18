import React, { useEffect, useState } from "react";

const ManageProblems = () => {
  const [problemArray, setProblemArray] = useState([]);
  const [reload,setReload] = useState(false)
  useEffect(() => {
    fetch("http://localhost:5000/allProblems")
      .then((res) => res.json())
      .then((data) => setProblemArray(data));
  }, [reload]);


  const handleDelete = _id =>{
    fetch(`http://localhost:5000/deleteProblem/${_id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"Application/json"
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        setReload(!reload)
    })
  }


  return (
    <div>
      {problemArray.map((prob, index) => {
        return (
          <div>
            <h1>{prob.challenge_name}</h1>
            <button>Update</button>
            <button onClick={()=>handleDelete(prob._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default ManageProblems;
