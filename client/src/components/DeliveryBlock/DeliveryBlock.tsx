import React from 'react';
import {DeliveryBlockTypes} from './DeliveryBlock.types';
import {motion} from 'framer-motion';
import styles from './DeliveryBlock.module.scss';

export const DeliveryBlock: React.FC<DeliveryBlockTypes> = ({children}): JSX.Element => {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      viewport={{once: true}}
    >
      {children}
    </motion.div>
  );
};

