import React from "react";

const Disclaimer = () => {
  return (
    <main className="px-4 py-10 text-[#d8e2ff]">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Disclaimer</h1>
        <p className="font-medium">Last Updated: April 2026</p>

        <p>
          The content and services provided on CollabCode (“the Platform”) are
          intended for general informational and networking purposes only. While
          we aim to keep the information accurate and up to date, we do not
          guarantee its completeness, reliability, or suitability for any
          specific purpose.
        </p>

        <h2 className="text-xl font-semibold">1. No Professional Advice</h2>
        <p>
          CollabCode is designed as a platform for developers to connect and
          collaborate. It does not offer professional consulting services of any
          kind. Any decisions regarding collaborations, mentorships, or project
          partnerships are made at the user’s own discretion. We do not verify,
          endorse, or guarantee the outcomes of such interactions.
        </p>

        <h2 className="text-xl font-semibold">
          2. External Links & Third-Party Content
        </h2>
        <p>
          The Platform may include links to external websites or services for
          user convenience. CollabCode has no control over these third-party
          platforms and is not responsible for their content, policies, or
          practices. Accessing such links is entirely at your own risk.
        </p>

        <h2 className="text-xl font-semibold">3. User Responsibility</h2>
        <p>
          All users are responsible for the information they share and the
          connections they choose to make. CollabCode is not liable for any
          issues, disputes, or damages that may arise from user interactions,
          communications, or collaborations.
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
      </div>
    </main>
  );
};

export default Disclaimer;
