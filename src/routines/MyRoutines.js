import React, {useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { callApi } from '../api';
import { MyRoutine } from '.';

const MyRoutines = ({token, userData, routineId}) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const navigate= useNavigate();

    const fetchMyRoutines = async (username, token) => {
        const myRoutines = await callApi({
            url: `/users/${username}/routines`,
            method: 'GET',
            token
        });
        return myRoutines;
    };

    useEffect(async () => {
        if (userData && userData.username) {
            const fetchedMyRoutines = await fetchMyRoutines(userData.username, token);
            console.log("Fetched My Routines", fetchedMyRoutines)
            setMyRoutines(fetchedMyRoutines);
        }
    },[userData]);

    const deleteRoutine = async (event) => {
        event.preventDefault();
        
        const data = await callApi({
            url: `/routines/${routineId}`,
            method: 'DELETE',
            token
        });       
        navigate('/my_routines');
        window.location.reload()
    };  

    return <>
        <button className="LargeButton">
            <Link to="/">Home</Link>
        </button>
        <h2 className="MyRoutines-title">My Routines</h2>

        <div id = "MyRoutineContainer"> 
            {myRoutines.map((routine) => {
                return (<div key={routine.id}>
                    <MyRoutine routine={routine} />
        
                    <button>
                        <Link to={`/edit_routine/${routine.id}`}>Edit Routine</Link>
                    </button> <br></br> <br></br>
                    <button onClick={deleteRoutine}>Delete Routine</button>
                </div>)
            })}
        </div>
    </>;
};


export default MyRoutines;