import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BankAccount } from "@/types";

interface BankAccountState {
  accounts: BankAccount[];
}

const initialState: BankAccountState = {
  accounts: [],
};

const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState,
  reducers: {
    setBankAccounts: (state, action: PayloadAction<BankAccount[]>) => {
      state.accounts = action.payload;
    },
    addBankAccount: (state, action: PayloadAction<BankAccount>) => {
      state.accounts.unshift(action.payload);
    },
    updateBankAccount: (state, action: PayloadAction<BankAccount>) => {
      const index = state.accounts.findIndex(
        (acc) => acc.id === action.payload.id
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    deleteBankAccount: (state, action: PayloadAction<number>) => {
      state.accounts = state.accounts.filter(
        (acc) => acc.id !== action.payload
      );
    },
  },
});

export const { setBankAccounts, addBankAccount, updateBankAccount, deleteBankAccount } =
  bankAccountSlice.actions;

export default bankAccountSlice.reducer;
