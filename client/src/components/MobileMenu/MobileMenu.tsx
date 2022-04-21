import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICategory } from '../../interfaces/category.interface';
import { ReactComponent as CloseIcon } from '../../helpers/icons/close.svg';
import { setActiveCategory } from '../../redux/reducers/categoryReducer';
import { getProduct } from '../../redux/actions/ActionCreator';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CallingIcon } from '../../helpers/icons/calling.svg';
import { MobileMenuProps } from './MobileMenu.props';
import cn from 'classnames';
import styles from './MobileMenu.module.scss';
import { LoginNav } from '../../layout/header/Login/LoginNav';

export const MobileMenu: React.FC<MobileMenuProps> = ({ setModalMenu }): JSX.Element => {
  const { category, activeIndex } = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModalMenu(false);
  };

  const handleClick = (index: number, category: string) => {
    dispatch(setActiveCategory(index));
    dispatch(getProduct(category));
    handleCloseModal();
    navigate('/');
  };

  return (
    <div className={styles.wrapper} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div className={styles.top}>
        <CloseIcon onClick={handleCloseModal} />
        <h1>LOGOS</h1>
      </div>
      <span className={styles.categories}>Категории: </span>
      {category.map((c: ICategory, index: number) => (
        <a
          className={cn(styles.navLink, {
            [styles.activeLink]: activeIndex === index,
          })}
          onClick={() => handleClick(index, c.name)}
          key={c.id}
        >
          {c.name}
        </a>
      ))}
      <LoginNav />
      <div className={styles.contacts}>
        <div className={styles.icon}>
          <CallingIcon />
        </div>
        <div className={styles.phone}>
          <span className={styles.text}>Контакты:</span>
          <span className={styles.number}>+7 (912) 345-67-89</span>
        </div>
      </div>
    </div>
  );
};
