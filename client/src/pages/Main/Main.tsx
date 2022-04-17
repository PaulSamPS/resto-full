import React from 'react';
import { MainProps } from './Main.props';
import styles from './Main.module.scss';

export const Main: React.FC<MainProps> = (): JSX.Element => {
  return <div className={styles.wrapper}>Main</div>;
};
