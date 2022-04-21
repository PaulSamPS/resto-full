import { AppDispatch } from '../store';
import { IProductResponse } from '../../interfaces/product.interface';
import { productSlice } from '../reducers/ProductSlice';
import axios, { AxiosResponse } from 'axios';
import { geoSlice } from '../reducers/GeoSlice';
import { orderSuccessSlice } from '../reducers/OrderSuccess';
import { IOrderSuccess } from '../../interfaces/order.interface';
import $api from '../../http';

export const getProduct = (category?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(productSlice.actions.setProduct());
    await $api.get(`/api/product?category=${category ? category : 'Напитки'}`).then((res: AxiosResponse<IProductResponse>) => {
      dispatch(productSlice.actions.setProductSuccess(res.data.rows));
    });
  } catch (e) {
    const error = e as Error;
    dispatch(productSlice.actions.setProductError(error.message));
  }
};

interface IIPv4 {
  IPv4: string;
}

interface IAddress {
  location: { value: string };
}

export const getGeo = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get<IIPv4>(`https://geolocation-db.com/json/`);
    const resAddress = await axios.get<IAddress>(
      `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${res.data.IPv4}`,
      { headers: { Authorization: `Token ${process.env.REACT_APP_API_KEY}` } }
    );
    dispatch(geoSlice.actions.setGeoSuccess(resAddress.data.location.value));
  } catch (e) {
    const error = e as Error;
    dispatch(geoSlice.actions.setGeoError(error.message));
  }
};

export const postOrder = (obj: any) => async (dispatch: AppDispatch) => {
  try {
    await axios.post('api/order', obj);
  } catch (e) {
    const error = e as Error;
    console.log(error);
  }
};

export const getOrderSuccess = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(orderSuccessSlice.actions.setOrderSuccess());
    const res = await axios.get<IOrderSuccess[]>(`/api/order`);
    dispatch(orderSuccessSlice.actions.setOrderSuccessSuccess(res.data));
  } catch (e) {
    const error = e as Error;
    dispatch(orderSuccessSlice.actions.setOrderSuccessError(error.message));
  }
};
