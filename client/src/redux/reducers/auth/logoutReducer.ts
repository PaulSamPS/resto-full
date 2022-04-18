import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IResetEmail {
  isLoading: boolean;
}

const initialState: IResetEmail = {
  isLoading: false,
};

export const logoutReducer = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    setLogout(state) {
      state.isLoading = true;
    },
    setLogoutSuccess(state) {
      state.isLoading = false;
    },
    setLogoutError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
    },
  },
});

export default logoutReducer.reducer;
