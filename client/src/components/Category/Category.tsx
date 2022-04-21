import React from 'react';
import cn from 'classnames';
import styles from './Category.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCategory } from '../../redux/actions/navAction';
import { setActiveCategory } from '../../redux/reducers/categoryReducer';
import { getProduct } from '../../redux/actions/ActionCreator';
import { useNavigate } from 'react-router-dom';

export const Category: React.FC = (): JSX.Element => {
  const { category, activeIndex } = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (id: number, category: string) => {
    dispatch(setActiveCategory(id));
    dispatch(getProduct(category));
    navigate('/');
  };

  React.useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        {category.map((c: any) => (
          <a
            className={cn(styles.navLink, {
              [styles.activeLink]: activeIndex === c.id,
              [styles.activeLinkBorder]: activeIndex === c.id,
            })}
            key={c.id}
            onClick={() => handleClick(c.id, c.name)}
          >
            {c.name}
          </a>
        ))}
      </nav>
    </div>
  );
};
