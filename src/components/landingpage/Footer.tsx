import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-12 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold text-gray-900">FluentsRead</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Master languages through the power of reading. Learn English,
              French, Spanish, German and Chinese naturally.
            </p>
          </div>

          {/* Product Column */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#reviews"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Book Library
                </Link>
              </li>
              <li>
                <Link
                  href="/Content-generator"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  AI Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column - Takes more space */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-gray-900 mb-4">Newsletter</h4>
            <p className="text-gray-600 text-sm mb-4">
              Get language learning tips and updates
            </p>
            <div className="flex px-2.5 py-1 border bg-white border-gray-300 rounded-lg gap-3">
              <input
                type="email"
                placeholder="Your email"
                className=" w-full outline-0 bg-white p-1  text-sm"
              />
              <button className="px-4 cursor-pointer py-2 bg-secondary hover:bg-secondary/80  text-white font-semibold rounded-lg transition-colors text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400 py-6 flex justify-center w-full">
        <p className="text-gray-800 text-sm">
          © {currentYear} FluentRead. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
