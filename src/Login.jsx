import { useState, useEffect } from 'react';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [ profile, setProfile ] = useState([]);

    const onSuccess = (res) => {
        setProfile(jwtDecode(res.credential));
    };

    const onError = (error) => {
        setText(error);
    };

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <>
        <Outlet />
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            { !(JSON.stringify(profile) == JSON.stringify([])) ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <GoogleLogin size="medium" onSuccess={onSuccess} onError={onError}>Sign in with Google 🚀 </GoogleLogin>
            )}
        </div>
        </>
    );
}

export default Login;