import React from "react";

const Disclaimer = () => {
  return (
    <main className="min-h-screen bg-base-200 text-base-content px-4 py-10 pb-28">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Disclaimer</h1>
        <p className="font-medium">Last Updated: April 2026</p>

        <p>
          The information provided on CollabCode (“the Platform”) is for general
          informational and networking purposes only. While we strive to ensure
          accuracy and reliability of the content, CollabCode makes no
          warranties or representations regarding its completeness or
          suitability for any purpose.
        </p>

        <h2 className="text-xl font-semibold">1. No Professional Advice</h2>
        <p>
          CollabCode is a developer networking platform, not a professional
          consulting service. Any collaboration, mentorship, or project
          partnership between users is entirely at their own discretion. We do
          not endorse or guarantee the quality or outcome of such interactions.
        </p>

        <h2 className="text-xl font-semibold">
          2. External Links & Third-Party Content
        </h2>
        <p>
          The Platform may contain links to third-party websites or services.
          These links are provided for convenience only, and CollabCode is not
          responsible for the content, privacy policies, or practices of those
          external platforms.
        </p>

        <h2 className="text-xl font-semibold">3. User Responsibility</h2>
        <p>
          Users are solely responsible for the information they share and the
          connections they make on the Platform. CollabCode is not liable for
          any damages, disputes, or losses arising from user interactions or
          collaborations.
        </p>

        <h2 className="text-xl font-semibold">4. Limitation of Liability</h2>
        <p>
          Under no circumstances shall CollabCode or its team members be held
          responsible for any indirect, incidental, or consequential damages
          resulting from the use of the Platform.
        </p>

        <h2 className="text-xl font-semibold">5. Contact Us</h2>
        <p>
          For any concerns or questions regarding this disclaimer, please
          contact us at support@collabcode.in
        </p>

        <p>© 2026 CollabCode. All Rights Reserved.</p>
      </div>
    </main>
  );
};

export default Disclaimer;
