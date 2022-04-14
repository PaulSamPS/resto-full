import React from 'react';
import {priceRu} from '../../helpers/priceRu';
import {PlaceOrderProps} from './PlaceOrder.props';
import {useAppSelector} from '../../hooks/redux';
import {useNavigate} from 'react-router-dom';
import {Button} from '../Button/Button';
import {AnimatePresence, motion} from 'framer-motion';
import styles from './PlaceOrder.module.scss';

export const PlaceOrder: React.FC<PlaceOrderProps> = (): JSX.Element => {
  const {totalPrice} = useAppSelector((state) => state.cartReducer);
  const navigate = useNavigate();

  const variants = {
    show: {opacity: 1, height: 'auto'},
    hide: {opacity: 0, height: 0},
  };

  return (
    <div className={styles.wrapper}>
      <>
        <div className={styles.totalSum}>
          <span>Итого: </span>
          <span className={styles.totalPrice}>{priceRu(totalPrice)}</span>
        </div>
        <div className={styles.minSum}>
          <span>Минимальная сума заказа 1500 ₽</span>
          <AnimatePresence>
            {totalPrice < 1500 &&
              <motion.span
                className={styles.minOrder}
                animate={totalPrice < 1500 ? 'show' : 'hide'}
                variants={variants}
                initial={'hide'}
                exit={'hide'}
                transition={{
                  duration: .5
                }}
              >
                До минимального заказа не хватает:
                <span> {priceRu(1500 - totalPrice)}</span>
              </motion.span>
            }
          </AnimatePresence>
        </div>
      </>
      <Button disabled={totalPrice < 1500} className={styles.btn} onClick={() => navigate('/delivery')}>Оформить заказ</Button>
    </div>
  );
};
