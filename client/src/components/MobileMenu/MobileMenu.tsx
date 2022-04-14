import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {NavInterface} from '../../interfaces/nav.interface';
import {ReactComponent as CloseIcon} from '../../helpers/icons/close.svg';
import {setActiveNav} from '../../redux/reducers/NavSlice';
import {getProduct} from '../../redux/actions/ActionCreator';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as CallingIcon} from '../../helpers/icons/calling.svg';
import {MobileMenuProps} from './MobileMenu.props';
import cn from 'classnames';
import styles from './MobileMenu.module.scss';

export const MobileMenu: React.FC<MobileMenuProps> = ({setModalMenu}): JSX.Element => {
  const {nav, activeIndex} = useAppSelector((state) => state.navReducer);
  const {orderSuccess} = useAppSelector((state) => state.orderSuccessReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModalMenu(false);
  };

  const handleClick = (index: number, category: string) => {
    dispatch(setActiveNav(index));
    dispatch(getProduct(category));
    handleCloseModal();
    navigate('/');
  };

  const myOrdersNavigate = () => {
    navigate('/my-orders');
    handleCloseModal();
  };

  return (
    <div className={styles.wrapper} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div className={styles.top}>
        <CloseIcon onClick={handleCloseModal}/>
        <h1>LOGOS</h1>
      </div>
      <div className={styles.myOrders}>
        {orderSuccess.length > 0 && <span onClick={myOrdersNavigate}>Мои заказы</span>}
      </div>
      <span className={styles.categories}>Категории: </span>
      {nav.map((m: NavInterface, index: number) =>
        <a
          className={cn(styles.navLink, {
            [styles.activeLink]: activeIndex === index
          })}
          onClick={() => handleClick(index, m.category)}
          key={m.id}
        >
          {m.name}
        </a>)}
      <div className={styles.contacts}>
        <div className={styles.icon}>
          <CallingIcon/>
        </div>
        <div className={styles.phone}>
          <span className={styles.text}>Контакты:</span>
          <span className={styles.number}>+7 (912) 345-67-89</span>
        </div>
      </div>
    </div>
  );
};
