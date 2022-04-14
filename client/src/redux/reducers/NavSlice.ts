import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NavInterface} from '../../interfaces/nav.interface';

interface INavState {
  nav: NavInterface[]
  isLoading: boolean
  error: string
  activeIndex: number| null
}

const initialState: INavState = {
  nav: [],
  isLoading: false,
  error: '',
  activeIndex: 0
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setNav(state) {
      state.isLoading = true;
    },
    setNavSuccess(state, action: PayloadAction<NavInterface[]>) {
      state.isLoading = false;
      state.error = '';
      state.nav = action.payload;
    },
    setNavError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setActiveNav(state, action: PayloadAction<number | null>) {
      state.activeIndex = action.payload;
    }
  }
});

export const {setActiveNav} = navSlice.actions;

export default navSlice.reducer;
