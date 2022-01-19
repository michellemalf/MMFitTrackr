import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { callApi } from '../api';
import { Activity, AllActivities } from '.';


const EditAct = ({token, activities, activity}) => {
    const navigate = useNavigate();
    const {activityId} = useParams();
    if (activities.length === 0) return null;

    let activityToRender = activities.find((activity) => { 
        return Number(activityId) === Number(activity.id)});
 
    const [name, setName] = useState(activityToRender.name);
    const [description, setDescription] = useState(activityToRender.description);
    const [duration, setDuration] = useState(activityToRender.duration);
    const [count, setCount] = useState(activityToRender.count);

    const editSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            url: `/activities/${activityId}`,
            method: 'PATCH',
            body:{
                  name: name,
                  description: description,
                  duration: duration,
                  count: count,

            }, token:token
});
        navigate('/activities');
        window.location.reload()
    console.log(data)
};
    
    
return (
    <>
    <h2>Edit Activity</h2>
    <form onSubmit={editSubmit}>
        <div id ="TextField">
        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
        <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
        <input type="text" placeholder="Duration" value={duration} onChange={(event) => setDuration(event.target.value)}></input>
        <input type="text" placeholder="Count" value={count} onChange={(event) => setCount(event.target.value)}></input>
    </div>
    <button type="submit">Sumbit</button>
    </form>
    <button>
        <Link to="/">Home</Link>
    </button>
</>
);
};

export default EditAct;