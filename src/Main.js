import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { callApi } from './api/index';
import { AllRoutines, CreateRout, EditRout, Routine, MyRoutines, MyRoutine } from './routines';
import { AllActivities, CreateAct, EditAct, AddActtoRout } from './activities';
import { AccountForm } from "./account/AccountForm"
import './Main.css'

export const Main = () => {
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});
    const [activities, setActivities] = useState([]);
    const [routines, setRoutines] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = userData.username !== undefined;

    const onLogOutClick = () => {
        localStorage.removeItem('st-token');
        setToken('');
        setUserData({});
        navigate('/')
    };

    const fetchUserData = async (token) => {
        const data  = await callApi({
            url: '/users/me',
            token,
        });
        return data;
    };

    useEffect(async () => {
        if (!token) {
            setToken(localStorage.getItem('st-token'));
            return;
        }
        const data = await fetchUserData(token);
        setUserData(data);
    }, [token]);

    return (<>
        {!isLoggedIn && <h1 className="app-title">Welcome to Fitness Trackr</h1>}

        {isLoggedIn ? (<>
            <div id ="Greeting">WELCOME, {userData.username}!</div>
            <button className="my-routine-button"><Link to="/my_routines">MY Routines</Link></button>
            <button className="routines-button"><Link to="/routines">Routines</Link></button>
            <button className="add-routine-button"><Link to="/create_routine">Add Routine</Link></button>
            <button className="activities-button"><Link to="/activities">Activities</Link></button>
            <button className="add-activity-button"><Link to="/create_activity">Add Activity</Link></button>
            <button className="logout-button" onClick={onLogOutClick}>Log Out</button>
        </>)
        : ( <>
            <button className="register-button"><Link to="/account/register">Register</Link></button>
            <button className="login-button"><Link to="/account/login">Login</Link></button>
            <br></br>
            <button className="routines-button"><Link to="/routines">Routines</Link></button>
            <button className="activities-button"><Link to="/activities">Activities</Link></button>
        </>)}

        <Routes>
            <Route path="/create_routine" exact element={<CreateRout action="Create Routine" token={token}/>}/>
            <Route path="/create_activity" exact element={<CreateAct action="Create Activity" token={token} />}/>
            <Route path="/routines" exact element={ <AllRoutines routines={routines} token={token} userData = {userData} />}/>
            <Route path="/routine" exact element={<Routine routines={routines} token={token} userData = {userData} />}/>
            <Route path="/my_routine" exact element={ <MyRoutine token={token} userData = {userData} />}/>
            <Route path="/my_routines" exact element={ <MyRoutines token={token} userData={userData} />}/>
            <Route path="/edit_routine/:routineId" exact element={<EditRout routines={routines} token={token} />}/>
            <Route path="/edit_activity/:activityId" exact element={<EditAct activities={activities} token={token} />}/>
            <Route path="/add_activitytoroutine"exact element={<AddActtoRout action="AddActtoRout" token={token} userData = {userData} routines = {routines} />}/>
            <Route path="/activities" exact element={<AllActivities activities={activities}  userData={userData} token={token} />}/>
            <Route path="/account/:action" exact element={<AccountForm setToken={setToken} />}/>
            {/* <Route path="/delete_routine/:routineId" exact element={<DeleteRout routine={routines} token={token} />}/> */}
        </Routes>
    </>
    );
};

export default Main;