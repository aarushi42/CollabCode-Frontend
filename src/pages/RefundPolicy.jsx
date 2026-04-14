import React from "react";

const RefundPolicy = () => {
  return (
    <main className="px-4 py-10 text-[#d8e2ff]">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Refund Policy</h1>
        <p className="font-medium">Last Updated: April 2026</p>

        <h2 className="text-xl font-semibold">Subscription Plans</h2>
        <p>
          All payments made for premium memberships are non-refundable once the
          service has been activated. Please review your plan details before
          proceeding with payment.
        </p>

        <h2 className="text-xl font-semibold">Cancellation</h2>
        <p>
          You may cancel your subscription at any time. After cancellation, your
          premium access will remain active until the end of the current billing
          cycle. No partial refunds will be issued for unused days.
        </p>

        <h2 className="text-xl font-semibold">Technical Issues</h2>
        <p>
          In cases of duplicate payments or confirmed technical errors, refunds
          may be considered. Eligible refunds will be processed within 7 working
          days after verification. Our team may request additional details or
          proof to validate such claims.
        </p>

        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          For any refund-related questions or concerns, please contact us at: 📧
          support@collabcode.in Our support team will review your request and
          respond as promptly as possible.
        </p>
      </div>
    </main>
  );
};

export default RefundPolicy;
