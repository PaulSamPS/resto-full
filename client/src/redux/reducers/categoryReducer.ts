import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/category.interface';

interface ICategoryState {
  category: ICategory[];
  isLoading: boolean;
  error: string | undefined;
  activeIndex: number | null;
}

const initialState: ICategoryState = {
  category: [],
  isLoading: false,
  error: '',
  activeIndex: 1,
};

export const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state) {
      state.isLoading = true;
    },
    setCategorySuccess(state, action: PayloadAction<ICategory[]>) {
      state.isLoading = false;
      state.error = '';
      state.category = action.payload;
    },
    setCategoryError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<number | null>) {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveCategory } = categoryReducer.actions;

export default categoryReducer.reducer;
