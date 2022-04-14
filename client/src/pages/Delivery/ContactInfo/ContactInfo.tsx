import React from 'react';
import {DeliveryBlock} from '../../../components/DeliveryBlock/DeliveryBlock';
import {useFormContext} from 'react-hook-form';
import {IAddressDeliveryInterfaces} from '../AddressDelivery/AddressDelivery.interfaces';
import {Input} from '../../../components/Input/Input';
import styles from './ContactInfo.module.scss';

export const ContactInfo: React.FC = (): JSX.Element => {
  const {register, formState: {errors}} = useFormContext<IAddressDeliveryInterfaces>();

  const nameRegexp = /^[а-яА-яЁё]+$/;
  const phoneRegexp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;

  return (
    <DeliveryBlock>
      <h2 className={styles.title}>1. Контактная информация</h2>
      <div className={styles.contactInfo}>
        <Input
          {...register('name', {
            required: {value: true, message: 'Введите имя'},
            pattern: {
              value: nameRegexp,
              message: 'Только буквы русского алфавита без пробела'
            }
          })}
          error={errors.name}
          className={styles.input}
          placeholder='Имя*'
          type='text'
        />
        <Input
          {...register('phone', {
            required: {value: true, message: 'Введите номер телефона'},
            pattern: {
              value: phoneRegexp,
              message: 'Некорректный номера телефона'
            }
          })}
          error={errors.phone}
          className={styles.input}
          placeholder='Телефон*'
          type='tel'
        />
      </div>
    </DeliveryBlock>
  );
};
