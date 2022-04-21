import React from 'react';
import { ContactInfo } from './ContactInfo/ContactInfo';
import { AddressDelivery } from './AddressDelivery/AddressDelivery';
import { PayDelivery } from './Pay/PayDelivery';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Checkout } from './Checkout/Checckout';
import { IAddressDeliveryInterfaces } from './AddressDelivery/AddressDelivery.interfaces';
import styles from './Delivery.module.scss';

export const Delivery: React.FC = (): JSX.Element => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  const methods = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<any> = (data: IAddressDeliveryInterfaces) => {
    console.log(data);
  };

  const resizeWindow = () => {
    setScreenWidth(window.innerWidth);
  };

  React.useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  return (
    <div className={styles.wrapper}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h1 className={styles.title}>Оформление заказа</h1>
          <ContactInfo />
          <AddressDelivery screenWidth={screenWidth} />
          <PayDelivery screenWidth={screenWidth} />
          <Checkout />
        </form>
      </FormProvider>
    </div>
  );
};
