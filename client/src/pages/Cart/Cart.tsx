import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {ProductInterface} from '../../interfaces/product.interface';
import {useNavigate} from 'react-router-dom';
import {CartCard} from '../../components/CartCard/CartCard';
import {PlaceOrder} from '../../components/PlaceOrder/PlaceOrder';
import {setActiveNav} from '../../redux/reducers/NavSlice';
import {Modal} from '../../components/Modal/Modal';
import {CardInfo} from '../../components/CardInfo/CardInfo';
import {getProduct} from '../../redux/actions/ActionCreator';
import {motion, AnimatePresence} from 'framer-motion';
import {Button} from '../../components/Button/Button';
import styles from './Cart.module.scss';

export const Cart: React.FC = (): JSX.Element => {
  const [modal, setModal] = React.useState<boolean>(false);
  const {cart} = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const variants = {
    show: {opacity: 1},
    hide: {opacity: 0},
  };

  const goToMenu = () => {
    dispatch(setActiveNav(0));
    dispatch(getProduct());
    navigate('/');
  };

  React.useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
      dispatch(setActiveNav(0));
    }
  }, []);

  return (
    <motion.div
      className={styles.wrapper}
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      viewport={{once: true}}
    >
      <AnimatePresence>
        {cart.length !== 0 ?
          <>
            <h1 className={styles.title}>Корзина</h1>
            <div className={styles.cardWrapper}>
              {cart.map((p: ProductInterface) => <CartCard key={p.id} product={p} setModal={setModal}/>)}
            </div>
            <PlaceOrder/>
          </> :
          <motion.div
            className={styles.emptyCart}
            animate={cart.length !== 0 ? 'hide' : 'show'}
            variants={variants}
            initial={'hide'}
            exit={'show'}
            transition={{
              duration: 2
            }}
          >
            <img src={'assets/emptyCart.png'} alt='Корзина пуста'/>
            <h2>Корзина пуста</h2>
            <Button onClick={goToMenu}>Посмотреть меню</Button>
          </motion.div>
        }
      </AnimatePresence>
      <Modal setModal={setModal} modal={modal}>
        <CardInfo count={cart}/>
      </Modal>
    </motion.div>
  );
};

