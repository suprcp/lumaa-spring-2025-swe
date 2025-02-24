import React, { useState } from 'react';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const Login = ({ setToken }: { setToken: (token: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const url = isRegister
        ? `${REACT_APP_API_URL}/auth/register`
        : `${REACT_APP_API_URL}/auth/login`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegister) {
          setIsRegister(false);
          setError('Registration successful. Please log in.');
        } else if (data.access_token) {
          setToken(data.access_token);
          localStorage.setItem('token', data.access_token);
        }
      } else {
        if (response.status === 401) {
          setError('Account does not exist. Please register first.');
        } else {
          setError(data.message || 'Operation failed');
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login/Register error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl text-center font-medium text-gray-800">
            {isRegister ? 'Register' : 'Login'}
          </h2>

          {error && (
            <div className={`p-3 text-sm rounded ${
              error.includes('successful')
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}>
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-500 hover:text-blue-700"
            >
              {isRegister ? 'Login' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;