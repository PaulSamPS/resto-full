import React from 'react';
import { Button } from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../redux/actions/authAction';
import { Spinner } from '../../components/Spinner/Spinner';

export const User = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.loginReducer);
  const { isLoading } = useAppSelector((state) => state.logoutReducer);

  const handleLogout = () => {
    dispatch(logout(user.name, document.cookie));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>User</h1>
      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  );
};
