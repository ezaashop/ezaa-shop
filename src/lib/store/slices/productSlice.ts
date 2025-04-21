import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  useCategories,
  useSubCategories,
  useProduct,
} from "@/hooks/useProducts"; // Import hooks

// Define the initial state
interface ProductState {
  categories: any[];
  subCategories: any[];
  selectedCategoryId: string | null;
  selectedSubCategoryId: string | null;
  products: any[];
}

const initialState: ProductState = {
  categories: [],
  subCategories: [],
  selectedCategoryId: null,
  selectedSubCategoryId: null,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action: PayloadAction<any[]>) => {
      state.subCategories = action.payload;
    },
    setSelectedCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
    },
    setSelectedSubCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedSubCategoryId = action.payload;
    },
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
  },
});

export const {
  setCategories,
  setSubCategories,
  setSelectedCategoryId,
  setSelectedSubCategoryId,
  setProducts,
} = productSlice.actions;

export default productSlice.reducer;
