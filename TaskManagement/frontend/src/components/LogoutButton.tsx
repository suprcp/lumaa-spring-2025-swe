import React from 'react';

const LogoutButton = ({ setToken }: { setToken: (token: string) => void }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');


    setToken('');
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-button"
    >
      logout
    </button>
  );
};

export default LogoutButton;