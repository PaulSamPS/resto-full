import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {getNav, getProduct} from '../../redux/actions/ActionCreator';
import {NavInterface} from '../../interfaces/nav.interface';
import {useLocation, useNavigate} from 'react-router-dom';
import {setActiveNav} from '../../redux/reducers/NavSlice';
import cn from 'classnames';
import styles from './Nav.module.scss';

export const Nav: React.FC = (): JSX.Element => {
  const {nav, activeIndex} = useAppSelector((state) => state.navReducer);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (index: number, category: string) => {
    dispatch(setActiveNav(index));
    dispatch(getProduct(category));
    navigate('/');
  };

  if (location.pathname !== '/') {
    dispatch(setActiveNav(null));
  }

  React.useEffect(() => {
    dispatch(getNav());
  }, []);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        {nav.map((n: NavInterface, index: number): JSX.Element =>
          <a
            className={cn(styles.navLink, {
              [styles.activeLink]: activeIndex === index,
              [styles.activeLinkBorder]: activeIndex === index
            })}
            key={n.id}
            onClick={() => handleClick(index, n.category)}
          >
            {n.name}
          </a>)}
      </nav>
    </div>
  );
};

