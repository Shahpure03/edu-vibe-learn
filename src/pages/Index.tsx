import { useState } from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </>
  );
};

export default Index;
