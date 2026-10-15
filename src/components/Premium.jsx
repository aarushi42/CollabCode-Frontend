import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleByClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true },
    );

    const { amount, keyId, currency, notes, orderId } = order.data;
    //it should open the razorpay dialogue box

    const options = {
      key: keyId,
      amount,
      currency,
      name: "CollabCode",
      description: "Premium Membership",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-6 py-16">
      <section className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#4b3b82] bg-[#111d3d]/90 p-8 text-center shadow-2xl shadow-[#080d23]/50 md:p-12">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#8d6bff] via-[#c180ff] to-[#6fe7d2]" />
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2a2357] text-[#c180ff] ring-1 ring-[#7657c9]/50">
          <svg
            aria-hidden="true"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M12 3l8.25 4.5v4.75c0 4.1-2.7 7.85-8.25 9.75C6.45 20.1 3.75 16.35 3.75 12.25V7.5L12 3Z"
            />
          </svg>
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#9b88e8]">
          Premium membership
        </p>
        <h1 className="cc-title mt-3 text-3xl font-extrabold text-white md:text-4xl">
          You&apos;re already premium
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#aebce0]">
          Your membership is active. Enjoy unlimited collaboration and all
          premium features available on CollabCode.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#315a67] bg-[#122f3b] px-4 py-2 text-sm font-semibold text-[#8de6d4]">
          <span className="h-2 w-2 rounded-full bg-[#6fe7d2]" />
          Membership active
        </div>
      </section>
    </main>
  ) : (
    <main className="px-6 pb-20 pt-16">
      <div className="mx-auto mb-14 max-w-6xl text-center">
        <h2 className="cc-title text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          Elevate Your <span className="text-[#c180ff]">Experience.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9baad6]">
          Unlock advanced collaboration features, exclusive profile badges, and
          unlimited potential for your engineering journey.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        <article className="flex h-full flex-col rounded-3xl border border-[#314772] bg-[#0f1d3a]/70 p-8 shadow-2xl shadow-black/20">
          <span className="rounded-full bg-[#142449] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#adc6ff]">
            Silver Tier
          </span>
          <h3 className="cc-title mt-4 text-3xl font-bold text-white">
            Silver Plan
          </h3>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-bold text-white">₹999</span>
            <span className="pb-1 text-[#9baad6]">/ 3 months</span>
          </div>

          <ul className="mt-8 flex-1 space-y-4 text-[#d8e2ff]">
            <li>Chat access</li>
            <li>100 requests / day</li>
            <li>Blue tick badge</li>
          </ul>

          <button
            onClick={() => handleByClick("silver")}
            className="cursor-pointer mt-8 w-full rounded-xl border border-[#3a4f7b] bg-[#142449] px-4 py-4 text-sm font-bold text-[#d8e2ff] transition-colors hover:bg-[#1b2d55]"
          >
            Buy Silver
          </button>
        </article>

        <article className="relative flex h-full flex-col rounded-3xl border border-[#c180ff]/50 bg-[#111f3e] p-8 shadow-2xl shadow-[#9c48ea]/15">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-[#9c48ea] to-[#c180ff] px-6 py-1.5 text-sm font-bold text-[#190728]">
            MOST POPULAR
          </span>

          <span className="rounded-full bg-[#c180ff]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#c180ff]">
            Gold Tier
          </span>
          <h3 className="cc-title mt-4 text-3xl font-bold text-white">
            Gold Plan
          </h3>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-bold text-white">₹1999</span>
            <span className="pb-1 text-[#9baad6]">/ 6 months</span>
          </div>

          <ul className="mt-8 flex-1 space-y-4 text-[#d8e2ff]">
            <li>Unlimited requests</li>
            <li>Full chat access</li>
            <li>Exclusive Blue tick</li>
            <li>Early feature access</li>
          </ul>

          <button
            onClick={() => handleByClick("gold")}
            className="cursor-pointer cc-primary-btn mt-8 w-full rounded-xl px-4 py-4 text-sm font-bold shadow-[0_0_20px_rgba(193,128,255,0.35)]"
          >
            Buy Gold
          </button>
        </article>
      </div>

      <div className="mx-auto mt-20 max-w-5xl text-center">
        <p className="cc-title mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#9baad6]">
          Trusted by developers from
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 text-2xl font-black text-white/60 md:gap-14">
          <span>STACK</span>
          <span>GITHUB</span>
          <span>Vercel</span>
          <span>OpenAI</span>
        </div>
      </div>
    </main>
  );
};

export default Premium;
