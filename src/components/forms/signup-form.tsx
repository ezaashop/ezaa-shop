"use client";

import { useRegister } from "@/hooks/useAuth";
import { Signup } from "@/types";
import { SignupSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaPhone } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiUserSharedLine } from "react-icons/ri";
import Loader from "../loader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PasswordInput from "./fields/password-input";
import TextInput from "./fields/text-input";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("referralCode");
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      referal_code: referralCode || "",
    },
  });

  const { mutate: register, isPending } = useRegister();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: Signup) => {
    try {
      await register(data, {
        onSuccess: (res) => {
          if (res?.data?.error) {
            setError(res?.data?.error);
          } else {
            setError(null);
            reset();
            toast.success("Signup successful, login to continue.");
            router.push("/auth/login");
          }
        },
        onError: (err) => {
          console.log("Signup failed:", err);
          toast.error("Signup failed. Please try again.");
        },
      });
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="grid gap-2">
        <TextInput
          name="fname"
          placeholder="Enter first name"
          control={control}
          icon={<FaUser />}
        />
        <TextInput
          name="lname"
          placeholder="Enter last name"
          control={control}
          icon={<FaUser />}
        />
        <TextInput
          name="email"
          placeholder="Enter email"
          control={control}
          icon={<MdAlternateEmail />}
        />
        <TextInput
          name="phone"
          placeholder="Enter phone"
          control={control}
          icon={<FaPhone />}
        />
        <PasswordInput
          name="password"
          placeholder="Enter password"
          control={control}
        />
        <TextInput
          name="referal_code"
          placeholder="Enter referral code (optional)"
          control={control}
          icon={<RiUserSharedLine />} // or any icon or none
        />

        <div className="flex items-center justify-end gap-2">
          <Input
            type="checkbox"
            name="terms"
            className="w-4 h-4"
            checked={isTermsChecked}
            onChange={handleCheckboxChange}
          />
          <Link href="#" className="text-xs text-signature underline">
            Agree with terms and conditions
          </Link>
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>

      <Button
        variant={"signature"}
        type="submit"
        className="w-full font-semibold text-white"
        disabled={isPending || !isTermsChecked}
      >
        {isPending ? <Loader /> : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
