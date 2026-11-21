import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/AuthLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register: createAccount } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setServerError] = useState("");

  async function onSubmit(values) {
    setServerError("");
    try {
      await createAccount(values);
      navigate("/dashboard");
    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <AuthLayout title="Create account" subtitle="Get started with your genAI account" footer={<>Already have an account? <Link className="font-semibold text-indigo-600 hover:underline" to="/login">Login</Link></>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{serverError}</p>}
        <div><label className="mb-1 block text-sm font-medium">Full name</label><input className="w-full rounded-lg border border-slate-300 px-3 py-3 focus:border-indigo-500" placeholder="Your name" {...register("name", { required: "Name is required" })} />{errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}</div>
        <div><label className="mb-1 block text-sm font-medium">Email</label><input type="email" className="w-full rounded-lg border border-slate-300 px-3 py-3 focus:border-indigo-500" placeholder="you@example.com" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })} />{errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}</div>
        <div><label className="mb-1 block text-sm font-medium">Password</label><input type="password" className="w-full rounded-lg border border-slate-300 px-3 py-3 focus:border-indigo-500" placeholder="At least 8 characters" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum 8 characters" } })} />{errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}</div>
        <button disabled={isSubmitting} className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{isSubmitting ? "Creating..." : "Create account"}</button>
      </form>
    </AuthLayout>
  );
}
