import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthUser } from '../../interfaces/authUser.interface';

interface ILogin {
  isLoading: boolean;
  error: string | undefined;
  user: IAuthUser;
  isAuth: boolean;
  statusOk: boolean;
}

const initialState: ILogin = {
  user: {} as any,
  isLoading: false,
  error: '',
  isAuth: false,
  statusOk: false,
};

export const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state) {
      state.isLoading = true;
    },
    setLoginSuccess(state, action: PayloadAction<IAuthUser>) {
      state.isLoading = false;
      state.error = '';
      state.isAuth = true;
      state.user = action.payload;
      state.statusOk = true;
    },
    setLoginError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setLoginClear(state) {
      state.isLoading = false;
      state.error = '';
      state.statusOk = false;
      state.isAuth = false;
      state.user = {} as any;
    },
  },
});

export default loginReducer.reducer;
