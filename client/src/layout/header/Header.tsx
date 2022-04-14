import React from 'react';
import {Search} from './Search/Search';
import {Contacts} from './Contacts/Contacts';
import {Modal} from '../../components/Modal/Modal';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useNavigate} from 'react-router-dom';
import {setActiveNav} from '../../redux/reducers/NavSlice';
import {getProduct} from '../../redux/actions/ActionCreator';
import {ReactComponent as MobileMenuIcon} from '../../helpers/icons/burger.svg';
import {MobileMenu} from '../../components/MobileMenu/MobileMenu';
import {AnimatePresence, motion} from 'framer-motion';
import {ButtonMobile} from '../../components/ButtonMobile/ButtonMobile';
import {Button} from '../../components/Button/Button';
import styles from './Header.module.scss';


export const Header: React.FC = (): JSX.Element => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [modalMenu, setModalMenu] = React.useState<boolean>(false);
  const {totalCount} = useAppSelector((state) => state.cartReducer);
  const {orderSuccess} = useAppSelector((state) => state.orderSuccessReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const variants = {
    open: {opacity: 1, x: 0},
    closed: {opacity: 0, x: '-100%'},
  };

  const variantsOverlay = {
    open: {opacity: 1},
    closed: {opacity: 0},
  };

  const handleClick = () => {
    if (totalCount <= 0) {
      setModal(true);
    } else {
      navigate('cart');
    }
  };

  const handleNavigate = () => {
    dispatch(setActiveNav(0));
    dispatch(getProduct());
    setModal(false);
    navigate('/');
  };

  const handleOpenMenu = () => {
    setModalMenu(true);
  };

  const myOrdersNavigate = () => {
    navigate('/my-orders');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.burger} onClick={handleOpenMenu}><MobileMenuIcon/></div>
      <h1 className={styles.logo} onClick={handleNavigate}>LOGOS</h1>
      <Search/>
      <Contacts/>
      <div className={styles.myOrders}>
        {orderSuccess.length > 0 && <span onClick={myOrdersNavigate}>Мои заказы</span>}
      </div>
      <ButtonMobile appearance={'cartMobile'} totalCount={totalCount} onClick={handleClick}>корзина</ButtonMobile>
      <Button className={styles.btn} totalCount={totalCount} appearance={'cart'} onClick={handleClick}>Корзина</Button>
      <Modal setModal={setModal} modal={modal}>
        <img className={styles.image} src={'assets/emptyCart.png'} alt='Корзина пуста'/>
        <h2>Корзина пуста</h2>
        <Button className={styles.modalBtn} onClick={handleNavigate}>Посмотреть меню</Button>
      </Modal>
      <AnimatePresence>
        {modalMenu &&
        <>
          <motion.div
            className={styles.overlay}
            onClick={() => setModalMenu(false)}
            animate={modalMenu ? 'open' : 'closed'}
            variants={variantsOverlay}
            exit={'closed'}
            initial={'closed'}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
          />
          <motion.div
            className={styles.menu}
            animate={modalMenu ? 'open' : 'closed'}
            variants={variants}
            initial={'closed'}
            exit={'closed'}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
          >
            <MobileMenu setModalMenu={setModalMenu}/>
          </motion.div>
        </>
        }
      </AnimatePresence>
    </div>
  );
};
