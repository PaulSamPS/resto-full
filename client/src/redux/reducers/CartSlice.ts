import {ProductInterface} from '../../interfaces/product.interface';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IProductState {
  cart: ProductInterface[]
  totalCount: number
  totalPrice: number
}

const initialState: IProductState = {
  cart: [],
  totalCount: 0,
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: 'cartProduct',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<ProductInterface>) {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cart[itemIndex].qty += 1;
        state.totalCount = state.totalCount += 1;
      } else {
        state.cart.push({...action.payload});
        state.totalCount = state.totalCount += 1;
      }
      state.totalPrice = state.cart.reduce((result, item) => item.qty * item.price + result, 0);
    },
    minusItem(state, action: PayloadAction<ProductInterface>) {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0 && state.cart[itemIndex].qty > 1) {
        state.cart[itemIndex].qty -= 1;
        state.totalCount = state.totalCount -= 1;
        state.totalPrice = state.totalPrice - state.cart[itemIndex].price;
      }
    },
    deleteItem(state, action: PayloadAction<ProductInterface>) {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      state.totalPrice = state.totalPrice - state.cart[itemIndex].price * state.cart[itemIndex].qty;
      state.totalCount = state.totalCount - state.cart[itemIndex].qty;
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    setResetCart(state) {
      state.totalPrice = state.totalPrice = 0;
      state.totalCount = state.totalCount = 0;
      state.cart = state.cart = [];
    }
  }
});

export const {setCart, minusItem, deleteItem, setResetCart} = cartSlice.actions;

export default cartSlice.reducer;
