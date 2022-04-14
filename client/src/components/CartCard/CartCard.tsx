import React from 'react';
import {ReactComponent as MinusIcon} from '../../helpers/icons/minus.svg';
import {ReactComponent as PlusIcon} from '../../helpers/icons/plus.svg';
import {priceRu} from '../../helpers/priceRu';
import {ReactComponent as DeleteIcon} from '../../helpers/icons/delete.svg';
import {CartCardProps} from './CartCard.props';
import {deleteItem, minusItem, setCart} from '../../redux/reducers/CartSlice';
import {useAppDispatch} from '../../hooks/redux';
import {getInfoProduct} from '../../redux/actions/ActionCreator';
import {AnimatePresence, motion} from 'framer-motion';
import styles from './CartCard.module.scss';
import cn from 'classnames';

export const CartCard: React.FC<CartCardProps> = ({product, setModal}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [del, setDel] = React.useState<boolean>(false);

  const variants = {
    open: {opacity: 1},
    closed: {opacity: 0}
  };

  const handleItemInfo = () => {
    dispatch(getInfoProduct(product.id));
    setModal(true);
  };

  const addProductToCart = () => {
    dispatch(setCart(product));
  };

  const handleMinusItem = () => {
    dispatch(minusItem(product));
  };

  const handleDeleteItem = () => {
    setDel(true);
    dispatch(deleteItem(product));
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.wrapper}
        animate={del ? 'closed' : 'open'}
        initial={'open'}
        exit={'closed'}
        variants={variants}
        transition={{
          duration: 1
        }}
      >
        <img className={styles.image} src={product.image} alt={product.name} onClick={handleItemInfo}/>
        <div className={styles.info}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        <div className={styles.countBlock}>
          <div className={cn(styles.count, {
            [styles.countOpacity]: product.qty <= 1
          })}
          onClick={handleMinusItem}
          >
            <MinusIcon/>
          </div>
          <span>{product.qty}</span>
          <div className={styles.count} onClick={addProductToCart}><PlusIcon/></div>
        </div>
        <h2 className={styles.totalPrice}>{priceRu(product.price * product.qty)}</h2>
        <div className={styles.delete} onClick={handleDeleteItem}><DeleteIcon/></div>
      </motion.div>
    </AnimatePresence>
  );
};
