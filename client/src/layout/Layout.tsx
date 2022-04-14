import React from 'react';
import {Header} from './header/Header';
import {Footer} from './footer/Footer';
import {Outlet} from 'react-router-dom';
import {Nav} from '../components/Nav/Nav';
import styles from './Layout.module.scss';

export const Layout: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header/>
      <Nav/>
      <Outlet/>
      <Footer/>
    </div>
  );
};
