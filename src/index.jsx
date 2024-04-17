import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import App from './App.jsx';
import { NavBar } from './components';

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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
