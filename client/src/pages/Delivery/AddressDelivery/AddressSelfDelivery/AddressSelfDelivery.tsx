import React from 'react';
import {Map, Placemark, TypeSelector, YMaps, ZoomControl} from 'react-yandex-maps';
import {AddressSelfDeliveryProps} from './AddressSelfDelivery.props';
import {AnimatePresence, motion} from 'framer-motion';
import styles from './AddressSelfDelivery.module.scss';

export const AddressSelfDelivery: React.FC<AddressSelfDeliveryProps> = ({activeIndex}): JSX.Element => {
  const variants = {
    open: {opacity: 1, height: 'auto'},
    closed: {opacity: 0, height: 0}
  };

  return (
    <AnimatePresence>
      {activeIndex === 1 &&
          <motion.div
            className={styles.yMap}
            animate={activeIndex === 1 ? 'open' : 'closed'}
            initial={'closed'}
            exit={'closed'}
            variants={variants}
            transition={{
              damping: 20,
              type: 'spring',
              stiffness: 260,
            }}
          >
            <span className={styles.address}>г Оренбург, проезд Коммунаров, д 51</span>
            <YMaps query={{apikey: 'e07291bb-96f5-473e-9bd7-f36aa1867dc0'}}>
              <Map defaultState={{
                center: [51.769082357546345, 55.089413188397714],
                zoom: 17
              }}
              >
                <Placemark geometry={[51.769082357546345, 55.089413188397714]}/>
                <ZoomControl/>
                <TypeSelector/>
              </Map>
            </YMaps>
          </motion.div>
      }
    </AnimatePresence>
  );
};
