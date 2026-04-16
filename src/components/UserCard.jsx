import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const getSkills = (candidate) => {
  const rawSkills =
    candidate?.skills ??
    candidate?.skill ??
    candidate?.techStack ??
    candidate?.techStacks ??
    candidate?.techSkills;

  if (Array.isArray(rawSkills)) {
    return rawSkills
      .filter(Boolean)
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof rawSkills === "string") {
    return rawSkills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const UserCard = ({ user, showActions = true }) => {
  const { _id, firstName, lastName, photoUrl, age, about, gender } = user;
  const skills = getSkills(user);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cc-glass w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl shadow-black/30">
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={photoUrl}
          alt="Profile"
          className="h-full w-full object-cover grayscale-[0.1] transition-all duration-500 hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#060e20] via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="cc-title text-2xl font-bold text-white">
            {firstName} {lastName}
            {age ? `, ${age}` : ""}
          </h3>
          {gender && (
            <p className="text-sm font-semibold text-[#d9b0ff]">{gender}</p>
          )}
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#9baad6]">
            Top Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#002f78] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#9ec0ff]"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="rounded-full border border-[#38476d] px-3 py-1 text-xs font-semibold text-[#9baad6]">
                No skills listed
              </span>
            )}
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-[#9baad6]">
          {about || "Open to exciting collaboration opportunities."}
        </p>

        {showActions && (
          <div className="flex gap-3">
            <button
              className="cursor-pointer w-full rounded-xl border border-[#38476d] px-4 py-3 text-sm font-bold text-[#9baad6] transition-colors hover:bg-[#142449] hover:text-white"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="cursor-pointer cc-primary-btn w-full rounded-xl px-4 py-3 text-sm font-bold shadow-lg shadow-[#9c48ea]/20 transition-transform active:scale-95"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
