import React from 'react';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function AuthWrapper({ children }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) navigate('/login');
  };

  return <div onClick={handleClick}>{children}</div>;
}
