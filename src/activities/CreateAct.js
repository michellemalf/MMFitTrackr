import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { callApi } from '../api';


const CreateAct = ({token}) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [count, setCount] = useState('');
    
    const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await callApi({
        url: `/activities`,
        method: 'POST',
        body:{
        name: name,
        description: description}, token
});
        navigate('/activities');
        window.location.reload()
    console.log(data)
};

return (
    <>
<h2>Create An Activity</h2>
    <form onSubmit={handleSubmit}>
    <div id ="TextField">
    <input type="text" placeholder="Name of Activity" value={name} onChange={(event) => setName(event.target.value)}></input>
    <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
    <input type="text" placeholder="Duration" value={duration} onChange={(event) => setDuration(event.target.value)}></input>
    <input type="text" placeholder="Count" value={count} onChange={(event) => setCount(event.target.value)}></input>
    </div>
    <button type="submit">Post Activity</button>
    </form>
    <button>
        <Link to="/">Home</Link>
    </button>
</>
);
};

export default CreateAct;