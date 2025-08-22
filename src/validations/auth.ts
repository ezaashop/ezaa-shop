import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().min(3, "Email must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = AuthSchema;

export const SignupSchema = AuthSchema.extend({
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  referal_code: z.string().optional(),
});
