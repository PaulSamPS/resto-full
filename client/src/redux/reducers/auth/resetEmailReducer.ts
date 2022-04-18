import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IResetEmail {
  isLoading: boolean;
  error: string | undefined;
  statusOk: boolean;
}

const initialState: IResetEmail = {
  isLoading: false,
  error: '',
  statusOk: false,
};

export const resetEmailReducer = createSlice({
  name: 'resetEmail',
  initialState,
  reducers: {
    setResetEmail(state) {
      state.isLoading = true;
    },
    setResetEmailSuccess(state) {
      state.isLoading = false;
      state.error = '';
      state.statusOk = true;
    },
    setResetEmailError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default resetEmailReducer.reducer;
