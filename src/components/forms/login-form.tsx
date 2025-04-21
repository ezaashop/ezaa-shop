"use client";

import { LoginSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaUserCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import PasswordInput from "./fields/password-input";
import TextInput from "./fields/text-input";
import Loader from "../loader";
import { Auth, Login } from "@/types";
import { useLogin } from "@/hooks/useAuth";

const LoginForm = () => {
  const router = useRouter();

  const { mutate: login, isPending, error } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Auth) => {
    try {
      login(data, {
        onSuccess: ({ data }) => {
          router.push("/");
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("userid", data.user.id);
        },
        onError: (err) => {
          console.log("Login failed:", err);
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="grid gap-2">
        {/* Text Input for Username/Email */}
        <TextInput
          name="email"
          placeholder="Enter email"
          control={control}
          icon={<FaEnvelope />}
        />

        {/* Password Input */}
        <PasswordInput
          name="password"
          placeholder="Enter password"
          control={control}
        />

        <Link href="#" className="text-xs text-signature ml-auto">
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        variant={"signature"}
        type="submit"
        className="w-full font-semibold text-white"
        disabled={isSubmitting || isPending}
      >
        {isPending ? <Loader /> : "Login"} {/* Show loader when pending */}
      </Button>

      {/* Show error message if login fails */}
      {error && <p className="text-red-500 text-xs mt-2">{error?.message}</p>}
    </form>
  );
};

export default LoginForm;
