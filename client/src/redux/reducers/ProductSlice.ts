import {ProductInterface} from '../../interfaces/product.interface';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IProductState {
  product: ProductInterface[]
  isLoading: boolean
  error: string
}

const initialState: IProductState = {
  product: [],
  isLoading: false,
  error: ''
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state) {
      state.isLoading = true;
    },
    setProductSuccess(state, action: PayloadAction<ProductInterface[]>) {
      state.isLoading = false;
      state.error = '';
      state.product = action.payload;
    },
    setProductError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default productSlice.reducer;
