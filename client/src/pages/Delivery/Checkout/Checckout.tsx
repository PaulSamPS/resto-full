import React from 'react';
import {DeliveryBlock} from '../../../components/DeliveryBlock/DeliveryBlock';
import {useFormContext} from 'react-hook-form';
import {IAddressDeliveryInterfaces} from '../AddressDelivery/AddressDelivery.interfaces';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button} from '../../../components/Button/Button';
import styles from './Checkout.module.scss';
import cn from 'classnames';

export const Checkout: React.FC = () : JSX.Element => {
  const [check, setCheck] = React.useState<boolean>(false);
  const {register, formState: {errors}} = useFormContext<IAddressDeliveryInterfaces>();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCheck = React.useCallback(() => {
    setCheck(!check);
  }, [check]);

  if (location.pathname !== '/delivery') {
    navigate('/');
  }

  return (
    <DeliveryBlock>
      <div className={styles.wrapper}>
        <div className={styles.conditions}>
          <input
            {...register('check', {required: {value: true, message: 'Вы должны принять соглашение'}})}
            type={'checkbox'}
            className={styles.checkbox}
            checked={check}
            onChange={handleCheck}
          />
          <label className={cn(styles.label, {[styles.errorCheckbox]: errors.check && !check})} htmlFor={'checkbox'}/>
          {errors.check && !check && <span className={styles.error}>{errors.check.message}</span>}
          <div className={styles.conditionsText}>
            <span>Я согласен на обработку моих перс. данных в соответствии с</span>
            <a> Условиями</a>
          </div>
        </div>
        <Button disabled={!check} className={styles.btn} type={'submit'}>Оформить заказ</Button>
      </div>
    </DeliveryBlock>
  );
};
