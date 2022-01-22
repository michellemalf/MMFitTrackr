import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { callApi } from '../api';



const EditAct = ({token, activities, fetchAllActivities, userData, setAllActivities}) => {
    console.log('in Edit Routine')
    const navigate = useNavigate();
    const {activityId} = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [count, setCount] = useState('');
    console.log(activities);

    useEffect(async () => {
        if (userData && userData.username) {
            const fetchedAllActivites = await fetchAllActivities(userData.username, token);
            console.log("Fetched Activites", fetchedAllActivites)
            setAllActivities(fetchedAllActivites);
        } 
        let activityToRender = activities.find((activity) => { 
            return Number(activityId) === Number(activity.id)
        });
        
        const [name, setName] = useState(activityToRender.name);
        const [description, setDescription] = useState(activityToRender.description);
        const [duration, setDuration] = useState(activityToRender.duration);
        const [count, setCount] = useState(activityToRender.count);

    },[userData]);

    const editAct = async (event) => {
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
    <form onSubmit={editAct}>
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


    