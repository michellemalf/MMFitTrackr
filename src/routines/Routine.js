import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { callApi } from '../api';

const Routine = ({routine, routines, token, userData, isLoggedIn}) => {
    const { routineId } = useParams();
    const navigate = useNavigate();
    if (routines.length === 0) return null;
    let routineToRender;
    if (routine) {
        routineToRender = routine;
    } else {
        routineToRender = routines.find((routine) => routineId === routine.id);
}

const onDelete = async (event) => {
    event.preventDefault();
    const data = await callApi({
        url: `/routines/${routineToRender.id}`,
        method: 'DELETE',
        token,
});
        
navigate('/routines');
window.location.reload()
}
return ( 
<>
        
{routineToRender.username
? 
<div className="Routine-text"><b>Submitted by:</b>{routineToRender.username }</div>
:
null}

<div className="Routine-text"><b>Routine Name:</b>{routineToRender.name}</div>
<div className="Routine-text"><b>Goal:</b>{routineToRender.goal}</div>
<div className="Routine-text"><b>CreatorName:</b>{routineToRender.creatorName}</div>
{!routine ? <Link to="/routines">Back to Routines</Link> : null}

{/* {isLoggedIn ? <Link to="/add_activitytoroutine"> Add Activity to Routine </Link> : null } */}

{/* {userData.id === routineToRender.id? <> <button><Link to={`AllRoutines/${routineId}/AllActivities`}> Add Activity to Routine </Link></button>
</> : null } */}

{/* ^ these dont work yet v */}

{/* {routineToRender.id === userData.id
? 
<>
<button><Link to={`AllRoutines/${routine.id}/AllActivities`}>Add Activity To Routine</Link>
</button>
<button><Link to={"/EditRout/" + routineToRender.id}>Edit Routine</Link>
</button>
<button onClick={onDelete}>Delete Routine</button> 
</>
:
null        
}  */}

{routine.activities?.map((activity) => {
  return  (
<>
    <div className="Activity-text"><i>Activity:{activity.name}</i></div>
    <div className="Activity-text"><i>Activity Id: {activity.id}</i></div>
    <div className="Activity-text"><i>Description: {activity.description}</i></div>
    <div className="Activity-text"><i>Duration: {activity.duration}</i></div>
    <div className="Activity-text"><i>Count: {activity.count}</i></div>
    <div className="Activity-text"><i>Routine Activity:{activity.routineActivityId}</i></div>
    <div className="Activity-text"><i>RoutineId: {activity.routineId}</i></div>
</>
)
})}
</>       
);
};

export default Routine;