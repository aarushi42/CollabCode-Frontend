import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
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
          className="cc-title flex items-center gap-3 text-3xl font-extrabold text-white"
        >
          <span className="text-xl text-[#c180ff]">⌘</span>
          <span>CollabCode</span>
        </Link>

        {user && (
          <div className="ml-8 flex flex-1 items-center justify-end gap-6 lg:gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `inline-flex h-10 items-center text-lg font-semibold leading-none transition-colors ${isActive ? "text-white" : "text-[#97a8d8] hover:text-white"}`
              }
            >
              Discover
            </NavLink>
            <NavLink
              to="/connections"
              className={({ isActive }) =>
                `inline-flex h-10 items-center text-lg font-semibold leading-none transition-colors ${isActive ? "text-white" : "text-[#97a8d8] hover:text-white"}`
              }
            >
              Connections
            </NavLink>
            <NavLink
              to="/request"
              className={({ isActive }) =>
                `inline-flex h-10 items-center text-lg font-semibold leading-none transition-colors ${isActive ? "text-white" : "text-[#97a8d8] hover:text-white"}`
              }
            >
              Request
            </NavLink>
            <NavLink
              to="/premium"
              className={({ isActive }) =>
                `inline-flex h-10 items-center border-b-2 text-lg font-semibold leading-none transition-colors ${
                  isActive
                    ? "border-[#c180ff] text-[#c180ff]"
                    : "border-transparent text-[#97a8d8] hover:text-white"
                }`
              }
            >
              Premium
            </NavLink>

            <div className="group relative">
              <Link
                to="/profile"
                title="Profile"
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
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#b8c7f1] transition-colors hover:bg-[#142449] hover:text-white"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#b8c7f1] transition-colors hover:bg-[#142449] hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
