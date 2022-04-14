import React from 'react';
import styles from './Spinner.module.scss';

export const Spinner: React.FC = (): JSX.Element => {
  return (
    <div className={styles.spinner}/>
  );
};
