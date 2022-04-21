import React from 'react';
import { MainProps } from './Main.props';
import styles from './Main.module.scss';

import { Card } from '../../components/Card/Card';
import { Spinner } from '../../components/Spinner/Spinner';

export const Main = ({ product, isLoading }: MainProps): JSX.Element => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{product.map((p) => p.category)[0]}</h1>
      <div className={styles.cardWrapper}>
        {product.map((p) => (
          <Card key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
