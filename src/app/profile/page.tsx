"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserData {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/user/me');
        setUser(response.data.user);
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile');
        
        // If unauthorized, redirect to login
        if (error.response?.status === 401) {
          toast.error('Please log in to view your profile');
          setTimeout(() => {
            router.push('/login');
          }, 1500);
        }
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      toast.success("Logged out successfully");

      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (error) {
      toast.error('Failed to logout');
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-800 px-6 py-8">
            <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
            <p className="text-blue-100">Manage your account information</p>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            {user ? (
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white text-2xl font-bold rounded-full h-16 w-16 flex items-center justify-center mr-4">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{user.username}</h2>
                    <p className="text-blue-400">{user.email}</p>
                    <div className="mt-1">
                      {user.isVerified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Not Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-zinc-800 pt-6">
                  <h3 className="text-lg font-semibold mb-3">Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400">Username</p>
                      <p className="font-medium">{user.username}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400">Email Address</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400">Account Created</p>
                      <p className="font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                      <p className="text-sm text-zinc-400">Last Updated</p>
                      <p className="font-medium">
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-zinc-800 pt-6 flex flex-wrap gap-3">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium transition-colors"
                  >
                    Logout
                  </button>
                  
                  <Link
                    href="/"
                    className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md font-medium transition-colors"
                  >
                    Back to Home
                  </Link>
                  
                  {!user.isVerified && (
                    <button
                      onClick={async () => {
                        try {
                          await axios.post('/api/user/resend-verification', { email: user.email });
                          toast.success('Verification email sent!');
                        } catch (error) {
                          toast.error('Failed to send verification email');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
                    >
                      Verify Email
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-xl">User information not available</p>
                <Link
                  href="/login"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
