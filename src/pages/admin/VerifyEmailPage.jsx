import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

function VerifyEmail() {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${apiURL}/verify-email/${token}`);
        const data = await response.json();
        if (response.ok) {
          setVerified(true);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred while verifying your email");
      } finally {
        setLoading(false);
      }
    };
    verifyEmail();
  }, [token]);

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
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 text-transparent bg-clip-text">
                LOTOPITAL
              </span>
            </Link>
            <h1 className="text-2xl font-bold mt-6 mb-2">Verify Email</h1>
            <p className="text-gray-600">Verify your email address</p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600"
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
              <span>Verifying Account...</span>
            </div>
          ) : (
            <>
              {verified ? (
                <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Email verified successfully! Go to Login</span>
                </div>
              ) : (
                error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                  </div>
                )
              )}
            </>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/admin/login"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Go to Login
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-primary-600">
            &larr; Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default VerifyEmail;
