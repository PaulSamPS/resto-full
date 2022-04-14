import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAddressState {
  address: {
    street: string
    street_type: string
    house: string
    house_type: string
    flat: string
    flat_type: string
    settlement_with_type: string
  }
}

const initialState: IAddressState = {
  address: {
    street: '',
    street_type: '',
    house: '',
    house_type: '',
    flat: '',
    flat_type: '',
    settlement_with_type: ''
  }
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<any>) {
      state.address = action.payload;
    },
  }
});

export const {setAddress} = addressSlice.actions;

export default addressSlice.reducer;
