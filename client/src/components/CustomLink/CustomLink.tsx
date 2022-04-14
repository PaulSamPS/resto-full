import React from 'react';
import {Link, useMatch} from 'react-router-dom';
import {CustomLinkProps} from './CustomLink.props';
import cn from 'classnames';
import styles from './CustomLink.module.scss';

export const CustomLink = ({children, className, to, ...props}: CustomLinkProps): JSX.Element => {
  const match = useMatch(to);
  return (
    <Link to={to} className={cn(styles.link, className, {
      [styles.active]: match
    })} {...props}>
      {children}
    </Link>
  );
};
