import React, { useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { callApi } from '../api';

export const AccountForm = ({ setToken }) => {
    const { action } = useParams()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLogin = action === 'login';
    const title = isLogin ? 'Login' : 'Register';
    const oppositeAction = isLogin ? 'register' : 'login';
    const oppositeTitle = isLogin ? 'Register' : 'Login';
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            url: `/users/${action}`,
            body: { username, password },
            method: 'POST',
        });
        
        try { 
            const { token } = data;
            if (token) {
                localStorage.setItem( 'st-token', token );
                setToken(token);
                navigate('/');
            }
        } catch (error) {
            window.alert("Wrong Username or Password")
        }
    };

    return (<>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}>
            </input>
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}>
            </input>
            <button type="submit">{title}</button>
        </form>
        <button>
            <Link to={`/account/${oppositeAction}`}>{oppositeTitle}</Link>
        </button>
        <button>
            <Link to="/">Home</Link>
        </button>
    </>);
};


export default AccountForm ;