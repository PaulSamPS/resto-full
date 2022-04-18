import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRegistration {
  isLoading: boolean;
  error: string | undefined;
  statusOk: boolean;
}

const initialState: IRegistration = {
  isLoading: false,
  error: '',
  statusOk: false,
};

export const registrationReducer = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setRegistration(state) {
      state.isLoading = true;
    },
    setRegistrationSuccess(state) {
      state.isLoading = false;
      state.error = '';
      state.statusOk = true;
    },
    setRegistrationError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default registrationReducer.reducer;
