import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import styles from './Auth.module.scss';
import { useNavigate } from 'react-router-dom';

export const PasswordChange = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<boolean>(false);

  const navigateToLogin = () => {
    navigate('/login');
  };

  const onSubmit = async (formData: any) => {
    await axios
      .post('http://localhost:5000/api/user/password-change', formData)
      .then((res) => {
        if (res.status == 200) {
          setStatus(true);
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  if (status) {
    return (
      <>
        Пароль изменён, теперь вы можете
        <span className={styles.forgotPassword} onClick={navigateToLogin} style={{ marginLeft: '10px' }}>
          Войти
        </span>
      </>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.top}>
        <h1 className={styles.title}>Новый пароль</h1>
        {error && <span className={styles.err}>{error}</span>}
      </div>
      <Input
        {...register('password', { required: { value: true, message: 'Введите новый пароль' } })}
        placeholder='Введите новый пароль'
        type='password'
        error={errors.password}
      />
      <div className={styles.submit}>
        <Button className={styles.btn} type='submit' disabled={!isValid}>
          Изменить пароль
        </Button>
      </div>
    </form>
  );
};
