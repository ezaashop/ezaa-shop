import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface ProductState {
  categories: any[];
  subCategories: any[];
  selectedCategoryId: string | null;
  selectedSubCategoryId: string | null;
  products: any[];
  popularProducts: any[];
  popularProductsLoading: boolean;
  popularProductsError: string | null;
}

const initialState: ProductState = {
  categories: [],
  subCategories: [],
  selectedCategoryId: null,
  selectedSubCategoryId: null,
  products: [],
  popularProducts: [],
  popularProductsLoading: false,
  popularProductsError: null,
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
    setPopularProducts: (state, action: PayloadAction<any[]>) => {
      state.popularProducts = action.payload;
    },
    setPopularProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.popularProductsLoading = action.payload;
    },
    setPopularProductsError: (state, action: PayloadAction<string | null>) => {
      state.popularProductsError = action.payload;
    },
  },
});

export const {
  setCategories,
  setSubCategories,
  setSelectedCategoryId,
  setSelectedSubCategoryId,
  setProducts,
  setPopularProducts,
  setPopularProductsLoading,
  setPopularProductsError,
} = productSlice.actions;

export default productSlice.reducer;
