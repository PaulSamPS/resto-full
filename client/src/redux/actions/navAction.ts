import { AppDispatch } from '../store';
import { categoryReducer } from '../reducers/categoryReducer';
import { AxiosError, AxiosResponse } from 'axios';
import { ICategory } from '../../interfaces/category.interface';
import { IErrorResponse } from '../interfaces/errorResponse.interface';
import $api from '../../http';

export const getCategory = () => async (dispatch: AppDispatch) => {
  dispatch(categoryReducer.actions.setCategory());
  await $api
    .get(`/api/category`)
    .then((res: AxiosResponse<ICategory[]>) => {
      dispatch(categoryReducer.actions.setCategorySuccess(res.data));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(categoryReducer.actions.setCategoryError(e.response?.data.message));
    });
};
