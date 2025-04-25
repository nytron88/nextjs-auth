"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation checks
    if (!user.username || !user.email || !user.password) {
      return toast.error("Please fill in all required fields");
    }

    if (user.password !== user.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (user.password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      toast.success("Account created successfully! Please verify your email.");
      // Redirect to login page after successful signup
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="bg-zinc-900 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none"
              placeholder="johndoe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-medium mt-4 
              ${
                loading
                  ? "bg-blue-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 transition-colors"
              }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
