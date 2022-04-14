import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import styles from './CardButtons.module.scss';
import {Button} from '../../Button/Button';
import {ReactComponent as MinusIcon} from '../../../helpers/icons/minus.svg';
import {ReactComponent as PlusIcon} from '../../../helpers/icons/plus.svg';
import {CardButtonsProps} from './CardButtons.props';
import {minusItem, setCart} from '../../../redux/reducers/CartSlice';
import {useAppDispatch} from '../../../hooks/redux';

export const CardButtons: React.FC<CardButtonsProps> = ({product, itemCount, className, ...props}): JSX.Element => {
  const dispatch = useAppDispatch();

  const variants = {
    show: {opacity: 1},
    hide: {opacity: 0},
  };

  const addProductToCart = () => {
    dispatch(setCart(product));
  };

  const handleMinusItem = () => {
    dispatch(minusItem(product));
  };

  return (
    <div className={className} {...props}>
      <AnimatePresence>
        {itemCount.length > 0 ?
            <motion.div
              className={styles.bottomCount}
              animate={itemCount.length > 0 ? 'show' : 'hide'}
              variants={variants}
              initial={'hide'}
              exit={'show'}
              transition={{duration: 1}}
            >
              <Button appearance={'count'} className={styles.btn} onClick={handleMinusItem}>
                <MinusIcon/>
              </Button>
              <span>{product.price} ₽</span>
              <Button appearance={'count'} className={styles.btn} onClick={addProductToCart}>
                <PlusIcon/>
              </Button>
            </motion.div> :
            <div className={styles.bottom}>
              <span>{product.price} ₽</span>
              <Button appearance={'card'} className={styles.btn} onClick={addProductToCart}>
                В корзину
              </Button>
            </div>
        }
      </AnimatePresence>
    </div>
  );
};

