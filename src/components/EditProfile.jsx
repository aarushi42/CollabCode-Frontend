import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

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

const getSkillFieldKey = (candidate) => {
  if (!candidate || typeof candidate !== "object") return "skills";

  if (Object.prototype.hasOwnProperty.call(candidate, "skills")) {
    return "skills";
  }
  if (Object.prototype.hasOwnProperty.call(candidate, "skill")) {
    return "skill";
  }
  if (Object.prototype.hasOwnProperty.call(candidate, "techStack")) {
    return "techStack";
  }
  if (Object.prototype.hasOwnProperty.call(candidate, "techStacks")) {
    return "techStacks";
  }
  if (Object.prototype.hasOwnProperty.call(candidate, "techSkills")) {
    return "techSkills";
  }

  return "skills";
};

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(getSkills(user));
  const skillFieldKey = getSkillFieldKey(user);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const addSkill = () => {
    const nextSkill = skillInput.trim();
    if (!nextSkill) return;
    setSkills((prev) => {
      if (prev.some((item) => item.toLowerCase() === nextSkill.toLowerCase())) {
        return prev;
      }
      return [...prev, nextSkill];
    });
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((item) => item !== skillToRemove));
  };

  const saveProfile = async () => {
    setError("");
    const trimmedSkills = skills.map((item) => item.trim()).filter(Boolean);
    const normalizedAge = age === "" ? undefined : Number(age);

    if (age === "") {
      setError("Age is required");
      return;
    }

    if (!gender) {
      setError("Gender is required");
      return;
    }

    if (trimmedSkills.length === 0) {
      setError("At least one skill is required");
      return;
    }

    if (age !== "" && Number.isNaN(normalizedAge)) {
      setError("Age must be a valid number");
      return;
    }

    const payload = {
      firstName,
      lastName,
      about,
      age: normalizedAge,
      gender,
      photoUrl,
      [skillFieldKey]: trimmedSkills,
    };

    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedUser = res?.data?.data ?? res?.data;
      if (updatedUser) {
        dispatch(addUser(updatedUser));
      }
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Unable to save profile right now",
      );
    }
  };

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-8">
        <section className="mb-10 overflow-hidden rounded-3xl border border-[#253a66] bg-[#101e3e]/70 shadow-2xl shadow-black/30">
          <div className="h-40 bg-linear-to-br from-[#081329] via-[#142449] to-[#002455]" />
          <div className="-mt-14 flex flex-col gap-4 px-6 pb-6 md:flex-row md:items-end md:justify-between md:px-8">
            <div className="flex items-end gap-4">
              <img
                src={photoUrl}
                alt="profile"
                className="h-28 w-28 rounded-2xl border-4 border-[#060e20] object-cover shadow-xl"
              />
              <div>
                <h1 className="cc-title text-3xl font-bold text-white">
                  {firstName} {lastName}
                </h1>
                <p className="text-[#9baad6]">
                  Build your identity for the right collaborators.
                </p>
              </div>
            </div>
            <button
              className="cursor-pointer cc-primary-btn rounded-xl px-6 py-3 text-sm font-bold shadow-lg shadow-[#9c48ea]/20"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="space-y-6 lg:col-span-2">
            <div className="cc-glass rounded-3xl p-6">
              <h2 className="cc-title mb-5 text-xl font-bold text-white">
                Personal Narrative
              </h2>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#9baad6]">
                About
              </label>
              <textarea
                className="h-32 w-full rounded-xl border border-[#334977] bg-[#142449]/50 p-4 text-sm text-[#dee5ff] outline-none focus:border-[#c180ff]"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="cc-glass rounded-3xl p-6">
              <h2 className="cc-title mb-5 text-xl font-bold text-white">
                Identity
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#9baad6]">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 p-3 text-sm text-[#dee5ff] outline-none focus:border-[#c180ff]"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#9baad6]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 p-3 text-sm text-[#dee5ff] outline-none focus:border-[#c180ff]"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#9baad6]">
                    Age
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 p-3 text-sm text-[#dee5ff] outline-none focus:border-[#c180ff]"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#9baad6]">
                    Gender
                  </label>
                  <select
                    className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 p-3 text-sm text-[#dee5ff] outline-none focus:border-[#c180ff]"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="cc-glass rounded-3xl p-6">
              <h2 className="cc-title mb-5 text-xl font-bold text-white">
                Tech Stack &amp; Mastery
              </h2>
              <label className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#9baad6]">
                Active Skills
              </label>
              <div className="mb-4 flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="cursor-pointer rounded-full border border-[#6049a5] bg-[#2a2456] px-4 py-1.5 text-sm font-semibold text-[#b880ff]"
                    >
                      {skill} <span className="ml-1">×</span>
                    </button>
                  ))
                ) : (
                  <span className="text-sm text-[#8ea0cf]">
                    No skills added yet.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#334977] bg-[#142449]/50 px-4 py-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Add a new skill..."
                  className="w-full bg-transparent text-sm text-[#dee5ff] outline-none placeholder:text-[#7d8fbe]"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="cursor-pointer text-2xl font-bold text-[#b880ff]"
                  aria-label="Add skill"
                >
                  +
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="cc-glass rounded-3xl p-6">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#9baad6]">
                Photo URL
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-[#334977] bg-[#142449]/50 p-3 text-sm text-[#dee5ff] outline-none focus:border-[#c180ff]"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <UserCard
              user={{
                firstName,
                lastName,
                about,
                age,
                gender,
                photoUrl,
                skills,
              }}
              showActions={false}
            />

            <button
              onClick={saveProfile}
              className="cursor-pointer cc-primary-btn w-full rounded-xl px-6 py-3 text-sm font-bold shadow-lg shadow-[#9c48ea]/20"
            >
              Save Profile
            </button>
          </section>
        </div>

        {error && (
          <p className="mt-4 text-sm font-semibold text-[#ff97a3]">{error}</p>
        )}
      </main>
      {showToast && (
        <div className="fixed right-5 top-20 z-50 rounded-xl border border-[#2f4270] bg-[#101e3e] px-4 py-3 text-sm font-semibold text-[#d8e2ff] shadow-xl">
          <span>Profile updated successfully!</span>
        </div>
      )}
    </>
  );
};

export default EditProfile;
