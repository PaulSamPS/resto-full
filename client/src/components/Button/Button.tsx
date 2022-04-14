import React from 'react';
import styles from './Button.module.scss';
import {ButtonProps} from './Button.props';
import {ReactComponent as CartIcon} from '../../helpers/icons/buy.svg';
import {ReactComponent as BagIcon} from '../../helpers/icons/shoppingBag.svg';
import cn from 'classnames';

export const Button = ({appearance, totalCount, children, className, ...props}: ButtonProps): JSX.Element => {
  return (
    <button className={cn(styles.button, className, {
      [styles.count]: appearance === 'count'
    })} { ...props }
    >
      {children}
      {appearance === 'card' && <div className={styles.card}><CartIcon/></div>}
      {appearance === 'cardInfo' &&
          <>
            <div className={styles.border}/>
            <div className={styles.cardInfo}><BagIcon/></div>
          </>
      }
      {appearance === 'cart' &&
        <>
          <div className={styles.border}/>
          <div className={styles.cart}>
            <span className={styles.totalCount}>{totalCount}</span>
          </div>
        </>
      }
    </button>
  );
};
