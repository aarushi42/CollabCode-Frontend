import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setIsMenuOpen(false);
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1b2b52] bg-[#050c1d]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link
          to="/"
          onClick={handleNavClick}
          className="cc-title flex items-center gap-3 text-3xl font-extrabold text-white"
        >
          <span className="text-xl text-[#c180ff]">👩‍💻</span>
          <span>CollabCode</span>
        </Link>

        {user && (
          <div className="ml-8 flex flex-1 items-center justify-end gap-6 lg:gap-10">
            <button
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#2b3d69] text-[#b8c7f1] transition-colors hover:bg-[#142449] hover:text-white lg:hidden"
            >
              {isMenuOpen ? (
                <span className="text-xl leading-none">&times;</span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>

            <NavLink
              to="/"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `hidden h-10 items-center text-lg font-semibold leading-none transition-colors lg:inline-flex ${isActive ? "text-white" : "text-[#97a8d8] hover:text-white"}`
              }
            >
              Discover
            </NavLink>
            <NavLink
              to="/connections"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `hidden h-10 items-center text-lg font-semibold leading-none transition-colors lg:inline-flex ${isActive ? "text-white" : "text-[#97a8d8] hover:text-white"}`
              }
            >
              Connections
            </NavLink>
            <NavLink
              to="/request"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `hidden h-10 items-center text-lg font-semibold leading-none transition-colors lg:inline-flex ${isActive ? "text-white" : "text-[#97a8d8] hover:text-white"}`
              }
            >
              Request
            </NavLink>
            <NavLink
              to="/premium"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `hidden h-10 items-center border-b-2 text-lg font-semibold leading-none transition-colors lg:inline-flex ${
                  isActive
                    ? "border-[#c180ff] text-[#c180ff]"
                    : "border-transparent text-[#97a8d8] hover:text-white"
                }`
              }
            >
              Premium
            </NavLink>

            <div className="group relative hidden lg:block">
              <Link
                to="/profile"
                title="Profile"
                onClick={handleNavClick}
                className="inline-flex h-11 w-11 items-center justify-center transition-transform hover:scale-105"
              >
                <img
                  alt="user photo"
                  src={user.photoUrl}
                  className="h-11 w-11 rounded-full border border-[#2b3d69] object-cover"
                />
              </Link>

              <div className="invisible absolute right-0 top-12 w-44 rounded-xl border border-[#2b3d69] bg-[#0f1d3a] p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <Link
                  to="/profile"
                  onClick={handleNavClick}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#b8c7f1] transition-colors hover:bg-[#142449] hover:text-white"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#b8c7f1] transition-colors hover:bg-[#142449] hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>

            {isMenuOpen && (
              <div className="absolute left-0 top-18 w-full border-b border-[#1b2b52] bg-[#0b1530] px-4 py-4 shadow-xl lg:hidden">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
                  <NavLink
                    to="/"
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
                        isActive
                          ? "bg-[#142449] text-white"
                          : "text-[#97a8d8] hover:bg-[#142449] hover:text-white"
                      }`
                    }
                  >
                    Discover
                  </NavLink>
                  <NavLink
                    to="/connections"
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
                        isActive
                          ? "bg-[#142449] text-white"
                          : "text-[#97a8d8] hover:bg-[#142449] hover:text-white"
                      }`
                    }
                  >
                    Connections
                  </NavLink>
                  <NavLink
                    to="/request"
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
                        isActive
                          ? "bg-[#142449] text-white"
                          : "text-[#97a8d8] hover:bg-[#142449] hover:text-white"
                      }`
                    }
                  >
                    Request
                  </NavLink>
                  <NavLink
                    to="/premium"
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
                        isActive
                          ? "bg-[#142449] text-[#c180ff]"
                          : "text-[#97a8d8] hover:bg-[#142449] hover:text-white"
                      }`
                    }
                  >
                    Premium
                  </NavLink>
                  <NavLink
                    to="/profile"
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
                        isActive
                          ? "bg-[#142449] text-white"
                          : "text-[#97a8d8] hover:bg-[#142449] hover:text-white"
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer rounded-lg px-3 py-2 text-left text-base font-semibold text-[#97a8d8] transition-colors hover:bg-[#142449] hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!user && (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer rounded-full cc-primary-btn px-6 py-2 text-base font-bold text-white transition-all  hover:shadow-lg hover:shadow-[#699cff]/30"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
