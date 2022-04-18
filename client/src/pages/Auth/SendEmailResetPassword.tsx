import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import styles from './Auth.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetEmail } from '../../redux/actions/authAction';
import { IFormDataResetEmail } from '../../interfaces/formData.interface';
import { Spinner } from '../../components/Spinner/Spinner';

export const SendEmailResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormDataResetEmail>({ mode: 'onChange' });
  const { error, isLoading, statusOk } = useAppSelector((state) => state.resetEmailReducer);
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: IFormDataResetEmail) => {
    await dispatch(resetEmail(formData));
    reset();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (statusOk) {
    return <span>Ссылка для смены пароля отправлена на ваш email</span>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.top}>
        <h1 className={styles.title}>Сброс пароля</h1>
        {error && <span className={styles.err}>{error}</span>}
      </div>
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
