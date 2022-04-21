import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../redux/actions/authAction';
import { IFormDataLogin } from '../../interfaces/formData.interface';
import styles from './Auth.module.scss';
import { Spinner } from '../../components/Spinner/Spinner';
import { setActiveCategory } from '../../redux/reducers/categoryReducer';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormDataLogin>({ mode: 'onChange' });
  const { error, isLoading, statusOk } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickRegistration = () => {
    navigate('/registration');
  };

  const onSubmit = async (formData: IFormDataLogin) => {
    await dispatch(login(formData));
    reset();
  };

  React.useEffect(() => {
    dispatch(setActiveCategory(0));
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (statusOk) {
    navigate('/');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.top}>
        <h1 className={styles.title}>Логин</h1>
        {error && <span className={styles.err}>{error}</span>}
      </div>
      <Input
        {...register('name', { required: { value: true, message: 'Введите имя' } })}
        placeholder='Логин'
        type='text'
        error={errors.name}
      />
      <Input
        {...register('password', { required: { value: true, message: 'Введите пароль' } })}
        placeholder='Пароль'
        type='password'
        error={errors.password}
      />
      <div className={styles.submit}>
        <Button className={styles.btn} type='submit' disabled={!isValid}>
          Войти
        </Button>
        <span className={styles.forgotPassword} onClick={() => navigate('/send-email-reset-password')}>
          Забыли пароль?
        </span>
      </div>
      <div className={styles.register}>
        Нет аккаунта?
        <span className={styles.forgotPassword} onClick={handleClickRegistration}>
          Регистрация
        </span>
      </div>
    </form>
  );
};
