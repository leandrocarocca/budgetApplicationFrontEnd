import React from 'react';
import { useAuth } from './AuthContext';
import Button from './Button';
import { useNavigate, useLocation } from 'react-router-dom';
const Navbar = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    authContext.setIsAuthenticated(false);
    authContext.setUser({});
    navigate("/");
  }
  return (
    <div className="navbar">
      <div className="nav-left">
        <h1 style={{fontSize: '30px'}}>BUDGET APPLICATION</h1>
      </div>
      <div className="nav-right">
        {authContext.isAuthenticated && <Button color='black' text='Log out' onClick={onLogout}/>}
      </div>
    </div>
  );
};

export default Navbar;
