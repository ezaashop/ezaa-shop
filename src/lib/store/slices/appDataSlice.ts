// import { Bank, City } from "@/types";
import { CityOption, BankOption } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppDataState {
  cities: CityOption[];
  banks: BankOption[];
}

// Cities
const initialCityString = `Abbottabad,Adilpur,Ahmadpur Sial,Ahmedpur East,Bahawalnagar,Faisalabad,Islamabad,Karachi,Lahore,Multan,Peshawar,Rawalpindi,Sialkot,Zhob,Ziarat`;
const cityData: CityOption[] = initialCityString.split(",").map((e, index) => ({
  id: index + 1,
  label: e.trim(),
  value: (index + 1).toString(), // ✅ Ensure value is a string
}));

// Banks
const bankData: BankOption[] = [
  { id: 1, label: "Allied Bank", value: "Allied Bank" },
  { id: 2, label: "Askari Bank", value: "Askari Bank" },
  { id: 3, label: "Bank Alfalah", value: "Bank Alfalah" },
  { id: 4, label: "Bank of Khyber", value: "Bank of Khyber" },
  { id: 5, label: "Bank Of Punjab", value: "Bank Of Punjab" },
  {
    id: 6,
    label: "BankIslami Pakistan Limited",
    value: "BankIslami Pakistan Limited",
  },
  { id: 7, label: "Dubai Islamic Bank", value: "Dubai Islamic Bank" },
  { id: 8, label: "Easypaisa app", value: "Easypaisa app" },
  { id: 9, label: "Faysal Bank", value: "Faysal Bank" },
  { id: 10, label: "First Women Bank", value: "First Women Bank" },
  {
    id: 11,
    label: "HBL (Habib Bank Limited)",
    value: "HBL (Habib Bank Limited)",
  },
  { id: 12, label: "JazzCash", value: "JazzCash" },
  { id: 13, label: "Keenu Wallet", value: "Keenu Wallet" },
  { id: 14, label: "KT Bank AG", value: "KT Bank AG" },
  {
    id: 15,
    label: "MCB Bank (Muslim Commercial Bank)",
    value: "MCB Bank (Muslim Commercial Bank)",
  },
  { id: 16, label: "Meezan Bank", value: "Meezan Bank" },
  {
    id: 17,
    label: "Muslim Commercial Bank (MCB)",
    value: "Muslim Commercial Bank (MCB)",
  },
  { id: 18, label: "NayaPay", value: "NayaPay" },
  { id: 19, label: "Payoneer", value: "Payoneer" },
  {
    id: 20,
    label: "Standard Chartered Pakistan",
    value: "Standard Chartered Pakistan",
  },
  { id: 21, label: "SadaPay", value: "SadaPay" },
  { id: 22, label: "UBL Omni", value: "UBL Omni" },
  {
    id: 23,
    label: "United Bank Limited (UBL)",
    value: "United Bank Limited (UBL)",
  },
  { id: 24, label: "2Checkout", value: "2Checkout" },
];

const initialState: AppDataState = {
  cities: cityData,
  banks: bankData,
};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setBanks(state, action: PayloadAction<BankOption[]>) {
      state.banks = action.payload;
    },
    setCities(state, action: PayloadAction<CityOption[]>) {
      state.cities = action.payload;
    },
  },
});

export const { setBanks, setCities } = appDataSlice.actions;
export default appDataSlice.reducer;
