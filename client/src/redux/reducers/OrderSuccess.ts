import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IOrderSuccess} from '../../interfaces/order.interface';

interface IProductState {
    orderSuccess: IOrderSuccess[]
    isLoading: boolean
    error: string
}

const initialState: IProductState = {
  orderSuccess: [],
  isLoading: false,
  error: ''
};

export const orderSuccessSlice = createSlice({
  name: 'orderSuccess',
  initialState,
  reducers: {
    setOrderSuccess(state) {
      state.isLoading = true;
    },
    setOrderSuccessSuccess(state, action: PayloadAction<IOrderSuccess[]>) {
      state.isLoading = false;
      state.error = '';
      state.orderSuccess = action.payload;
    },
    setOrderSuccessError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default orderSuccessSlice.reducer;
