import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {CardCountProps} from './CardCount.props';
import cn from 'classnames';
import styles from '../Card.module.scss';

export const CardCount: React.FC<CardCountProps> = ({itemCount, className}): JSX.Element => {
  const variants = {
    show: {opacity: 1},
    hide: {opacity: 0},
  };

  return (
    <>
      {itemCount && itemCount.map((i) =>
        <AnimatePresence key={i.id}>
          {itemCount &&
            <motion.div
              className={cn(styles.count, className)}
              animate={itemCount ? 'show' : 'hide'}
              variants={variants}
              initial={'hide'}
              exit={'show'}
              transition={{
                duration: .5
              }}
            >
              {i.qty}
            </motion.div>
          }
        </AnimatePresence>
      )}
    </>
  );
};

