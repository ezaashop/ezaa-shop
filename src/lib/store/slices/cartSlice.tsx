import { CartItem, CartState, ProductImage } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadCartFromStorage = (): CartState => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      return {
        ...parsedCart,
        image: null,
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

const saveCartToStorage = (cart: CartState) => {
  if (typeof window !== "undefined") {
    const { image, ...cartToStore } = cart;
    localStorage.setItem("cart", JSON.stringify(cartToStore));
  }
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<CartItem>
    ) => {
      const { product_id, name, images, price, quantity = 1 } = action.payload;
    
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
          name,
          images,
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
        (acc, p) => acc + (p.sub_total || 0),
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
