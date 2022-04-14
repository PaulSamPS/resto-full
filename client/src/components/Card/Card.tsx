import React from 'react';
import {CardProps} from './Card.props';
import {useAppDispatch} from '../../hooks/redux';
import {getInfoProduct} from '../../redux/actions/ActionCreator';
import {motion} from 'framer-motion';
import {CardButtons} from './CardButtons/CardButtons';
import {CardCount} from './CardCount/CardCount';
import styles from './Card.module.scss';

export const Card: React.FC<CardProps> = ({product, count, setModal}): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemCount = count.filter((item) => item.id === product.id);

  const handleItemInfo = () => {
    dispatch(getInfoProduct(product.id));
    setModal(true);
  };


  return (
    <motion.div
      className={styles.wrapper}
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      viewport={{once: true}}
    >
      <div className={styles.img}>
        <img onClick={handleItemInfo} src={product.image} alt={product.name}/>
      </div>
      <div className={styles.info}>
        <div className={styles.top} >
          <h3>{product.name}</h3>
          <span>Вес: {product.weight} г</span>
        </div>
        <p className={styles.desc}>{product.description}</p>
      </div>
      <CardButtons className={styles.buttons} itemCount={itemCount} product={product}/>
      <CardCount itemCount={itemCount}/>
    </motion.div>
  );
};

