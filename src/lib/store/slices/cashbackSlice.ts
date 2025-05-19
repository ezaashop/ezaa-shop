import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CashbackTransaction,
  CashbackInfo,
  CashbackRequestInfo,
  Wallet,
  Commission,
} from "@/types";

interface CashbackState {
  cashbackTransactions: CashbackTransaction[];
  cashbackInfo: CashbackInfo | null;
  cashbackRequestInfo: CashbackRequestInfo[] | [];
  wallet: Wallet | null;
  commission: Commission | null;
  loading: boolean;
}

const initialState: CashbackState = {
  cashbackTransactions: [],
  cashbackInfo: null,
  cashbackRequestInfo: [],
  wallet: null,
  commission: null,
  loading: false,
};

const cashbackSlice = createSlice({
  name: "cashback",
  initialState,
  reducers: {
    setCashbackTransactions(
      state,
      action: PayloadAction<CashbackTransaction[]>
    ) {
      state.cashbackTransactions = action.payload;
    },
    setCashbackInfo(state, action: PayloadAction<CashbackInfo>) {
      state.cashbackInfo = action.payload;
    },
    setCashbackRequestInfo(
      state,
      action: PayloadAction<CashbackRequestInfo[]>
    ) {
      state.cashbackRequestInfo = action.payload;
    },
    setWallet(state, action: PayloadAction<Wallet>) {
      state.wallet = action.payload;
    },
    setCommission(state, action: PayloadAction<Commission>) {
      state.commission = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setCashbackTransactions,
  setCashbackInfo,
  setCashbackRequestInfo,
  setWallet,
  setCommission,
  setLoading,
} = cashbackSlice.actions;

export default cashbackSlice.reducer;
