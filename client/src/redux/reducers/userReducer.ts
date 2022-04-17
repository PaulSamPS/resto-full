import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthUser } from '../interfaces/authUser.interface';

interface ILogin {
  isLoading: boolean;
  error: string | undefined;
  user: IAuthUser;
  isAuth: boolean;
}

const initialState: ILogin = {
  user: {} as any,
  isLoading: false,
  error: '',
  isAuth: false,
};

export const userReducer = createSlice({
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
    },
    setLoginError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userReducer.reducer;
