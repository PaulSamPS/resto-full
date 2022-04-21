import React from 'react';
import styles from './LoginNav.module.scss';
import { ReactComponent as ProfileIcon } from '../../../helpers/icons/profile.svg';
import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

export const LoginNav = (): JSX.Element => {
  const { user, isAuth } = useAppSelector((state) => state.loginReducer);
  const navigate = useNavigate();

  return (
    <div className={styles.login}>
      {user.role !== 'ADMIN' ? (
        isAuth ? (
          <span className={styles.auth} onClick={() => navigate('/user')}>
            <ProfileIcon />
            Профиль
          </span>
        ) : (
          <span className={styles.auth} onClick={() => navigate('/login')}>
            <ProfileIcon />
            Войти
          </span>
        )
      ) : (
        <span className={styles.auth} onClick={() => navigate('/admin')}>
          <ProfileIcon />
          Админ
        </span>
      )}
    </div>
  );
};
