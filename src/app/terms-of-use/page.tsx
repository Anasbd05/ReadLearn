import React from "react";
import Link from "next/link";

export default function TermsOfUse() {
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
        Terms of Use — FluentsRead
      </h1>
      <p className="mb-6">
        <strong>Last updated:</strong> November 8, 2025
      </p>

      <p className="mb-6">
        Welcome to <strong>FluentsRead</strong> (“we,” “our,” or “us”). These
        Terms of Use (“Terms”) govern your access to and use of the{" "}
        <strong>FluentsRead</strong> mobile and web application (“App”) and
        related services. By creating an account or using our App, you agree to
        these Terms.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Use of the App</h2>
        <p>
          You may use FluentsRead only in compliance with these Terms and all
          applicable laws. You agree not to:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Use the App for any unlawful or unauthorized purpose.</li>
          <li>
            Upload, share, or generate content that is illegal, harmful, or
            infringes on the rights of others.
          </li>
          <li>Attempt to reverse-engineer, copy, or modify the App.</li>
        </ul>
        <p className="mt-2">
          We reserve the right to suspend or terminate your account if you
          violate these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
        <p>
          To access certain features, you must create an account. You agree to:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Provide accurate, up-to-date information.</li>
          <li>Keep your login credentials secure.</li>
          <li>
            Be responsible for all activities that occur under your account.
          </li>
        </ul>
        <p className="mt-2">
          We may suspend or delete accounts that appear inactive, fraudulent, or
          in violation of these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          3. Paid Plans and Subscriptions
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Prices and payment methods are displayed in the App.</li>
          <li>
            All payments are final and non-refundable unless required by law.
          </li>
          <li>
            If your subscription renews automatically, you may cancel anytime in
            your account settings before the next billing cycle.
          </li>
        </ul>
        <p className="mt-2">
          We may change pricing or introduce new features, and you will be
          notified in advance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          4. Ownership and Content Rights
        </h2>
        <p>
          You retain ownership of the videos and captions you upload or
          generate. By using our App, you grant FluentsRead a limited,
          non-exclusive, royalty-free license to process your content solely for
          the purpose of providing the service.
        </p>
        <p className="mt-2">
          All software, design, and branding of FluentsRead are owned by us and
          protected under intellectual property laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          5. Limitation of Liability
        </h2>
        <p>
          FluentsRead is provided “as is” without warranties of any kind. We do
          not guarantee uninterrupted service or that the App will always be
          error-free. To the fullest extent permitted by law, we are not liable
          for any direct, indirect, or incidental damages arising from your use
          of the App.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Privacy</h2>
        <p>
          We collect and process personal data in accordance with our{" "}
          <strong>Privacy Policy</strong>. By using FluentsRead, you agree to
          the collection and use of information as described in that policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
        <p>
          You may delete your account at any time. We reserve the right to
          terminate or suspend your access if you violate these Terms or misuse
          the App.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          8. Changes to These Terms
        </h2>
        <p>
          We may update these Terms periodically. The latest version will always
          be available in the App or on our website. Continued use of
          FluentsRead after changes means you accept the new Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
        <p>
          These Terms are governed by and interpreted according to the laws of{" "}
          <strong>Morocco</strong>. Any disputes shall be handled by the
          competent courts of Morocco.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">10. Contact</h2>
        <p>
          For questions or support, contact us at:{" "}
          <strong>support@FluentsRead.com</strong>
        </p>
      </section>
    </main>
  );
}
