import React from 'react';
import styles from './ButtonMobile.module.scss';
import {ButtonMobileProps} from './ButtonMobile.props';
import {ReactComponent as CartIcon} from '../../helpers/icons/mobileCart.svg';
import {ReactComponent as BurgerIcon} from '../../helpers/icons/burger.svg';
import cn from 'classnames';

export const ButtonMobile = ({appearance, totalCount, children, className, ...props}: ButtonMobileProps): JSX.Element => {
  return (
    <button className={cn(styles.button, className, {
      [styles.cartMobile]: appearance === 'cartMobile',
      [styles.burger]: appearance === 'burger'
    })} { ...props }>
      {appearance === 'cartMobile' &&
        <>
          {totalCount && totalCount > 0 ?
            <div className={styles.cart}>
              <span className={styles.totalCount}>{totalCount}</span>
            </div> :
            <CartIcon/>
          }
          <div className={styles.borderMobile}/>
          {children}
        </>
      }
      {appearance === 'burger' && <BurgerIcon/>}
    </button>
  );
};
