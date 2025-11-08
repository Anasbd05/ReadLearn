import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <div className="mb-10">
        <Link
          href="/"
          className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:opacity-80  transition"
        >
          ← Back to Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">
        Privacy Policy — FluentsRead
      </h1>
      <p className="mb-6">
        <strong>Last updated:</strong> November 8, 2025
      </p>

      <p className="mb-6">
        This Privacy Policy describes how <strong>FluentsRead</strong> (“we,”
        “our,” or “us”) collects, uses, and protects your information when you
        use our app and related services. By using FluentsRead, you agree to
        this policy.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Account Information:</strong> When you sign up, we may
            collect your name, email, and login credentials.
          </li>
          <li>
            <strong>Uploaded Content:</strong> Videos and captions you upload or
            create using our app.
          </li>
          <li>
            <strong>Usage Data:</strong> Analytics about how you use the app
            (features used, session duration, etc.).
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To provide and improve our services.</li>
          <li>To personalize your user experience.</li>
          <li>To communicate with you about updates or technical issues.</li>
          <li>To ensure security and prevent misuse of our platform.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          3. How We Protect Your Data
        </h2>
        <p>
          We use industry-standard security measures to protect your data from
          unauthorized access, alteration, or disclosure. However, no online
          service can be 100% secure, and you use the app at your own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          4. Sharing Your Information
        </h2>
        <p>
          We do not sell or rent your data. We may share information only with:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Service providers who help us operate the app (e.g., hosting,
            analytics).
          </li>
          <li>Authorities if required by law or to protect our rights.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access and update your account data.</li>
          <li>Request deletion of your data by contacting support.</li>
          <li>
            Withdraw consent for data processing (which may limit app
            functionality).
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Cookies and Tracking</h2>
        <p>
          We may use cookies or similar technologies to enhance functionality
          and analyze usage. You can control cookies through your browser
          settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Data Retention</h2>
        <p>
          We retain user data only as long as necessary to provide our services
          or as required by law. When no longer needed, data is securely
          deleted.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically. The latest version
          will always be available in the app or on our website. Continued use
          of FluentsRead after updates means you accept the new terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          For questions or concerns about this Privacy Policy, please contact:{" "}
          <strong>support@FluentsRead.com</strong>
        </p>
      </section>
    </main>
  );
}
