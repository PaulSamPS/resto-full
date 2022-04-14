import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productReducer from './reducers/ProductSlice';
import productInfoReducer from './reducers/ProductInfoSlice';
import navReducer from './reducers/NavSlice';
import cartReducer from './reducers/CartSlice';
import geoReducer from './reducers/GeoSlice';
import addressReducer from './reducers/AddressSlice';
import orderReducer from './reducers/OrderSlice';
import orderSuccessReducer from './reducers/OrderSuccess';

const rootReducer = combineReducers({
  productReducer,
  productInfoReducer,
  navReducer,
  cartReducer,
  geoReducer,
  addressReducer,
  orderReducer,
  orderSuccessReducer
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
