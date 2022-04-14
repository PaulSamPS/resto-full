import React, {MouseEvent} from 'react';
import {ReactComponent as ClockIcon} from '../../../helpers/icons/clock.svg';
import {DeliveryBlock} from '../../../components/DeliveryBlock/DeliveryBlock';
import {AnimatePresence, motion} from 'framer-motion';
import {AddressDeliveryProps} from './AddressDelivery.props';
import {AddressInputs} from './AddressInputs/AddressInputs';
import {useAppDispatch} from '../../../hooks/redux';
import {setDeliveryType} from '../../../redux/reducers/OrderSlice';
import {Button} from '../../../components/Button/Button';
import cn from 'classnames';
import styles from './AddressDelivery.module.scss';
import {AddressSelfDelivery} from './AddressSelfDelivery/AddressSelfDelivery';


export const AddressDelivery: React.FC<AddressDeliveryProps> = ({screenWidth}): JSX.Element => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const dispatch = useAppDispatch();

  const deliveryArr = [
    {id: 0, name: 'Доставка'},
    {id: 1, name: 'Самовывоз'}
  ];

  const variantsTime = {
    open: screenWidth <= 768 ? {opacity: 1, height: 'auto', marginTop: '30px'} : {opacity: 1, height: 'auto', marginTop: 0},
    closed: {opacity: 0, height: 0, marginTop: 0}
  };

  const handleActiveIndex = (index: number, e: MouseEvent<HTMLButtonElement>, name: string) => {
    setActiveIndex(index);
    e.preventDefault();
    dispatch(setDeliveryType(name));
  };

  React.useEffect(() => {
    dispatch(setDeliveryType('Доставка'));
  }, []);

  return (
    <DeliveryBlock>
      <h2 className={styles.title}>2. Доставка</h2>
      <div className={styles.deliveryWrapper}>
        <div className={styles.choose}>
          {deliveryArr.map((d, index) =>
            <Button
              className={cn(styles.btn, {
                [styles.activeBtn]: activeIndex === index
              })}
              key={d.id}
              onClick={(e: MouseEvent<HTMLButtonElement>) => handleActiveIndex(index, e, d.name)}
            >
              {d.name}
            </Button>
          )}
        </div>
        <AnimatePresence>
          <motion.div
            className={styles.time}
            animate={activeIndex === 0 ? 'open' : 'closed'}
            initial={'closed'}
            exit={'closed'}
            variants={variantsTime}
          >
            {activeIndex === 0 &&
              <>
                <ClockIcon/>
                <span>Доставим через  1 час 30 минут</span>
              </>
            }
          </motion.div>
        </AnimatePresence>
      </div>
      <AddressInputs activeIndex={activeIndex}/>
      <AddressSelfDelivery activeIndex={activeIndex}/>
    </DeliveryBlock>
  );
};
