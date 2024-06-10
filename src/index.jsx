import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import App from './App.jsx';
import Forum from './Forum.jsx';
import Login from './Login.jsx';
import { NavBar } from './components';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <><h1>404 Error</h1><Link to="/">Go home</Link></>,
    children: [
      {
        path: "/",
        element: <NavBar />,
      },
    ],
  },
  {
    path: "/forum",
    element: <Forum />,
    errorElement: <><h1>404 Error</h1><Link to="/">Go home</Link></>,
    children: [
      {
        path: "/forum",
        element: <NavBar />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <><h1>404 Error</h1><Link to="/">Go home</Link></>,
    children: [
      {
        path: "/login",
        element: <NavBar />
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='1010806071103-9krup235dc3kijkaem34sp95smkofnia.apps.googleusercontent.com'>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
