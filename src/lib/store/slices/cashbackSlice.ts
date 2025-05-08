import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CashbackTransaction,
  CashbackInfo,
  CashbackRequestInfo,
  WalletTotal,
} from "@/types";

interface CashbackState {
  cashbackTransactions: CashbackTransaction[];
  cashbackInfo: CashbackInfo | null;
  cashbackRequestInfo: CashbackRequestInfo[] | [];
  walletTotal: WalletTotal | null;
  totalCommission: any;
  loading: boolean;
}

const initialState: CashbackState = {
  cashbackTransactions: [],
  cashbackInfo: null,
  cashbackRequestInfo: [],
  walletTotal: null,
  totalCommission: null,
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
    setCashbackRequestInfo(state, action: PayloadAction<CashbackRequestInfo[]>) {
      state.cashbackRequestInfo = action.payload;
    },
    setWalletTotal(state, action: PayloadAction<WalletTotal>) {
      state.walletTotal = action.payload;
    },
    setTotalCommission(state, action: PayloadAction<any>) {
      state.totalCommission = action.payload;
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
  setWalletTotal,
  setTotalCommission,
  setLoading,
} = cashbackSlice.actions;

export default cashbackSlice.reducer;
