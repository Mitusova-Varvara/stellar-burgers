import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { selectIsAuthInit } from '../../services/user/user.slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: React.FC<{
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}> = ({ onlyUnAuth = false, children }) => {
  const isAuthInit = useSelector(selectIsAuthInit);
  const location = useLocation();

  if (onlyUnAuth && isAuthInit) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !isAuthInit) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
