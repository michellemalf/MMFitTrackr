import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { callApi } from '../api';
import {Routine} from '../routines'

const AddActtoRout = ({routine, token}) => {
    const navigate = useNavigate();
    const {routineId} = useParams();
    const [activityId, setactivityId] = useState(Number);
    const [count, setCount] = useState(Number);
    const [duration, setDuration] = useState(Number);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            url: `routines/${routineId}/activities`,
            method: 'POST',
            body:{
                activityId:activityId,
                count: count,
                duration: duration
            }, token
});
    
navigate('/routines');
window.location.reload()
console.log(data)
};

    return (
        <>
    <h2>Add Activity to Routine</h2>
    <form onSubmit={handleSubmit}>
        <div id ="TextField">
        <input type="number" placeholder="Duration" value={duration} onChange={(event) => setDuration(event.target.value)}></input>
        <input type="number" placeholder="Count" value={count} onChange={(event) => setCount(event.target.value)}></input>
    </div>
        <button type="submit">Post Activity</button>
    </form>
    <button>
        <Link to="/">Home</Link>
    </button>
</>
);
};

export default AddActtoRout;