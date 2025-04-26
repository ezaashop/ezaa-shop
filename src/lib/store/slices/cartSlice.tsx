// src/lib/store/slices/cartSlice.ts


// const dispatch = useAppDispatch();
// dispatch(addProduct({ product_id: 5, price: 155 }));
// dispatch(removeProduct(5));
// dispatch(updateQuantity({ product_id: 1, quantity: 4 }));
// dispatch(applyCoupon({ code: "NEWYEAR25", amount: 25 }));
// dispatch(updatePhoneNumber("9876543210"));
// dispatch(updateShippingAddress("123 Main St, Springfield"));
// dispatch(attachImage(file)); // for uploading new file
// dispatch(clearCart());


import { CartState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types

// Helper to get cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      return {
        ...parsedCart,
        image: null, // files cannot be stored in localStorage, user will need to reattach
      };
    }
  }
  return {
    total_amount: 0,
    coupoun_code: "",
    coupoun_amount: 0,
    phone_number: "",
    shipping_address: "",
    products: [],
    image: null,
  };
};

// Helper to save cart to localStorage
const saveCartToStorage = (cart: CartState) => {
  if (typeof window !== "undefined") {
    const { image, ...cartToStore } = cart; // don't store image
    localStorage.setItem("cart", JSON.stringify(cartToStore));
  }
};

const initialState: CartState = loadCartFromStorage();

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{
        product_id: number;
        price: number;
        quantity?: number;
      }>
    ) => {
      const { product_id, price, quantity = 1 } = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product_id === product_id
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.sub_total =
          existingProduct.quantity * existingProduct.price;
      } else {
        state.products.push({
          product_id,
          price,
          quantity,
          sub_total: price * quantity,
        });
      }

      cartSlice.caseReducers.recalculateTotals(state);
      saveCartToStorage(state);
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (p) => p.product_id !== action.payload
      );
      cartSlice.caseReducers.recalculateTotals(state);
      saveCartToStorage(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ product_id: number; quantity: number }>
    ) => {
      const { product_id, quantity } = action.payload;
      const product = state.products.find((p) => p.product_id === product_id);
      if (product) {
        product.quantity = quantity;
        product.sub_total = product.quantity * product.price;
        cartSlice.caseReducers.recalculateTotals(state);
        saveCartToStorage(state);
      }
    },

    applyCoupon: (
      state,
      action: PayloadAction<{ code: string; amount: number }>
    ) => {
      state.coupoun_code = action.payload.code;
      state.coupoun_amount = action.payload.amount;
      cartSlice.caseReducers.recalculateTotals(state);
      saveCartToStorage(state);
    },

    updatePhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
      saveCartToStorage(state);
    },

    updateShippingAddress: (state, action: PayloadAction<string>) => {
      state.shipping_address = action.payload;
      saveCartToStorage(state);
    },

    attachImage: (state, action: PayloadAction<File>) => {
      state.image = action.payload;
    },

    clearCart: (state) => {
      state.total_amount = 0;
      state.coupoun_code = "";
      state.coupoun_amount = 0;
      state.phone_number = "";
      state.shipping_address = "";
      state.products = [];
      state.image = null;
      localStorage.removeItem("cart");
    },

    recalculateTotals: (state) => {
      const productsTotal = state.products.reduce(
        (acc, p) => acc + p.sub_total,
        0
      );
      state.total_amount = productsTotal - state.coupoun_amount;
      if (state.total_amount < 0) {
        state.total_amount = 0;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateQuantity,
  applyCoupon,
  updatePhoneNumber,
  updateShippingAddress,
  attachImage,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
