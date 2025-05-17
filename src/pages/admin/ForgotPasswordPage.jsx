import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      
      await resetPassword(email);
      setMessage('Check your email for further instructions');
    } catch (error) {
      setError(error.message);
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
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 text-transparent bg-clip-text">
                LOTOPITAL
              </span>
            </Link>
            <h1 className="text-2xl font-bold mt-6 mb-2">Forgot Password</h1>
            <p className="text-gray-600">Enter your email to reset your password</p>
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
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                placeholder="admin@lotopital.com"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="mr-2 h-4 w-4" />
                  Reset Password
                </span>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link to="/admin/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </p>
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
};

export default ForgotPasswordPage;