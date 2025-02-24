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
        setError(data.message || 'Operation failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login/Register error:', err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isRegister ? 'Register' : 'Login'}
        </button>
        <p
          onClick={() => setIsRegister(!isRegister)}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          {isRegister
            ? 'Login'
            : 'Sign up'}
        </p>
      </form>
    </div>
  );
};

export default Login;
