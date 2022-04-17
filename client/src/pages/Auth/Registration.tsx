import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import styles from './Auth.module.scss';

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleClickRegistration = () => {
    navigate('/login');
  };

  const onSubmit = async (formData: any) => {
    await axios
      .post('http://localhost:5000/api/user/registration', formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {error && <span className={styles.err}>{error}</span>}
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
