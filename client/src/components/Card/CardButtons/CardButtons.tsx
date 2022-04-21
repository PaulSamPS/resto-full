import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './CardButtons.module.scss';
import { Button } from '../../Button/Button';
import { ReactComponent as MinusIcon } from '../../../helpers/icons/minus.svg';
import { ReactComponent as PlusIcon } from '../../../helpers/icons/plus.svg';
import { CardButtonsProps } from './CardButtons.props';
import { priceRu } from '../../../helpers/priceRu';

export const CardButtons: React.FC<CardButtonsProps> = ({ product, className, ...props }): JSX.Element => {
  const variants = {
    show: { opacity: 1 },
    hide: { opacity: 0 },
  };
  const itemCount = 0;

  return (
    <div className={className} {...props}>
      <AnimatePresence>
        {itemCount > 0 ? (
          <motion.div
            className={styles.bottomCount}
            animate={itemCount > 0 ? 'show' : 'hide'}
            variants={variants}
            initial={'hide'}
            exit={'show'}
            transition={{ duration: 1 }}
          >
            <Button appearance={'count'} className={styles.btn}>
              <MinusIcon />
            </Button>
            <span>{priceRu(product.price)}</span>
            <Button appearance={'count'} className={styles.btn}>
              <PlusIcon />
            </Button>
          </motion.div>
        ) : (
          <div className={styles.bottom}>
            <span>{priceRu(product.price)}</span>
            <Button appearance={'card'} className={styles.btn}>
              В корзину
            </Button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
