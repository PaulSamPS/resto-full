import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/ProductSlice';
import categoryReducer from './reducers/categoryReducer';
import geoReducer from './reducers/GeoSlice';
import addressReducer from './reducers/AddressSlice';
import orderReducer from './reducers/OrderSlice';
import orderSuccessReducer from './reducers/OrderSuccess';
import loginReducer from './reducers/auth/loginReducer';
import registrationReducer from './reducers/auth/registrationReducer';
import resetEmailReducer from './reducers/auth/resetEmailReducer';
import logoutReducer from './reducers/auth/logoutReducer';

const rootReducer = combineReducers({
  productReducer,
  categoryReducer,
  geoReducer,
  addressReducer,
  orderReducer,
  orderSuccessReducer,
  loginReducer,
  registrationReducer,
  resetEmailReducer,
  logoutReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
