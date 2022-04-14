import React from 'react';
import {ReactComponent as CallingIcon} from '../../../helpers/icons/calling.svg';
import styles from './Contacts.module.scss';

export const Contacts: React.FC = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <CallingIcon/>
      </div>
      <div className={styles.phoneWrapper}>
        <span>Контакты:</span>
        <span className={styles.phoneNumber}>+7 (912) 345-67-89</span>
      </div>
    </div>
  );
};
