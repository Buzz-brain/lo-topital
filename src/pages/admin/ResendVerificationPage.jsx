import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, SendHorizonal } from 'lucide-react';

const apiURL = import.meta.env.VITE_API_URL;

const ResendVerificationPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Fetch user email from backend on mount
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await fetch(`${apiURL}/get-admin-email`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setEmail(data.email);
        } else {
          setError(data.message || 'Unable to fetch email');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${apiURL}/resend-verification`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        if (data.cooldown) {
          setCooldown(data.cooldown);
        } else {
          setCooldown(60); // fallback
        }
      } else {
        setError(data.message || "Failed to resend verification email");
        if (data.cooldown) {
          setCooldown(data.cooldown);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              Resend Verification Email
            </h1>
            <p className="text-gray-600">
              {email
                ? `Verification will be sent to: ${email}`
                : "Fetching your email..."}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <p className="text-sm text-gray-500 mb-6">
              Please make sure you're logged in to receive the email
              verification link.
            </p>

            {cooldown > 0 ? (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded cursor-not-allowed"
              >
                Resend available in {cooldown}s
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <SendHorizonal className="mr-2 h-4 w-4" />
                    Resend Email
                  </span>
                )}
              </button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResendVerificationPage;
