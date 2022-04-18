import $api from '../../http';
import { AppDispatch } from '../store';
import { IFormDataLogin, IFormDataRegistration, IFormDataResetEmail } from '../../interfaces/formData.interface';
import { IAuthResponse } from '../interfaces/authResponse.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { IErrorResponse } from '../interfaces/errorResponse.interface';
import { loginReducer } from '../reducers/auth/loginReducer';
import { registrationReducer } from '../reducers/auth/registrationReducer';
import { resetEmailReducer } from '../reducers/auth/resetEmailReducer';
import { logoutReducer } from '../reducers/auth/logoutReducer';

export const login = (formdata: IFormDataLogin) => async (dispatch: AppDispatch) => {
  dispatch(loginReducer.actions.setLogin());
  await $api
    .post<IAuthResponse>('/api/auth/login', formdata)
    .then((res: AxiosResponse<IAuthResponse>) => {
      localStorage.setItem('token', res.data.accessToken);
      dispatch(loginReducer.actions.setLoginSuccess(res.data.user));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(loginReducer.actions.setLoginError(e.response?.data.message));
    });
};

export const registration = (formdata: IFormDataRegistration) => async (dispatch: AppDispatch) => {
  dispatch(registrationReducer.actions.setRegistration());
  await $api
    .post('/api/auth/registration', formdata)
    .then(() => {
      dispatch(registrationReducer.actions.setRegistrationSuccess());
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(registrationReducer.actions.setRegistrationError(e.response?.data.message));
    });
};

export const resetEmail = (formdata: IFormDataResetEmail) => async (dispatch: AppDispatch) => {
  dispatch(resetEmailReducer.actions.setResetEmail());
  await $api
    .post('/api/auth/reset', formdata)
    .then(() => {
      dispatch(resetEmailReducer.actions.setResetEmailSuccess());
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(resetEmailReducer.actions.setResetEmailError(e.response?.data.message));
    });
};

export const logout = (name: string, refreshToken: string) => async (dispatch: AppDispatch) => {
  dispatch(logoutReducer.actions.setLogout());
  await $api
    .post('/api/auth/logout', { name, refreshToken })
    .then(() => {
      localStorage.removeItem('token');
      dispatch(loginReducer.actions.setLoginClear());
      dispatch(logoutReducer.actions.setLogoutSuccess());
    })
    .catch((e: Error) => {
      dispatch(logoutReducer.actions.setLogoutError(e.message));
    });
};
