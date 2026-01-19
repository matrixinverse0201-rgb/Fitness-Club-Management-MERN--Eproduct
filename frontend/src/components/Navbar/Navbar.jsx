import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      {/* LOGO */}
      <div className="navbar-left">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* CENTER LINKS */}
      <ul className="navbar-centre">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/feedback">Feedback</NavLink></li>

        {/* AUTH LINKS */}
        {!user ? (
          <>
            <li><NavLink to="/locate-gym">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </>
        ) : (
          <>
            {/* ADMIN LINK */}
            {user.role === "admin" && (
              <li
                className="nav-user"
                onClick={() => navigate("/admin")}
              >
                🛠 Admin
              </li>
            )}

            {/* USER DASHBOARD */}
            <li
              className="nav-user"
              onClick={() => navigate("/dashboard")}
            >
              👤 {user.name}
            </li>

            {/* LOGOUT */}
            <li
              className="nav-logout"
              onClick={handleLogout}
            >
              Logout
            </li>
          </>
        )}
      </ul>

      {/* RIGHT ICONS */}
      <div className="navbar-right">
        <img src={search_icon} alt="search" />
        <img src={twitter_icon} alt="twitter" />
        <img src={youtube_icon} alt="youtube" />
        <img src={instagram_icon} alt="instagram" />
      </div>
    </div>
  );
};

export default Navbar;