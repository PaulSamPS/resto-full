import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAddressDeliveryInterfaces} from '../../pages/Delivery/AddressDelivery/AddressDelivery.interfaces';

interface IAddressState {
  order: IAddressDeliveryInterfaces
  deliveryType: string
  payment: string
}

const initialState: IAddressState = {
  order: {
    name: '',
    phone: '',
    street: '',
    house: '',
    office: '',
    entrance: '',
    level: '',
    comment: '',
    check: false,
  },
  deliveryType: 'Доставка',
  payment: 'Оплата онлайн'
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<IAddressDeliveryInterfaces>) {
      state.order = action.payload;
    },
    setDeliveryType(state, action: PayloadAction<string>) {
      state.deliveryType = action.payload;
    },
    setPayment(state, action: PayloadAction<string>) {
      state.payment = action.payload;
    }
  }
});

export const {setOrder, setDeliveryType, setPayment} = orderSlice.actions;

export default orderSlice.reducer;
