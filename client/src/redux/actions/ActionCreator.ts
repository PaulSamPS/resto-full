import {AppDispatch} from '../store';
import {ProductInterface} from '../../interfaces/product.interface';
import {productSlice} from '../reducers/ProductSlice';
import {productInfoSlice} from '../reducers/ProductInfoSlice';
import {navSlice} from '../reducers/NavSlice';
import {NavInterface} from '../../interfaces/nav.interface';
import axios from 'axios';
import {geoSlice} from '../reducers/GeoSlice';
import {orderSuccessSlice} from '../reducers/OrderSuccess';
import {IOrderSuccess} from '../../interfaces/order.interface';

export const getProduct = (category?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(productSlice.actions.setProduct());
    const res = await axios.get<ProductInterface[]>(`/api/products?category=${category ? category : 'cold-snacks'}`);
    dispatch(productSlice.actions.setProductSuccess(res.data));
  } catch (e) {
    const error = e as Error;
    dispatch(productSlice.actions.setProductError(error.message));
  }
};

export const getInfoProduct = (id: number | undefined) => async (dispatch: AppDispatch) => {
  try {
    dispatch(productInfoSlice.actions.setInfoProduct());
    const res = await axios.get<ProductInterface>(`/api/products/${id}`);
    dispatch(productInfoSlice.actions.setInfoProductSuccess(res.data));
  } catch (e) {
    const error = e as Error;
    dispatch(productInfoSlice.actions.setInfoProductError(error.message));
  }
};

export const getNav = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(navSlice.actions.setNav());
    const res = await axios.get<NavInterface[]>(`/api/nav`);
    dispatch(navSlice.actions.setNavSuccess(res.data));
  } catch (e) {
    const error = e as Error;
    dispatch(navSlice.actions.setNavError(error.message));
  }
};

interface IIPv4 {
  IPv4: string
}

interface IAddress {
  location: {value: string}
}

export const getGeo = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get<IIPv4>(`https://geolocation-db.com/json/`);
    const resAddress = await axios.get<IAddress>(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${res.data.IPv4}`, {headers: {Authorization: `Token ${process.env.REACT_APP_API_KEY}`}});
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
