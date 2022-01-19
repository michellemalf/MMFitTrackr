import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { callApi } from '../api';


const Activity = ({activity, activities, token, userData}) => {
    const { activityId } = useParams();
    const navigate = useNavigate();

    if (activities.length === 0) return null;

    let activityToRender;

    if (activity) {
        activityToRender = activity;
    } else {
        activityToRender = activities.find((activity) => activityId === activity.id);
    }

const onDelete = async (event) => {
        event.preventDefault();

    const data = await callApi({
            url: `/activities/${activityToRender.id}`,
            method: 'DELETE',
            token,
});

navigate('/activities');
window.location.reload()
}

return (
<>
        
{
activityToRender.username
? 
<div className="Activity">Submitted by: {activityToRender.username }</div>
:
null
}
<div className="Activity"><b>Name:</b> {activityToRender.name}</div>
<div className="Activity"><b>Id:</b>{activityToRender.id}</div>
<div className="Activity"><b>Duration:</b>{activityToRender.duration}</div>
<div className="Activity"><b>Count:</b>{activityToRender.count}</div>

{!activity ? <Link to="/activities">Back to Activities</Link> : null}


{activity.activities?.map((routine) => {return  (
<>
<div className="Activity"><b>Name:</b> {routine.name}</div>
<div className="Activity"><b>Description:</b>{routine.description}</div>
<div className="Activity"><b>Goal:</b> {routine.goal}</div>
<div className="Activity"><b>Count:</b>{routine.count}</div>

</>
)
})}
</>       
);
};

export default Activity;