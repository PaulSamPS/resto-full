import React from 'react';
import { CardProps } from './Card.props';
import { motion } from 'framer-motion';
import styles from './Card.module.scss';
import { CardButtons } from './CardButtons/CardButtons';

export const Card: React.FC<CardProps> = ({ product, count, setModal }): JSX.Element => {
  return (
    <motion.div className={styles.wrapper} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <div className={styles.img}>
        <img src={`http://localhost:5000/products/${product.img}`} alt={product.name} />
      </div>
      <div className={styles.info}>
        <div className={styles.top}>
          <h3>{product.name}</h3>
          <span>Вес: {product.weight} г</span>
        </div>
        <p className={styles.desc}>{product.description}</p>
      </div>
      <CardButtons product={product} className={styles.buttons} />
    </motion.div>
  );
};
