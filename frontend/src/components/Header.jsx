import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  const name = localStorage.getItem("name") || "User";

  return (
    <header className="flex items-center justify-between bg-blue-600 text-white px-6 py-4 shadow-md">

      <h1 className="text-xl font-semibold tracking-wide">
        Welcome <span className="font-bold">{name}</span>
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-50 active:scale-95 transition-all duration-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
