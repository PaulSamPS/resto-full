import React from 'react';
import styles from './AcceptedOrder.module.scss';
import {useNavigate} from 'react-router-dom';

export const AcceptedOrder: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const clickNavigate = () => {
    navigate('/my-orders');
  };

  return (
    <div className={styles.wrapper}>
      <h2>Ваш заказ принят</h2>
      <span onClick={clickNavigate}>Мои заказы</span>
    </div>
  );
};
