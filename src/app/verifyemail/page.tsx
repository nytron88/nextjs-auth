"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyEmail = async () => {
    try {
      setVerifying(true);
      setError("");

      if (!token) {
        setError("Verification token is missing");
        toast.error("Verification token is missing");
        return;
      }

      // Validate token format
      if (typeof token !== "string" || token.trim() === "") {
        setError("Invalid verification token");
        toast.error("Invalid verification token");
        return;
      }

      await axios.post("/api/user/verifyemail", { token });
      toast.success("Email verified successfully!");
      setVerified(true);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      console.error("Verification error:", error);

      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage =
          error.response.data?.error || "Email verification failed";
        setError(errorMessage);
        toast.error(errorMessage);

        if (
          error.response.status === 400 &&
          error.response.data?.error === "Invalid token"
        ) {
          setError(
            "Your verification link is invalid or has expired. Please request a new verification email."
          );
          toast.error("Verification link is invalid or expired");
        } else if (error.response.status === 500) {
          setError("Server error. Please try again later or contact support.");
          toast.error("Server error");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError(
          "No response from server. Please check your internet connection and try again."
        );
        toast.error("Network error");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An unexpected error occurred. Please try again later.");
        toast.error("Unexpected error");
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="bg-zinc-900 p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Verify Your Email</h1>

        {!verified && !error && (
          <div className="mb-6">
            <p className="mb-6">
              Click the button below to verify your email address.
            </p>

            <button
              onClick={verifyEmail}
              disabled={verifying || !token}
              className={`w-full py-3 rounded-md text-white font-medium 
                ${
                  verifying || !token
                    ? "bg-blue-700 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-700 transition-colors"
                }`}
            >
              {verifying ? "Verifying..." : "Verify Email"}
            </button>

            {!token && (
              <p className="mt-4 text-red-400 text-sm">
                No verification token found in the URL.
              </p>
            )}
          </div>
        )}

        {verified && (
          <div className="mb-6 text-green-400">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-lg font-medium">
              Your email has been verified successfully!
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              You will be redirected to the login page shortly.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 text-red-400">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">Verification Failed</p>
            <p className="mt-2">{error}</p>

            {error.includes("expired") && (
              <Link
                href="/resend-verification"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Request New Verification
              </Link>
            )}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
