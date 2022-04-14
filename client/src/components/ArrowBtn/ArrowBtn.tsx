import React from 'react';
import {ArrowBtnType} from './ArrowBtn.type';
import {ReactComponent as ArrowIcon} from '../../helpers/icons/arrow.svg';
import styles from './ArrowBtn.module.scss';

export const ArrowBtn = ({children}: ArrowBtnType): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>
        <ArrowIcon/>
      </button>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

