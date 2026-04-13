import React from "react";

const RefundPolicy = () => {
  return (
    <main className="min-h-screen bg-base-200 text-base-content px-4 py-10 pb-28">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Refund Policy</h1>
        <p className="font-medium">Last Updated: April 2026</p>

        <h2 className="text-xl font-semibold">Subscription Plans</h2>
        <p>
          All payments made for premium memberships are non-refundable once the service has been activated. Please review your plan details before proceeding with payment.
        </p>

        <h2 className="text-xl font-semibold">Cancellation</h2>
        <p>
          You may cancel your subscription at any time. After cancellation, your premium access will remain active until the end of the current billing cycle. No partial refunds will be issued for unused days.
        </p>

        <h2 className="text-xl font-semibold">Technical Issues</h2>
        <p>
          In case of accidental double payments or verified technical errors, eligible refunds will be processed within 7 working days of confirmation. Our team may request supporting details to validate the issue.
        </p>

        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          For refund-related queries or issues, please contact us at support@collabcode Our support team will respond as soon as possible.
        </p>

        <p>© 2026 CollabCode. All Rights Reserved.</p>
      </div>
    </main>
  );
};

export default RefundPolicy;