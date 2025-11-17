import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <div className="mb-10">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6 border-b-2 border-gray-300 pb-4">
        Privacy Policy — FluencyWave
      </h1>

      <p className="mb-6 text-gray-600">
        <strong>Last updated:</strong> November 16, 2025
      </p>

      <p className="mb-8 leading-relaxed">
        This Privacy Policy describes how <strong>FluencyWave</strong>{" "}
        (&#34;we,&#34; &#34;our,&#34; or &#34;us&#34;) collects, uses, and
        protects your information when you use our language learning app and
        related services. By using FluencyWave, you agree to this policy.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          1. Information We Collect
        </h2>
        <div className="space-y-3">
          <div>
            <strong className="text-gray-900">Account Information:</strong>
            <span className="text-gray-700">
              {" "}
              When you sign up, we collect your name, email address, and login
              credentials to create and manage your account.
            </span>
          </div>
          <div>
            <strong className="text-gray-900">Learning Data:</strong>
            <span className="text-gray-700">
              {" "}
              Information about your language learning progress, including
              vocabulary lists and language preferences.
            </span>
          </div>
          <div>
            <strong className="text-gray-900">Uploaded Content:</strong>
            <span className="text-gray-700">
              text content you upload or create using our app for language
              practice.
            </span>
          </div>
          <div>
            <strong className="text-gray-900">Usage Data:</strong>
            <span className="text-gray-700">
              {" "}
              Analytics about how you use the app, including features accessed,
              session duration, device information, and interaction patterns.
            </span>
          </div>
          <div>
            <strong className="text-gray-900">Communication Data:</strong>
            <span className="text-gray-700">
              {" "}
              Messages you send to our support team or feedback you provide
              about the app.
            </span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          2. How We Use Your Information
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Provide and improve our language learning services and features.
            </li>
            <li>
              Track your learning progress and provide performance insights.
            </li>
            <li>
              Communicate with you about updates, new features, or technical
              issues.
            </li>
            <li>Ensure security and prevent misuse of our platform.</li>
            <li>
              Analyze app usage to improve our educational content and
              methodology.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          3. How We Protect Your Data
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We use industry-standard security measures including encryption,
          secure servers, and access controls to protect your data from
          unauthorized access, alteration, or disclosure. Your learning data and
          uploaded content are stored securely on protected servers. However, no
          online service can be 100% secure, and you use the app at your own
          risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          4. Sharing Your Information
        </h2>
        <p className="text-gray-700 mb-3">
          We do not sell or rent your personal data or learning information. We
          may share information only with:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Service providers who help us operate the app, such as cloud hosting
            providers, analytics services, and payment processors.
          </li>
          <li>
            Legal authorities if required by law or to protect our rights and
            the safety of our users.
          </li>
        </ul>
        <p className="text-gray-700 mt-3">
          Your learning progress and uploaded content remain private and are
          never shared with third parties for marketing purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          5. Your Rights
        </h2>
        <p className="text-gray-700 mb-3">You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Access and review your account data and learning progress.</li>
          <li>Update or correct your personal information at any time.</li>
          <li>Request a copy of your data in a portable format.</li>
          <li>
            You can delete your account and all associated data directly from
            your account settings.
          </li>
          <li>
            Opt out of promotional communications while continuing to use the
            app.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          6. Cookies and Tracking
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We use cookies and similar technologies to enhance functionality,
          remember your preferences, maintain your login session, and analyze
          usage patterns. This helps us improve your learning experience and app
          performance. You can control cookies through your browser settings,
          but disabling them may affect certain features.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          7. Children&#34;s Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          FluencyWave may be used by learners of all ages. If you are under 18,
          please ensure you have parental or guardian consent before using our
          app. We do not knowingly collect personal information from children
          under 13 without parental consent. If you believe a child has provided
          us with personal information without consent, please contact us
          immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          8. Data Retention
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We retain your account data and learning progress for as long as your
          account is active or as needed to provide our services. If you delete
          your account, we will remove your personal information and learning
          data within 30 days, except where retention is required by law.
          Anonymized usage data may be retained for analytical purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          9. International Data Transfers
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Your data may be transferred to and processed in countries other than
          your country of residence. We ensure that appropriate safeguards are
          in place to protect your information in accordance with this Privacy
          Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          10. Changes to This Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Privacy Policy periodically to reflect changes in
          our practices or legal requirements. The latest version will always be
          available in the app and on our website, with the &#34;Last
          updated&#34; date at the top. Continued use of FluencyWave after
          updates means you accept the new terms. For significant changes, we
          will notify you via email or app notification.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          11. Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          For questions, concerns, or requests regarding this Privacy Policy or
          your personal data, please contact us at:{" "}
          <a
            href="mailto:anastrying05@gmail.com"
            className="text-blue-600 hover:underline font-semibold"
          >
            Support
          </a>
        </p>
      </section>

      <div className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
        <p>© 2025 FluencyWave. All rights reserved.</p>
      </div>
    </main>
  );
}
