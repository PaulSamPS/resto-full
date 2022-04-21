import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../redux/actions/authAction';
import { Spinner } from '../../components/Spinner/Spinner';
import { Button } from '../../components/Button/Button';
import { Outlet } from 'react-router-dom';
import styles from './Admin.module.scss';
import { CustomLink } from '../../components/CustomLink/CustomLink';

export const Admin = () => {
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
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1 className={styles.title}>Admin</h1>
        <Button onClick={handleLogout}>Выйти</Button>
      </div>
      <div className={styles.left}>
        <CustomLink to={'/admin'} className={styles.sidebarLink}>
          Добавить продукт
        </CustomLink>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};
