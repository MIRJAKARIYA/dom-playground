import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ManageSingleProblem = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            Manage single problem
        </div>
    );
};

export default ManageSingleProblem;