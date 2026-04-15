import React from "react";

const ShimmerLine = ({ className = "" }) => (
  <div className={`cc-shimmer h-3 rounded-full ${className}`} />
);

export const FeedShimmer = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12">
      <section className="mb-10 text-center">
        <div className="mx-auto h-8 w-64 rounded-full border border-[#2f4270] bg-[#142449]/50" />
        <div className="mx-auto mt-6 h-12 w-80 max-w-full rounded-xl cc-shimmer" />
        <div className="mx-auto mt-4 h-6 w-96 max-w-full rounded-lg cc-shimmer" />
      </section>

      <section className="flex justify-center">
        <div className="cc-glass w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl shadow-black/30">
          <div className="cc-shimmer h-72 w-full" />
          <div className="space-y-6 p-6">
            <div>
              <ShimmerLine className="mb-3 h-3 w-28" />
              <div className="flex flex-wrap gap-2">
                <div className="cc-shimmer h-6 w-16 rounded-full" />
                <div className="cc-shimmer h-6 w-20 rounded-full" />
                <div className="cc-shimmer h-6 w-14 rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              <ShimmerLine className="w-full" />
              <ShimmerLine className="w-[88%]" />
              <ShimmerLine className="w-[70%]" />
            </div>
            <div className="flex gap-3">
              <div className="cc-shimmer h-12 w-full rounded-xl" />
              <div className="cc-shimmer h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const RequestShimmer = () => {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 pb-16 pt-12">
      <div className="space-y-2">
        <ShimmerLine className="h-10 w-96 max-w-full" />
        <ShimmerLine className="h-5 w-full max-w-lg" />
      </div>

      <div className="space-y-4">
        {[1, 2].map((item) => (
          <article key={item} className="cc-glass rounded-2xl p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="cc-shimmer h-16 w-16 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <ShimmerLine className="h-7 w-56" />
                  <div className="cc-shimmer h-6 w-20 rounded-full" />
                </div>
                <div className="mt-3 space-y-2">
                  <ShimmerLine className="w-full" />
                  <ShimmerLine className="w-[80%]" />
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="cc-shimmer h-6 w-16 rounded-full" />
                  <div className="cc-shimmer h-6 w-20 rounded-full" />
                  <div className="cc-shimmer h-6 w-14 rounded-full" />
                </div>
                <div className="mt-5 flex gap-3">
                  <div className="cc-shimmer h-12 w-full rounded-xl" />
                  <div className="cc-shimmer h-12 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

const ConnectionCardShimmer = () => {
  return (
    <article className="rounded-2xl border border-[#2d406b] bg-[#0f1d3a]/70 p-4">
      <div className="flex items-start gap-4">
        <div className="cc-shimmer h-14 w-14 rounded-full" />
        <div className="min-w-0 flex-1">
          <ShimmerLine className="h-6 w-40" />
          <ShimmerLine className="mt-2 h-4 w-20" />
          <div className="mt-2 space-y-2">
            <ShimmerLine className="w-full" />
            <ShimmerLine className="w-[70%]" />
          </div>
          <div className="mt-3 flex gap-2">
            <div className="cc-shimmer h-6 w-16 rounded-full" />
            <div className="cc-shimmer h-6 w-20 rounded-full" />
            <div className="cc-shimmer h-6 w-14 rounded-full" />
          </div>
          <div className="cc-shimmer mt-3 h-10 w-full rounded-xl" />
        </div>
      </div>
    </article>
  );
};

export const ConnectionsShimmer = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-8">
      <div className="mt-3 grid grid-cols-1 gap-8 lg:h-[calc(100vh-9rem)] lg:grid-cols-3">
        <section className="lg:col-span-1 lg:flex lg:min-h-0 lg:flex-col">
          <div className="mb-5 flex items-center justify-between">
            <ShimmerLine className="h-9 w-44" />
            <div className="cc-shimmer h-7 w-20 rounded-full" />
          </div>
          <div className="cc-scrollbar-hide space-y-4 overflow-y-auto pr-1 lg:min-h-0 lg:flex-1">
            {[1, 2, 3].map((item) => (
              <ConnectionCardShimmer key={item} />
            ))}
          </div>
        </section>

        <section className="lg:col-span-2 lg:min-h-0">
          <ChatShimmer />
        </section>
      </div>
    </main>
  );
};

export const ChatShimmer = () => {
  return (
    <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[30px] border border-[#2a3e6a] bg-[#0e1b37]/60 backdrop-blur-lg">
      <div className="flex items-center justify-between border-b border-[#2a3e6a] bg-[#142449]/70 px-6 py-4">
        <div className="cc-shimmer h-6 w-36 rounded-md" />
        <div className="cc-shimmer h-3 w-20 rounded-md" />
      </div>

      <div className="cc-scrollbar-hide flex-1 space-y-4 overflow-y-auto p-6">
        <div className="max-w-[70%] rounded-2xl border border-[#344a77] bg-[#142449] p-4">
          <ShimmerLine className="h-3 w-24" />
          <ShimmerLine className="mt-3 h-4 w-40" />
          <ShimmerLine className="mt-2 h-4 w-24" />
        </div>
        <div className="ml-auto max-w-[55%] rounded-2xl border border-[#5a3b8c] bg-[#2a2051] p-4">
          <ShimmerLine className="h-3 w-20" />
          <ShimmerLine className="mt-3 h-4 w-32" />
        </div>
        <div className="max-w-[65%] rounded-2xl border border-[#344a77] bg-[#142449] p-4">
          <ShimmerLine className="h-3 w-28" />
          <ShimmerLine className="mt-3 h-4 w-52" />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-[#2a3e6a] bg-[#0f1d3a] p-4">
        <div className="cc-shimmer h-[50px] w-full rounded-xl" />
        <div className="cc-shimmer h-[50px] w-24 rounded-xl" />
      </div>
    </div>
  );
};
