import "./App.css";
import Login from "./auth/Login";
import Vehiclepage from "./layout/v2/pages/Vehiclepage";
import { useRoutes,Routes, Route } from "react-router-dom";
import Aside from "./layout/v2/partials/Aside";
import Eservicespage from "./layout/v2/pages/Eservicespage";
import Cctvpage from "./layout/v2/pages/Cctvpage";
import DummyPage from "./layout/v2/pages/Dummypage";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function App() {
 const Navigatea=useNavigate();
 
  const storedTokenCookies = Cookies.get('token');


const isAuthenticated = !!storedTokenCookies;
const routing = useRoutes([
  // Public route (accessible to all)
   { path: '/', element: isAuthenticated ? <Navigate to="/vehiclepage" replace /> : <Login/> },
  // Protected routes (accessible to authenticated users)
  isAuthenticated ? (
    // Include Aside for authenticated users
    {
    
      element: <Aside />,
      children: [
        { path: '/vehiclepage', element: <Vehiclepage /> },
        { path: '/eservicespage', element: <Eservicespage /> },
        { path: '/cctvpage', element: <Cctvpage /> },
        { path: '/dummypage', element: <DummyPage /> },
      ],
    }
  ) : (
    // Redirect unauthenticated users to login
    <Navigate to="/" replace />
  ),
  {
    path: '/vehiclepage',
    element: isAuthenticated ? <Vehiclepage /> : <Navigate to="/" replace />
  },
  {
    path: '/eservicespage',
    element: isAuthenticated ? <Eservicespage /> : <Navigate to="/" replace />
  },
  {
    path: '/cctvpage',
    element: isAuthenticated ? <Cctvpage /> : <Navigate to="/" replace />
  },
  {
    path: '/dummypage',
    element: isAuthenticated ? <DummyPage /> : <Navigate to="/" replace />
  },
   // Redirect all other unknown paths to the login page
   { path: '*', 
   element: isAuthenticated ? <Navigate to="/vehiclepage" replace /> : <Navigate to="/" replace />
  },

]);
 useEffect(() => {
    // Prevent going back to login page when authenticated
    const handleNavigation = (e) => {
      if (isAuthenticated && window.location.pathname === "/") {
        e.preventDefault();
        Navigatea("/vehiclepage");
        // window.history.replaceState( "/", "/vehiclepage");
       
      }
    };

    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [isAuthenticated]);

  return (
    <div className="App">
    
        {routing}
     
    </div>
  );
}

export default App;
