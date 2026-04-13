import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gradient-to-r from-[#0f1724] to-[#101a2b] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          <div>
            <h3 className="text-[#8b97a8] text-xs tracking-[0.18em] font-semibold uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-base md:text-lg leading-relaxed font-medium text-white/95">
              <li className="hover:text-white transition-colors">
                Developer Matchmaking
              </li>
              <li className="hover:text-white transition-colors">
                Portfolio Showcase
              </li>
              <li className="hover:text-white transition-colors">
                Team Collaboration
              </li>
              <li className="hover:text-white transition-colors">
                Premium Membership
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#8b97a8] text-xs tracking-[0.18em] font-semibold uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-base md:text-lg leading-relaxed font-medium text-white/95">
              <li className="hover:text-white transition-colors">About us</li>
              <li>
                <a
                  href="mailto:support@collabcode.in"
                  className="hover:underline underline-offset-4 transition-all"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#8b97a8] text-xs tracking-[0.18em] font-semibold uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-base md:text-lg leading-relaxed font-medium text-white/95">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:underline underline-offset-4 transition-all"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:underline underline-offset-4 transition-all"
                >
                  Terms of use
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="hover:underline underline-offset-4 transition-all"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="hover:underline underline-offset-4 transition-all"
                >
                  Refund &amp; Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/10 text-xs md:text-sm text-white/60">
          © {new Date().getFullYear()} CollabCode. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
