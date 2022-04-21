import React from 'react';
import { DesktopHeader } from './header/DesktopHeader';
import { Footer } from './footer/Footer';
import { Outlet } from 'react-router-dom';
import { Category } from '../components/Category/Category';
import styles from './Layout.module.scss';
import { MobileHeader } from './header/MobileHeader';

export const Layout = (): JSX.Element => {
  const [screenWidth, setScreenWidth] = React.useState<number>(0);

  const resizeWindow = () => {
    setScreenWidth(window.innerWidth);
  };

  React.useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  return (
    <div className={styles.container}>
      {screenWidth >= 1024 ? <DesktopHeader /> : <MobileHeader />}
      <Category />
      <Outlet />
      <Footer />
    </div>
  );
};
