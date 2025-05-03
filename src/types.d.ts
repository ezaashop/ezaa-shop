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

interface BankAccount {
  id: number;
  user_id: number;
  account_title: string;
  bank_name: string;
  account_number: number;
  status: string;
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
  subcategory_id: number;
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
  name: string;
  images: ProductImage[]; // or `ProductImage[]` if you want full image objects
  quantity: number;
  price: number;
  sub_total?: number;
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

type BankAccountData = {
  bank_name: string;
  account_name: string;
  account_number: string;
}
