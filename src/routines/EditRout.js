import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { callApi } from '../api';


const EditRout = ({token, routines, fetchMyRoutines, userData, setMyRoutines}) => {
    console.log('in Edit Routine')
    const navigate = useNavigate();
    const {routineId} = useParams();
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    console.log(routines)

    useEffect(async () => {
        if (userData && userData.username) {
            const fetchedMyRoutines = await fetchMyRoutines(userData.username, token);
            console.log("Fetched My Routines", fetchedMyRoutines)
            setMyRoutines(fetchedMyRoutines);
        } 
        let routineToRender = routines.find((routine) => { 
            console.log("RoutineId:", routineId,"Routine.Id:", routine.id)
            return Number(routineId) === Number(routine.id)
        });
        const [name, setName] = useState(routineToRender.name);
        const [goal, setGoal] = useState(routineToRender.goal);

    },[userData]);

    const editRoutine = async (event) => {
    event.preventDefault();

    const data = await callApi({
        url: `/routines/${routineId}`,
        method: 'PATCH',
        body:{
                name: name,
                goal: goal,
                isPublic: isPublic
        }, token: token
    });
    console.log('data', data)
        
    navigate('/my_routines');
    window.location.reload()

};  

return (
    
 <>
    <h2 className="Edit-Routine-title">Edit Routine</h2>

    <form onSubmit={editRoutine}>
        <div id ="TextField">
        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
        <input type="text" placeholder="Goal" value={goal} onChange={(event) => setGoal(event.target.value)}></input>
        <div>Make Public?</div>
        <input type="checkbox" value={isPublic} className="largerCheckbox" name="checkBox2" onChange={(event) => setIsPublic(event.target.value)}></input>
        </div>
        <button type="submit">Sumbit</button>
    </form>
</>
);
};

export default EditRout;