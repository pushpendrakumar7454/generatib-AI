import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { href, useNavigate } from "react-router";
import { registerUser } from "../../api/useApi";
import { addUser, setAccessToken } from "../../state/authSlice";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);

      dispatch(setAccessToken(res.data.data.accessToken));
      dispatch(addUser(res.data.data.user));

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* ================= BACKGROUND ================= */}

      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-orange-300/25 rounded-full blur-[100px]" />

      <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[120px]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-100/40 rounded-full blur-[150px]" />

      {/* ================= MAIN CARD ================= */}

      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[32px] bg-white border border-[#e8e3db] shadow-[0_30px_90px_rgba(30,30,30,0.12)]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="hidden lg:flex relative min-h-[720px] overflow-hidden p-12 text-white bg-[#101828]">
            {/* Background Glow */}

            <div className="absolute -top-40 -right-32 w-[420px] h-[420px] bg-orange-500/20 rounded-full blur-[100px]" />

            <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] bg-blue-500/15 rounded-full blur-[100px]" />

            {/* Grid */}

            <div
              className="absolute inset-0 opacity-[0.045]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Decorative Shapes */}

            <div className="absolute top-24 right-16 w-28 h-28 rounded-full border border-white/10" />

            <div className="absolute top-32 right-24 w-7 h-7 rounded-full bg-orange-400/30 blur-sm" />

            <div className="absolute bottom-32 right-16 w-36 h-36 rounded-full border border-white/[0.07]" />

            <div className="relative z-10 flex flex-col justify-between w-full">
              {/* ================= LOGO ================= */}

              <div>
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 p-[1px] shadow-lg shadow-orange-500/20">
                    <div className="w-full h-full rounded-2xl bg-[#101828] flex items-center justify-center">
                      <span className="text-xl font-black text-orange-400">
                        N
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-black tracking-[0.18em]">
                      NEXORA
                    </h2>

                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mt-1">
                      Premium Store
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= HERO ================= */}

              <div className="my-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-slate-300 mb-6">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.8)]" />
                  Your everyday shopping destination
                </div>

                <h1 className="text-3xl xl:text-5xl font-semibold ">
                  Shop.
                  <br />
                  <span className="bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                    Discover.
                  </span>
                  <br />
                  Enjoy.
                </h1>

                <p className="text-slate-300 mt-7 max-w-md leading-7 text-sm">
                  Discover products you love, explore amazing collections and
                  enjoy a smooth shopping experience with NEXORA.
                </p>

                {/* ================= STATS ================= */}

                <div className="grid grid-cols-3 gap-3 mt-10 max-w-md">
                  <div className="rounded-2xl bg-white/[0.055] border border-white/10 p-4 backdrop-blur-xl hover:bg-white/[0.08] transition">
                    <h3 className="text-xl font-bold">10K+</h3>

                    <p className="text-[11px] text-slate-400 mt-1">
                      Products
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.055] border border-white/10 p-4 backdrop-blur-xl hover:bg-white/[0.08] transition">
                    <h3 className="text-xl font-bold">5K+</h3>

                    <p className="text-[11px] text-slate-400 mt-1">
                      Customers
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.055] border border-white/10 p-4 backdrop-blur-xl hover:bg-white/[0.08] transition">
                    <h3 className="text-xl font-bold">4.9</h3>

                    <p className="text-[11px] text-slate-400 mt-1">
                      Rating
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= FEATURES ================= */}

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-400/10 border border-orange-300/10 flex items-center justify-center text-orange-400">
                    ✓
                  </div>

                  <div>
                    <p className="font-semibold text-sm">Quality Products</p>

                    <p className="text-xs text-slate-400 mt-1">
                      Carefully selected products for you
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-400/10 border border-orange-300/10 flex items-center justify-center text-orange-400">
                    ✓
                  </div>

                  <div>
                    <p className="font-semibold text-sm">Secure Shopping</p>

                    <p className="text-xs text-slate-400 mt-1">
                      Your account and data stay protected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-400/10 border border-orange-300/10 flex items-center justify-center text-orange-400">
                    ✓
                  </div>

                  <div>
                    <p className="font-semibold text-sm">Fast Delivery</p>

                    <p className="text-xs text-slate-400 mt-1">
                      Reliable delivery right to your doorstep
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <div className="relative p-6 sm:p-10 lg:p-12 xl:p-14 bg-white">
            {/* Mobile Logo */}

            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-[#101828] flex items-center justify-center shadow-lg">
                <span className="font-black text-orange-400">N</span>
              </div>

              <div>
                <h2 className="font-black text-lg tracking-[0.15em] text-[#101828]">
                  NEXORA
                </h2>

                <p className="text-[10px] uppercase tracking-widest text-slate-400">
                  Premium Store
                </p>
              </div>
            </div>

            {/* ================= HEADER ================= */}

            <div className="mb-8">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-bold tracking-[0.15em] mb-4">
                CREATE ACCOUNT
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#101828] tracking-tight">
                Join <span className="text-orange-500">NEXORA</span>
              </h2>

              <p className="text-sm text-slate-500 mt-3">
                Create your account and start your premium shopping journey.
              </p>
            </div>

            {/* ================= FORM ================= */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* NAME */}

              <div>
                <label className="block text-sm font-semibold text-[#344054] mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Name cannot exceed 50 characters",
                    },
                  })}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-sm text-[#101828] placeholder:text-slate-400 outline-none transition-all duration-300 ${
                    errors.name
                      ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                      : "border-[#e4e7ec] bg-[#fafafa] hover:bg-white focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  }`}
                />

                {errors.name && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}

              <div>
                <label className="block text-sm font-semibold text-[#344054] mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    minLength: {
                      value: 10,
                      message: "Email must be at least 10 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Email cannot exceed 100 characters",
                    },
                  })}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-sm text-[#101828] placeholder:text-slate-400 outline-none transition-all duration-300 ${
                    errors.email
                      ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                      : "border-[#e4e7ec] bg-[#fafafa] hover:bg-white focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  }`}
                />

                {errors.email && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* MOBILE */}

              <div>
                <label className="block text-sm font-semibold text-[#344054] mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  placeholder="9876543210"
                  {...register("number", {
                    required: "Mobile number is required",
                    minLength: {
                      value: 10,
                      message: "Mobile number must be 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Mobile number must be 10 digits",
                    },
                  })}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-sm text-[#101828] placeholder:text-slate-400 outline-none transition-all duration-300 ${
                    errors.number
                      ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                      : "border-[#e4e7ec] bg-[#fafafa] hover:bg-white focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  }`}
                />

                {errors.number && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    {errors.number.message}
                  </p>
                )}
              </div>

              {/* ROLE */}

              {/* <div>
                <label className="block text-sm font-semibold text-[#344054] mb-2">
                  Role
                </label>

                <select
                  {...register("role", {
                    required: "Role is required",
                  })}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-sm text-[#101828] outline-none transition-all duration-300 ${
                    errors.role
                      ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                      : "border-[#e4e7ec] bg-[#fafafa] hover:bg-white focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  }`}
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>

                {errors.role && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    {errors.role.message}
                  </p>
                )}
              </div> */}

              {/* PASSWORD */}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-[#344054]">
                    Password
                  </label>

                  <span className="text-[11px] text-slate-400">
                    Minimum 6 characters
                  </span>
                </div>

                <input
                  type="password"
                  placeholder="Create a strong password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-sm text-[#101828] placeholder:text-slate-400 outline-none transition-all duration-300 ${
                    errors.password
                      ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100"
                      : "border-[#e4e7ec] bg-[#fafafa] hover:bg-white focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  }`}
                />

                {errors.password && (
                  <p className="text-xs text-red-500 mt-2 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* TERMS */}

              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 accent-orange-500 cursor-pointer"
                />

                <p className="text-xs text-slate-500 leading-5">
                  I agree to the{" "}
                  <span className="text-orange-500 font-semibold cursor-pointer hover:text-orange-600">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-orange-500 font-semibold cursor-pointer hover:text-orange-600">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* ================= BUTTON ================= */}

              <button
                type="submit"
                className="group relative w-full overflow-hidden bg-[#101828] hover:bg-[#182338] text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/10 to-orange-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                <span className="relative cursor-pointer active:scale-95  z-10 font-semibold lg:text-sm flex items-center justify-center gap-2">
                  Create My Account

                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 text-orange-400">
                    →
                  </span>
                </span>
              </button>


                <button
                type="button"
      
                className="w-full cursor-pointer active:scale-95 flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-[#e4e7ec] bg-white text-[#101828] font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 active:scale-95">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.16 13.22l7.98 6.19C13.03 13.72 18.05 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.3 5.66c4.26-3.93 6.46-9.72 6.46-17.31z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.14 28.59A14.4 14.4 0 0 1 9.36 24c0-1.59.27-3.12.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.58 10.78l7.56-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.9-5.79l-7.3-5.66c-2.03 1.36-4.63 2.16-8.6 2.16-5.95 0-10.97-4.22-12.86-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48z"
                  />
                </svg>
                Continue with Google
              </button>
            </form>

            {/* ================= DIVIDER ================= */}

            <div className="flex items-center gap-4 my-7">
              <div className="flex-1 h-px bg-[#eaecf0]" />

              <span className="text-[10px] font-bold tracking-widest text-slate-400">
                OR
              </span>

              <div className="flex-1 h-px bg-[#eaecf0]" />
            </div>

            {/* ================= LOGIN ================= */}

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-orange-500 font-bold hover:text-orange-600 transition-colors"
              >
                Sign in
              </button>
            </p>

            {/* ================= SECURITY ================= */}

            <div className="flex items-center justify-center gap-2 mt-8 text-[10px] uppercase tracking-widest text-slate-400">
              <span className="text-green-500">●</span>
              Secure & encrypted registration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
