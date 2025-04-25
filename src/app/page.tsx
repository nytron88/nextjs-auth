import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 z-0"></div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Secure Authentication System
            </h1>

            <p className="text-lg text-zinc-300 mb-8">
              A robust authentication solution with email verification, secure
              login, and user profile management
            </p>

            <div className="flex gap-4">
              <Link
                href="/login"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 border border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-md font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-zinc-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Secure Authentication
              </h3>
              <p className="text-zinc-400 text-center">
                Secure user authentication with password hashing and JWT tokens
              </p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Email Verification
              </h3>
              <p className="text-zinc-400 text-center">
                Verify user emails to ensure authenticity and prevent fraud
              </p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                User Profiles
              </h3>
              <p className="text-zinc-400 text-center">
                Manage user profiles with detailed information and account
                settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-8">
            Join our secure platform today and experience the benefits of our
            robust authentication system.
          </p>

          <Link
            href="/signup"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-lg transition-colors inline-block"
          >
            Create Your Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-zinc-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Authentication System. All rights
              reserved.
            </div>

            <div className="flex gap-6">
              <Link
                href="/login"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/profile"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
