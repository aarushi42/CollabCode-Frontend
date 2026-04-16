import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import Chat from "./Chat";
import { ConnectionsShimmer } from "./Shimmer";

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

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConnecions = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnections(res.data));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnecions();
  }, [dispatch]);

  if (isLoading || !connections) {
    return <ConnectionsShimmer />;
  }

  if (connections?.length === 0) {
    return (
      <div className="mx-auto my-16 max-w-3xl px-4 text-center">
        <h1 className="cc-title text-3xl font-bold text-white">
          No Connections Found
        </h1>
        <p className="mt-3 text-[#9baad6]">
          Start sending requests from Discover to build your network.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-8">
      <div className="mt-3 lg:hidden">
        {selectedConnection ? (
          <>
            <button
              type="button"
              onClick={() => setSelectedConnection(null)}
              className="mb-4 cursor-pointer rounded-xl border border-[#3b5386] bg-[#142449]/60 px-4 py-2 text-sm font-bold text-[#c7d8ff]"
            >
              Back to connections
            </button>
            <div className="h-[calc(100vh-10rem)]">
              <Chat
                targetUserId={selectedConnection._id}
                targetUserName={`${selectedConnection.firstName} ${selectedConnection.lastName}`}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="cc-title text-3xl font-bold text-white">
                Connections
              </h2>
              <span className="rounded-full bg-[#c180ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#c180ff]">
                {connections?.length || 0} Active
              </span>
            </div>

            <div className="space-y-4">
              {connections &&
                connections.map((connection) => {
                  const {
                    _id,
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                  } = connection;
                  const skills = getSkills(connection);

                  return (
                    <article
                      key={_id}
                      className="rounded-2xl border border-[#2d406b] bg-[#0f1d3a]/70 p-4 transition-all hover:bg-[#142449]/70"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          alt="profile"
                          src={photoUrl}
                          className="h-14 w-14 rounded-full border border-[#334977] object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="cc-title truncate text-lg font-bold text-white">
                            {firstName} {lastName}
                          </h3>
                          {age && gender && (
                            <p className="text-xs font-semibold text-[#74a3ff]">
                              {age} {gender}
                            </p>
                          )}
                          <p className="mt-2 line-clamp-2 text-sm text-[#9baad6]">
                            {about}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {skills.length > 0 ? (
                              skills.slice(0, 3).map((skill) => (
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
                          <button
                            className="cursor-pointer mt-3 w-full rounded-xl bg-[#c180ff]/10 px-4 py-2 text-sm font-bold text-[#c180ff] transition-colors hover:bg-[#c180ff] hover:text-[#140325]"
                            onClick={() => setSelectedConnection(connection)}
                          >
                            Open Chat
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          </>
        )}
      </div>

      <div className="mt-3 hidden grid-cols-1 gap-8 lg:grid lg:h-[calc(100vh-9rem)] lg:grid-cols-3">
        <section className="lg:col-span-1 lg:flex lg:min-h-0 lg:flex-col">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="cc-title text-3xl font-bold text-white">
              Connections
            </h2>
            <span className="rounded-full bg-[#c180ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#c180ff]">
              {connections?.length || 0} Active
            </span>
          </div>

          <div className="cc-scrollbar-thin space-y-4 overflow-y-auto pr-2 lg:min-h-0 lg:flex-1">
            {connections &&
              connections.map((connection) => {
                const {
                  _id,
                  firstName,
                  lastName,
                  photoUrl,
                  age,
                  gender,
                  about,
                } = connection;
                const skills = getSkills(connection);
                const isActive = selectedConnection?._id === _id;

                return (
                  <article
                    key={_id}
                    className={`rounded-2xl border p-4 transition-all ${
                      isActive
                        ? "border-[#c180ff]/60 bg-[#142449]"
                        : "border-[#2d406b] bg-[#0f1d3a]/70 hover:bg-[#142449]/70"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        alt="profile"
                        src={photoUrl}
                        className="h-14 w-14 rounded-full border border-[#334977] object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="cc-title truncate text-lg font-bold text-white">
                          {firstName} {lastName}
                        </h3>
                        {age && gender && (
                          <p className="text-xs font-semibold text-[#74a3ff]">
                            {age} {gender}
                          </p>
                        )}
                        <p className="mt-2 line-clamp-2 text-sm text-[#9baad6]">
                          {about}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {skills.length > 0 ? (
                            skills.slice(0, 3).map((skill) => (
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
                        <button
                          className={`cursor-pointer mt-3 w-full rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                            isActive
                              ? "bg-linear-to-r from-[#9c48ea] to-[#c180ff] text-[#160628]"
                              : "bg-[#c180ff]/10 text-[#c180ff] hover:bg-[#c180ff] hover:text-[#140325]"
                          }`}
                          onClick={() => setSelectedConnection(connection)}
                        >
                          Open Chat
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>

        <section className="lg:col-span-2 lg:min-h-0">
          {selectedConnection ? (
            <Chat
              targetUserId={selectedConnection._id}
              targetUserName={`${selectedConnection.firstName} ${selectedConnection.lastName}`}
            />
          ) : (
            <div className="flex min-h-105 items-center justify-center rounded-[30px] border border-dashed border-[#344a77] bg-[#0f1d3a]/50 p-10 text-center">
              <div>
                <h3 className="cc-title text-2xl font-bold text-white">
                  No chat opened
                </h3>
                <p className="mt-2 text-[#9baad6]">
                  Select a connection from the left panel to start chatting.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Connections;
