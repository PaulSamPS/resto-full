import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {AddressInputsProps} from './AddressInputs.props';
import {useAppSelector} from '../../../../hooks/redux';
import {useFormContext} from 'react-hook-form';
import {IAddressDeliveryInterfaces} from '../AddressDelivery.interfaces';
import {Input} from '../../../../components/Input/Input';
import styles from './AddressInput.module.scss';

export const AddressInputs: React.FC<AddressInputsProps> = ({activeIndex}): JSX.Element => {
  const {address} = useAppSelector((state) => state.addressReducer);
  const {register, formState: {errors}} = useFormContext<IAddressDeliveryInterfaces>();

  const variants = {
    open: {opacity: 1, height: 'auto'},
    closed: {opacity: 0, height: 0}
  };

  const addressDefaultValue = address.street && address.settlement_with_type != null ?
      `${address.settlement_with_type}, ${address.street_type} ${address.street}` :
      address.street && `${address.street_type} ${address.street}`;

  const houseDefaultValue = address.house && `${address.house_type} ${address.house}`;
  const officeDefaultValue = address.flat && `${address.flat_type} ${address.flat}`;

  return (
    <AnimatePresence>
      {activeIndex === 0 &&
        <motion.div
          className={styles.address}
          animate={activeIndex === 0 ? 'open' : 'closed'}
          initial={'closed'}
          exit={'closed'}
          variants={variants}
          transition={{
            damping: 20,
            type: 'spring',
            stiffness: 260,
          }}
        >
          <h2 className={styles.title}>Адрес доставки</h2>
          <Input
            {...register('street', {required: {value: true, message: 'Укажите улицу'}})}
            placeholder='Укажите улицу*'
            type='text'
            error={errors.street}
            className={styles.street}
            defaultValue={addressDefaultValue}
          />
          <Input
            {...register('house', {required: {value: true, message: 'Укажите номер дома'}})}
            placeholder='№ дома*'
            type='text'
            error={errors.house}
            className={styles.house}
            defaultValue={houseDefaultValue}
          />
          <Input
            {...register('office')}
            placeholder='№ квартиры/офиса'
            type='text'
            className={styles.office}
            defaultValue={officeDefaultValue}
          />
          <Input
            {...register('entrance')}
            placeholder='Подъезд'
            type='text'
            className={styles.entrance}
          />
          <Input
            {...register('level')}
            placeholder='Этаж'
            type='text'
            className={styles.level}
          />
          <Input
            {...register('comment')}
            placeholder='Комментарий'
            type='text'
            className={styles.comment}
          />
        </motion.div>
      }
    </AnimatePresence>
  );
};
