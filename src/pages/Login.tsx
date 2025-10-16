import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface LoginFormInputs {
  emailOrUsername: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { login, user, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    const { emailOrUsername, password } = data;
    await login(emailOrUsername, password);
  };

  useEffect(() => {
    if (user) {
      const isAdmin =
        (user as any).isAdmin || (user as any).role === "admin";
      navigate(isAdmin ? "/admin/dashboard" : "/");
    }
  }, [user, navigate]);

  // Clear error on unmount or when form changes
  useEffect(() => {
    return () => clearError?.();
  }, [clearError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl backdrop-blur-md bg-white/70 dark:bg-slate-800/70">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-semibold text-primary">
            Welcome Back 👋
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to <span className="font-medium">ShopPilot</span>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Email or Username"
                {...register("emailOrUsername", {
                  required: "Email or Username is required",
                })}
              />
              {errors.emailOrUsername && (
                <p className="text-sm text-destructive mt-1">
                  {errors.emailOrUsername.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full font-medium"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-3">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
