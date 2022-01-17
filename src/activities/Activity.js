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
<div className="Activity">Name: {activityToRender.name}</div>
<div className="Activity">Id:{activityToRender.id}</div>
<div className="Activity">Duration:{activityToRender.duration}</div>
<div className="Activity">Count:{activityToRender.count}</div>

{!activity ? <Link to="/activities">Back to Activities</Link> : null}


{activity.activities?.map((routine) => {return  (
<>
<div className="Activity">Name: {routine.name}</div>
<div className="Activity">Description: {routine.description}</div>
<div className="Activity">Goal: {routine.goal}</div>
<div className="Activity">Count: {routine.count}</div>

</>
)
})}
</>       
);
};

export default Activity;