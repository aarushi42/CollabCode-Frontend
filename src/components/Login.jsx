import axios from "axios";
import React, { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center justify-center px-4 py-12">
      <section className="cc-glass w-full max-w-md rounded-3xl border border-[#2f4270] p-7 shadow-2xl shadow-black/30 md:p-8">
        <div className="mb-7 text-center">
          <h1 className="cc-title text-4xl font-extrabold tracking-tight text-white">
            {isLoginForm ? "Login" : "Sign Up"}
          </h1>
          <p className="mt-2 text-sm text-[#9baad6]">
            {isLoginForm
              ? "Continue your collaboration journey"
              : "Create your builder profile and get discovered"}
          </p>
        </div>

        <div className="space-y-4">
          {!isLoginForm && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#9baad6]">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 px-4 py-3 text-sm text-[#dee5ff] outline-none placeholder:text-[#7d8fbe] focus:border-[#c180ff]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Alex"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#9baad6]">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 px-4 py-3 text-sm text-[#dee5ff] outline-none placeholder:text-[#7d8fbe] focus:border-[#c180ff]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Rivera"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#9baad6]">
              Email Id
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 px-4 py-3 text-sm text-[#dee5ff] outline-none placeholder:text-[#7d8fbe] focus:border-[#c180ff]"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#9baad6]">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 px-4 py-3 text-sm text-[#dee5ff] outline-none placeholder:text-[#7d8fbe] focus:border-[#c180ff]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm font-semibold text-[#ff97a3]">{error}</p>
        )}

        <button
          className="cc-primary-btn mt-6 w-full rounded-xl px-4 py-3 text-sm font-bold shadow-lg shadow-[#9c48ea]/20"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() => setIsLoginForm((value) => !value)}
          className="mt-4 cursor-pointer text-center text-sm font-semibold text-[#b8c7f1] transition-colors hover:text-white"
        >
          {isLoginForm ? "New User? Signup here" : "Existing User? Login Here"}
        </p>
      </section>
    </main>
  );
};

export default Login;
