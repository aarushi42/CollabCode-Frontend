import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

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

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review" + "/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (requests?.length === 0) {
    return (
      <div className="mx-auto my-16 max-w-3xl px-4 text-center">
        <h1 className="cc-title text-3xl font-bold text-white">
          No Requests Found
        </h1>
        <p className="mt-3 text-[#9baad6]">
          No pending collaborator requests right now.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 pb-16 pt-12">
      <div className="space-y-2">
        <h1 className="cc-title px-2 text-4xl font-extrabold tracking-tight text-white">
          Connection <span className="text-[#c180ff]">Requests</span>
        </h1>
        <p className="px-2 text-[#9baad6]">
          Review developers who want to collaborate on your projects.
        </p>
      </div>

      <div className="space-y-4">
        {requests &&
          requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;
            const skills = getSkills(request?.fromUserId);

            return (
              <article
                key={_id}
                className="cc-glass rounded-2xl p-5 transition-colors hover:bg-[#142449]/70"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <img
                    alt="profile"
                    src={photoUrl}
                    className="h-16 w-16 rounded-full border-2 border-[#2f4270] object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="cc-title text-xl font-bold text-white">
                        {firstName} {lastName}
                      </h3>
                      {age && gender && (
                        <span className="rounded-full bg-[#002455] px-3 py-1 text-xs font-semibold text-[#74a3ff]">
                          {age} {gender}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#9baad6]">
                      {about}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.length > 0 ? (
                        skills.slice(0, 4).map((skill) => (
                          <span
                            key={`${_id}-${skill}`}
                            className="rounded-full bg-[#002f78] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#9ec0ff]"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs font-medium text-[#7d8fbe]">
                          Skills not listed
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        className="w-full rounded-xl border border-[#38476d] bg-[#142449] px-4 py-3 text-sm font-semibold text-[#9baad6] transition-colors hover:text-white"
                        onClick={() => reviewRequest("rejected", request._id)}
                      >
                        Ignore
                      </button>
                      <button
                        className="cc-primary-btn w-full rounded-xl px-4 py-3 text-sm font-bold shadow-lg shadow-[#9c48ea]/20"
                        onClick={() => reviewRequest("accepted", request._id)}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </main>
  );
};

export default Request;
