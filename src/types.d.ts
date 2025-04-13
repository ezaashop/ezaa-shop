type Auth = {
  email: string;
  password: string;
};

type Login = Auth;

type Signup = Auth & {
  phone: string;
};

export interface User {
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


export interface Wallet {
  id: number;
  user_id: number;
  wallet_amount: number;
  cash_back: number;
  bucketCommission: number;
  created_at: string;
  updated_at: string;
}

export interface ReferalCode {
  id: number;
  user_id: number;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface BankAccount {
  id: number;
  user_id: number;
  account_title: string;
  bank_name: string;
  account_number: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
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
  id: string;
  name: string;
  image: string;
};

type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
};
