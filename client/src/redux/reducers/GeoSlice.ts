import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAddress {
  error: string
  address: string
}

const initialState: IAddress = {
  address: '',
  error: ''
};

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setGeoSuccess(state, action: PayloadAction<string>) {
      state.error = '';
      state.address = action.payload;
    },
    setGeoError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  }
});

export default geoSlice.reducer;
