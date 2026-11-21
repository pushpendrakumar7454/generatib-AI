import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(values) {
    setServerError("");
    try {
      await login(values);
      navigate("/dashboard");
    } catch (error) {
      setServerError(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Login to continue" footer={<>Don't have an account? <Link className="font-semibold text-indigo-600 hover:underline" to="/register">Create account</Link></>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{serverError}</p>}
        <div><label className="mb-1 block text-sm font-medium">Email</label><input type="email" className="w-full rounded-lg border border-slate-300 px-3 py-3 focus:border-indigo-500" placeholder="you@example.com" {...register("email", { required: "Email is required" })} />{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}</div>
        <div><label className="mb-1 block text-sm font-medium">Password</label><input type="password" className="w-full rounded-lg border border-slate-300 px-3 py-3 focus:border-indigo-500" placeholder="Your password" {...register("password", { required: "Password is required" })} />{errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}</div>
        <button disabled={isSubmitting} className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{isSubmitting ? "Logging in..." : "Login"}</button>
      </form>
    </AuthLayout>
  );
}
