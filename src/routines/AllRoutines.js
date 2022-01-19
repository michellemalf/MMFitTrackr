import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Routine } from '../routines';
import { callApi } from '../api';


const AllRoutines = ({userData, token}) => {
    const [routines, setRoutines] = useState([]);
    const navigate = useNavigate();

    const fetchAllRoutines = async (token) => {
        const routines = await callApi({
            url: '/routines',
            method: 'GET',
            token,
        });
        return routines;
    };
 useEffect(async () => {
        if (routines.length === 0) {
            const fetchedRoutines = await fetchAllRoutines(token);
            console.log("Fetched Routines", fetchedRoutines)
            setRoutines(fetchedRoutines);
    }
    },[]);

return (
    <>
<button className="LargeButton">
    <Link to="/">Home</Link>
        </button>
<div></div>



<h2 className="Routines-title">Routines</h2>

<div id ="RoutineContainer"> {routines?.map((routine) => (
<div key={routine.id}>
    <Routine routines={routines} routine={routine} />
    {<button>
        <Link to={`/edit_routine/${routine.id}`}>Edit Routine</Link>
    </button>}
    {/* {<button>
        <Link to={`/delete_routine/${routine.id}`}>Delete Routine</Link>
    </button>} */} <br></br><br></br>
</div>
        
))}
</div>
</>
);
};

export default AllRoutines;