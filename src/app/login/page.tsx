"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
    if (!user.email || !user.password) {
      return toast.error("Please fill in all required fields");
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", user);

      toast.success("Login successful!");

      // Redirect to dashboard or home page
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response) {
        // Check if the error is due to unverified email
        if (error.response.data?.error === "Email not verified") {
          toast.error("Please verify your email before logging in");

          // Show option to resend verification email
          const resend = confirm(
            "Would you like to resend the verification email?"
          );
          if (resend) {
            try {
              await axios.post("/api/user/resend-verification", {
                email: user.email,
              });
              toast.success("Verification email sent!");
            } catch (resendError) {
              toast.error("Failed to resend verification email");
            }
          }
        } else {
          // Handle other API errors
          toast.error(error.response.data?.error || "Login failed");
        }
      } else if (error.request) {
        // Network error
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="bg-zinc-900 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex justify-end mt-1">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
