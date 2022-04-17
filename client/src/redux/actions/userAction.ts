import $api from '../../http';
import { AppDispatch } from '../store';
import { IFormDataLogin } from '../../interfaces/formData.interface';
import { IAuthResponse } from '../interfaces/authResponse.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { IErrorResponse } from '../interfaces/errorResponse.interface';
import { userReducer } from '../reducers/userReducer';

export const login = (formdata: IFormDataLogin) => async (dispatch: AppDispatch) => {
  dispatch(userReducer.actions.setLogin());
  await $api
    .post<IAuthResponse>('/api/user/login', formdata)
    .then((res: AxiosResponse<IAuthResponse>) => {
      localStorage.setItem('token', res.data.accessToken);
      dispatch(userReducer.actions.setLoginSuccess(res.data.user));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(userReducer.actions.setLoginError(e.response?.data.message));
    });
};
