import React, { useState } from "react";

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState("");

  const openPaymentModal = (planName) => {
    setSelectedPlan(planName);
  };

  return (
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
            onClick={() => openPaymentModal("Silver")}
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
            onClick={() => openPaymentModal("Gold")}
            className="cursor-pointer cc-primary-btn mt-8 w-full rounded-xl px-4 py-4 text-sm font-bold shadow-[0_0_20px_rgba(193,128,255,0.35)]"
          >
            Buy Gold
          </button>
        </article>
      </div>

      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030812]/70 px-4 backdrop-blur-sm"
          onClick={() => setSelectedPlan("")}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#334977] bg-[#101e3e] p-6 shadow-2xl shadow-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="cc-title text-2xl font-bold text-white">
              {selectedPlan} Plan
            </h3>
            <p className="mt-3 text-[#b8c7f1]">Payment integration soon.</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPlan("")}
                className="cursor-pointerrounded-lg border border-[#3a4f7b] bg-[#142449] px-4 py-2 text-sm font-semibold text-[#d8e2ff] transition-colors hover:bg-[#1b2d55]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
