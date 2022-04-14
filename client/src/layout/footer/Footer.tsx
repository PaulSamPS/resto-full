import React from 'react';
import {CustomLink} from '../../components/CustomLink/CustomLink';
import styles from './Footer.module.scss';

export const Footer: React.FC = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <CustomLink to={'#'}>О ресторане</CustomLink>
      <CustomLink to={'#'}>Условия доставки</CustomLink>
      <CustomLink to={'#'}>Возврат товара</CustomLink>
      <CustomLink to={'#'}>Акции</CustomLink>
    </div>
  );
};

