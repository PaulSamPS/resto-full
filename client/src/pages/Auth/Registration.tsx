import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import styles from './Auth.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registration } from '../../redux/actions/authAction';
import { IFormDataRegistration } from '../../interfaces/formData.interface';
import { Spinner } from '../../components/Spinner/Spinner';

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormDataRegistration>({ mode: 'onChange' });
  const { error, statusOk, isLoading } = useAppSelector((state) => state.registrationReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickRegistration = () => {
    navigate('/login');
  };

  const onSubmit = async (formData: IFormDataRegistration) => {
    await dispatch(registration(formData));
    reset();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (statusOk) {
    return <span>Активируйте ваш аккаунт, ссылка для активацию отправлена на ваш email указанный при регистрации</span>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.top}>
        <h1 className={styles.title}>Регистрация</h1>
        {error && <span className={styles.err}>{error}</span>}
      </div>
      <Input
        {...register('name', { required: { value: true, message: 'Введите имя' } })}
        placeholder='Логин'
        type='text'
        error={errors.name}
      />
      <Input
        {...register('email', { required: { value: true, message: 'Введите email' } })}
        placeholder='Email'
        type='email'
        error={errors.email}
      />
      <Input
        {...register('phone', { required: { value: true, message: 'Введите номер телефона' } })}
        placeholder='Номер телефона'
        type='tel'
        error={errors.phone}
      />
      <Input
        {...register('password', { required: { value: true, message: 'Введите пароль' } })}
        placeholder='Пароль'
        type='password'
        error={errors.password}
      />
      <div className={styles.submit}>
        <Button className={styles.btn} type='submit' disabled={!isValid}>
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.register}>
        Есть аккаунт?
        <span className={styles.forgotPassword} onClick={handleClickRegistration}>
          Войти
        </span>
      </div>
    </form>
  );
};
