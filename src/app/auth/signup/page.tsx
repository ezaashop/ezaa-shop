import AuthForm from "@/components/forms/auth-form";
import SignupForm from "@/components/forms/signup-form";

const Signup = () => {
  return (
    <AuthForm type="signup">
      <SignupForm />
    </AuthForm>
  );
};

export default Signup;
