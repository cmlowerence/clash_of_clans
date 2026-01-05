import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/authSlice';

const Login = () => {
  const [key, setKey] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key.trim().length > 10) {
      dispatch(login(key));
      navigate('/search'); // Redirect to search page after login
    } else {
      alert("Please enter a valid API Key");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-neutral-800 rounded-xl p-8 border border-gray-700 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Access the Arena</h2>
          <p className="mt-2 text-gray-400">Enter your Clash of Clans API Key</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300">
              API Key (Bearer Token)
            </label>
            <div className="mt-1">
              <textarea
                id="apiKey"
                rows="4"
                className="w-full bg-neutral-900 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                placeholder="eyJ0eXAiOiJKV1QiLCJhbGci..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Don't have a key? Get one at <a href="https://developer.clashofclans.com" target="_blank" rel="noreferrer" className="text-yellow-500 hover:underline">developer.clashofclans.com</a>
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transform hover:scale-[1.02] transition-all"
          >
            ENTER BATTLE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
