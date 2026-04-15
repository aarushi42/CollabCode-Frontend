import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { FeedShimmer } from "./Shimmer";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;

    const getFeed = async () => {
      if (feed) {
        if (!isCancelled) setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
        if (!isCancelled) {
          dispatch(addFeed(res.data));
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    getFeed();

    return () => {
      isCancelled = true;
    };
  }, [dispatch, feed]);

  if (isLoading || !feed) return <FeedShimmer />;

  if (feed.length <= 0) {
    return (
      <div className="mx-auto my-16 max-w-3xl px-4 text-center">
        <h1 className="cc-title text-3xl font-bold text-white">
          No more users found
        </h1>
        <p className="mt-3 text-[#9baad6]">
          You have discovered everyone for now. Check back soon for fresh
          collaborators.
        </p>
      </div>
    );
  }

  return (
    feed && (
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12">
        <section className="mb-10 text-center">
          <div className="inline-flex items-center rounded-full border border-[#2f4270] bg-[#142449]/50 px-4 py-1.5">
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-[#ff67ad]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb0cd]">
              Active Collaborators Nearby
            </span>
          </div>
          <h1 className="cc-title mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Build your <span className="text-[#ffb0cd]">Dream Team</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#9baad6]">
            Connect to developers ready to ship production-grade projects with
            you.
          </p>
        </section>

        <section className="flex justify-center">
          <UserCard user={feed[0]} />
        </section>
      </main>
    )
  );
};

export default Feed;
