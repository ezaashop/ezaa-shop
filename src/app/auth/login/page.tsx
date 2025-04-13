import AuthForm from "@/components/forms/auth-form";
import LoginForm from "@/components/forms/login-form";

const Login = () => {
  return (
    <AuthForm type="login">
      <LoginForm />
    </AuthForm>
  );
};

export default Login;
