import AuthLayout from "../components/layout/AuthLayout";
import BrandPanel from "../features/auth/components/BrandPanel";
import LoginForm from "../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout brandPanel={<BrandPanel />}>
      <LoginForm />
    </AuthLayout>
  );
}
