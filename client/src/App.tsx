import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Admin } from './pages/Admin/Admin';
import { Cart } from './pages/Cart/Cart';
import { Delivery } from './pages/Delivery/Delivery';
import { Main } from './pages/Main/Main';
import { User } from './pages/User/User';
import { Registration } from './pages/Auth/Registration';
import { Login } from './pages/Auth/Login';
import { SendEmailResetPassword } from './pages/Auth/SendEmailResetPassword';
import { PasswordChange } from './pages/Auth/PasswordChange';
import { useAppSelector } from './hooks/redux';

export const App: React.FC = (): JSX.Element => {
  const { user, isAuth } = useAppSelector((state) => state.userReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='cart' element={<Cart />} />
          <Route path='delivery' element={<Delivery />} />
          {user.role === 'ADMIN' && <Route path='admin' element={<Admin />} />}
          {isAuth && <Route path='user' element={<User />} />}
          <Route path='registration' element={<Registration />} />
          <Route path='login' element={<Login />} />
          <Route path='send-email-reset-password' element={<SendEmailResetPassword />} />
          <Route path='password-change' element={<PasswordChange />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
