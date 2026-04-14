import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#20345d] bg-[#08142d]/80 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-[#20345d] pb-6">
          <h2 className="cc-title text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Build with the right collaborators.
          </h2>
          <span className="rounded-full border border-[#334977] bg-[#142449]/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#b8c7f1]">
            CollabCode
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#9baad6]">
              Services
            </h3>
            <ul className="space-y-2.5 text-base font-medium leading-relaxed text-[#d8e2ff] md:text-lg">
              <li className="transition-colors hover:text-white">
                Find Collaborators
              </li>
              <li className="transition-colors hover:text-white">
                Show off your skills
              </li>
              <li className="transition-colors hover:text-white">
                Create and work on projects together
              </li>
              <li className="transition-colors hover:text-white">
                Premium Membership
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#9baad6]">
              Company
            </h3>
            <ul className="space-y-2.5 text-base font-medium leading-relaxed text-[#d8e2ff] md:text-lg">
              <li className="transition-colors hover:text-white">About us</li>
              <li>
                <a
                  href="mailto:support@collabcode.in"
                  className="transition-all hover:text-white hover:underline hover:underline-offset-4"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#9baad6]">
              Legal
            </h3>
            <ul className="space-y-2.5 text-base font-medium leading-relaxed text-[#d8e2ff] md:text-lg">
              <li>
                <Link
                  to="/privacy-policy"
                  className="transition-all hover:text-white hover:underline hover:underline-offset-4"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="transition-all hover:text-white hover:underline hover:underline-offset-4"
                >
                  Terms of use
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="transition-all hover:text-white hover:underline hover:underline-offset-4"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="transition-all hover:text-white hover:underline hover:underline-offset-4"
                >
                  Refund &amp; Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#20345d] pt-5 text-xs text-[#8ea0cf] md:text-sm">
          © {new Date().getFullYear()} CollabCode. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
