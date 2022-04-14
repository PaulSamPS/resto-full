import React from 'react';
import {CardInfoButtonsProps} from './CardInfoButtons.props';
import {AnimatePresence, motion} from 'framer-motion';
import {Button} from '../../Button/Button';
import {ReactComponent as MinusIcon} from '../../../helpers/icons/minus.svg';
import {priceRu} from '../../../helpers/priceRu';
import {ReactComponent as PlusIcon} from '../../../helpers/icons/plus.svg';
import {useAppDispatch} from '../../../hooks/redux';
import {minusItem, setCart} from '../../../redux/reducers/CartSlice';
import styles from './CardInfoButtons.module.scss';

export const CardInfoButtons: React.FC<CardInfoButtonsProps> = ({product, itemCount}): JSX.Element => {
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
    <AnimatePresence>
      {itemCount && itemCount.length > 0 ?
        <motion.div
          className={styles.buttons}
          animate={itemCount && itemCount.length > 0 ? 'show' : 'hide'}
          variants={variants}
          initial={'hide'}
          exit={'show'}
          transition={{
            duration: 1
          }}
        >
          <Button appearance={'count'} onClick={handleMinusItem}><MinusIcon/></Button>
          <h3>{priceRu(product.price)}</h3>
          <Button appearance={'count'} onClick={addProductToCart}><PlusIcon/></Button>
          {itemCount && itemCount.map((i) =>
            <div className={styles.count} key={i.id}>{i.qty}</div>
          )}
        </motion.div> :
        <div className={styles.buttons}>
          <Button appearance={'cardInfo'} onClick={addProductToCart}>Корзина</Button>
          <h3>{priceRu(product.price)}</h3>
        </div>
      }
    </AnimatePresence>
  );
};

