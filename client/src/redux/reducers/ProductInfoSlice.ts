import {ProductInterface} from '../../interfaces/product.interface';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IProductState {
    product: ProductInterface
    isLoading: boolean
    error: string
}

const initialState: IProductState = {
  product: {
    name: '',
    id: 0,
    category: '',
    categoryRu: '',
    image: '',
    nutritionalValue: [],
    price: 0,
    qty: 0,
    weight: 0,
    description: ''
  },
  isLoading: false,
  error: ''
};

export const productInfoSlice = createSlice({
  name: 'productInfo',
  initialState,
  reducers: {
    setInfoProduct(state) {
      state.isLoading = true;
    },
    setInfoProductSuccess(state, action: PayloadAction<ProductInterface>) {
      state.isLoading = false;
      state.error = '';
      state.product = action.payload;
    },
    setInfoProductError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default productInfoSlice.reducer;
