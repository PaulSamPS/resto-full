import React from 'react';
import { Search } from './Search/Search';
import { Contacts } from './Contacts/Contacts';
import { Modal } from '../../components/Modal/Modal';
import { useAppDispatch } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { setActiveCategory } from '../../redux/reducers/categoryReducer';
import { getProduct } from '../../redux/actions/ActionCreator';
import { Button } from '../../components/Button/Button';
import styles from './Header.module.scss';
import { LoginNav } from './Login/LoginNav';

export const DesktopHeader = (): JSX.Element => {
  const [modal, setModal] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalCount = 3;

  const handleClick = () => {
    if (totalCount <= 0) {
      setModal(true);
    } else {
      navigate('cart');
    }
  };

  const handleNavigate = () => {
    dispatch(setActiveCategory(1));
    dispatch(getProduct());
    setModal(false);
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.logo} onClick={handleNavigate}>
        LOGOS
      </h1>
      <Search />
      <Contacts />
      <LoginNav />
      <Button className={styles.btn} totalCount={totalCount} appearance={'cart'} onClick={handleClick}>
        Корзина
      </Button>
      <Modal setModal={setModal} modal={modal}>
        <img className={styles.image} src='http://localhost:5000/cart/emptyCart.png' alt='Корзина пуста' />
        <h2>Корзина пуста</h2>
        <Button className={styles.modalBtn} onClick={handleNavigate}>
          Посмотреть меню
        </Button>
      </Modal>
    </div>
  );
};
