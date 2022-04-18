import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './MobileHeader.module.scss';
import { MobileMenu } from '../../components/MobileMenu/MobileMenu';
import { ButtonMobile } from '../../components/ButtonMobile/ButtonMobile';
import { ReactComponent as MobileMenuIcon } from '../../helpers/icons/burger.svg';
import { Search } from './Search/Search';
import { useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';

export const MobileHeader = () => {
  const [modalMenu, setModalMenu] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const { totalCount } = useAppSelector((state) => state.cartReducer);
  const navigate = useNavigate();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  };

  const variantsOverlay = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const handleClick = () => {
    if (totalCount <= 0) {
      setModal(true);
    } else {
      navigate('cart');
    }
  };

  const handleNavigate = () => {
    setModal(false);
    navigate('/');
  };

  const handleOpenMenu = () => {
    setModalMenu(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.burger} onClick={handleOpenMenu}>
        <MobileMenuIcon />
      </div>
      <h1 className={styles.logo} onClick={handleNavigate}>
        LOGOS
      </h1>
      <Search />
      <ButtonMobile appearance={'cartMobile'} totalCount={totalCount} onClick={handleClick}>
        корзина
      </ButtonMobile>
      <Modal setModal={setModal} modal={modal}>
        <img className={styles.image} src='http://localhost:5000/cart/emptyCart.png' alt='Корзина пуста' />
        <h2>Корзина пуста</h2>
        <Button className={styles.modalBtn} onClick={handleNavigate}>
          Посмотреть меню
        </Button>
      </Modal>
      <AnimatePresence>
        {modalMenu && (
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
                damping: 20,
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
                damping: 20,
              }}
            >
              <MobileMenu setModalMenu={setModalMenu} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
