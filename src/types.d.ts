type AsyncResponse<T> = {
  data: any;
  error: string | null;
  status: "success" | "error";
};

type Auth = {
  email: string;
  password: string;
};

type Login = Auth;

type Signup = Auth & {
  phone: string;
};

interface User {
  id: number;
  user_type: string;
  fname: string | null;
  lname: string | null;
  phone: string;
  email: string;
  status: number;
  last_login: string;
  last_logout: string | null;
  fcm_token: string | null;
  google_social_id: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
  referal_code: string | null;
  name: string | null;
  token: string | null;
}

interface Wallet {
  id: number;
  user_id: number;
  wallet_amount: number;
  cash_back: number;
  bucketCommission: number;
  created_at: string;
  updated_at: string;
}

interface ReferalCode {
  id: number;
  user_id: number;
  code: string;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  status: "success" | "error";
  message: string;
  user: User;
  wallet: Wallet;
  referalCode: ReferalCode;
  bank_account: BankAccount;
}

type FooterLink = {
  name: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterAppLink = {
  name: string;
  href: string;
  icon: IconType;
};

type FooterSocialLink = {
  name: string;
  href: string;
  icon: IconType;
};

type FooterContent = {
  description: string;
  socialLinks: FooterSocialLink[];
  sections: FooterSection[];
  contact: {
    phone: string;
    email: string;
  };
  appLinks: FooterAppLink[];
  copyright: string;
  policies: string;
};

import { IconType } from "react-icons/lib";

interface NavMenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

type Category = {
  id: number;
  name: string;
  image: string;
};

type Subcategory = {
  id: number;
  name: string;
  categoryId: number;
};

interface ProductImage {
  id: number;
  product_id: number;
  image: string;
  cover_status: number;
  created_at: string;
  updated_at: string;
}

interface ProductDetail {
  id: number;
  product_id: number;
  price: string;
  selling_price: string;
  size: string;
  weight: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  category_id: number;
  category: Category;
  subcategory_id: number;
  subcategory: Subcategory;
  name: string;
  commision: string;
  colour: string; // Assuming this is a JSON string. If it's parsed, change to: string[]
  description: string;
  weight: string | null;
  created_at: string;
  updated_at: string;
  status: number;
  product_image: ProductImage[];
  product_deatils: ProductDetail[]; // Typo retained to match original. Prefer renaming to `product_details` for clarity
}

interface CartItem {
  product_id: number;
  product_name: string;
  category_name?: string;
  quantity: number;
  price: number; // original price
  selling_price: number; // discounted price
  color?: string;
  size?: string;
  weight?: string;
  image: string;
  sub_total: number;
}

interface CartState {
  total_amount: number;
  coupoun_code: string;
  coupoun_amount: number;
  phone_number: string;
  shipping_address: string;
  products: CartItem[];
  image: File | null;
}

interface ShippingAddressData {
  id?: string;
  user_id: string;
  country_name: string;
  city_name: string;
  shipping_address: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

interface AddShippingAddress {
  user_id: string;
  phone_number: string;
  shipping_address: ShippingAddressData;
}

interface Order {
  id: number;
  user_id: number;
  phone_number: string;
  shipping_address: string;
  coupoun_code: string | null;
  coupoun_amount: number;
  cash_back_amount_percentage: string;
  backet_commission_percentage: string;
  code: string;
  transaction_id: string;
  total_amount: string;
  cash_back_return: string;
  cash_back_price: string;
  bucket_commission_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  image: string;
  rejection_reason: string | null;
}

interface UserCart {
  id: number;
  product_id: number;
  order_id: number;
  product_name: string;
  size: string | null;
  weight: string | null;
  color: string | null;
  image: string;
  quantity: string;
  price: string;
  selling_price: string;
  sub_total: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  orders: Order;
}

interface UserCartResponse {
  status: number;
  message: string;
  user_carts: UserCart[];
}

type Option = {
  id: number;
  label: string;
  value: string;
};

type BankOption = Option;
type CityOption = Option;

type BankAccount = {
  id?: number;
  user_id?: number;
  bank_name: string;
  account_title: string;
  account_number: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

interface NotificationBase {
  id: number;
  title: string;
  descriptions: string;
  created_at: string;
  seen: string | number;
}

interface CashbackNotification extends NotificationBase {
  cash_back_return: string;
}

interface CommissionNotification extends NotificationBase {
  directCommission?: string | null;
  bucketCommission?: string | null;
}

interface AdminNotification extends NotificationBase {
  admin: string;
}

interface CashbackTransaction {
  transaction_id: string;
  total_amount: number;
  cash_back_return: number;
}

interface CashbackInfo {
  total_amount_sum: number;
  cash_back_sum: number;
}

interface CashbackRequestInfo {
  // Assuming you have request data here; fill out according to your API response
  status: string;
  request_amount: number;
  request_date: string;
}


interface Wallet {
  userWalletTotal: number;
  totalCommission: number;
  minLimit: string;
  maxLimit: string;
}

interface PaymentRequestData {
  amount: number;
  account_id: string;
}

interface Commission {
  id: number;
  user_id: number;
  cash_back: number;
  directCommission: number;
  bucketCommission: number;
  totalCommission: number;
  wallet_amount: number;
  created_at: string;
  updated_at: string;
} 