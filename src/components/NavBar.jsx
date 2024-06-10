import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './NavBar.scss';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const NavBar = () => {
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );
  const responseMessage = (response) => {
    setUser(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const showNav = () => {
    document.querySelector(".nav").style.height = "50px";
    document.querySelector(".nav").style.color = "white";
    document.querySelector("a").style.display = "block";
    document.querySelector(".google").style.display = "block";
  }
  const hideNav = () => {
    document.querySelector(".nav").style.height = "5px";
    document.querySelector("a").style.display = "none";
    document.querySelector(".google").style.display = "none";
  }
  const logOut = () => {
      googleLogout();
      setProfile(null);
  };

  return (
    <div onMouseOver={showNav} onMouseLeave={hideNav} className="nav">
      <Link to="/">Home</Link>
      <Link to="/forum">Forum</Link>
      <Link to="/repo">Source</Link>
      <Link className="login" to="/login">Login</Link>
      <div className="google login">
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
    </div>
  )
}

export default NavBar;