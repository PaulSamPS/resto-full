import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import styles from './Auth.module.scss';

export const SendEmailResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (formData: any) => {
    await axios
      .post('http://localhost:5000/api/user/reset', formData)
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
        {...register('email', { required: { value: true, message: 'Введите email' } })}
        placeholder='Введите ваш email'
        type='text'
        error={errors.email}
      />
      <div className={styles.submit}>
        <Button className={styles.btn} type='submit' disabled={!isValid}>
          Отправить
        </Button>
      </div>
    </form>
  );
};
