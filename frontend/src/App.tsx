import React, { useState } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import LogoutButton from "./components/LogoutButton";

const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <LogoutButton setToken={setToken} />
      <TaskList token={token} />
    </div>
  );
};

export default App;