import React, {MouseEvent} from 'react';
import {DeliveryBlock} from '../../../components/DeliveryBlock/DeliveryBlock';
import {PayDeliveryProps} from './PayDelivery.props';
import {useAppDispatch} from '../../../hooks/redux';
import {setPayment} from '../../../redux/reducers/OrderSlice';
import cn from 'classnames';
import styles from './PayDelivery.module.scss';
import {Button} from '../../../components/Button/Button';

export const PayDelivery: React.FC<PayDeliveryProps> = ({screenWidth}): JSX.Element => {
  const [activeIndexPay, setActiveIndexPay] = React.useState<number>(0);
  const dispatch = useAppDispatch();

  const payArr = [
    {id: 0, name: 'Оплата онлайн', mobileName: 'Онлайн'},
    {id: 1, name: 'Курьеру картой', mobileName: 'Картой'},
    {id: 2, name: 'Наличными', mobileName: 'Наличными'}
  ];

  const handleActiveIndexPay = (index: number, e: MouseEvent<HTMLButtonElement>, name: string) => {
    setActiveIndexPay(index);
    e.preventDefault();
    dispatch(setPayment(name));
  };

  return (
    <DeliveryBlock>
      <>
        <h2 className={styles.title}>3. Оплатить</h2>
        <div className={styles.choose}>
          {payArr.map((d, index) =>
            <Button
              className={cn(styles.btn, {
                [styles.activeBtn]: activeIndexPay === index
              })}
              key={d.id}
              onClick={(e: MouseEvent<HTMLButtonElement>) => handleActiveIndexPay(index, e, d.name)}
            >
              {screenWidth <= 768 ? d.mobileName : d.name}
            </Button>
          )}
        </div>
      </>
    </DeliveryBlock>
  );
};
