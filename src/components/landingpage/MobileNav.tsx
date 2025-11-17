"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileNavProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export default function MobileNav({ user }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu Icon */}
      <button
        onClick={toggleMenu}
        className="text-black md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-6">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="self-end p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              onClick={toggleMenu}
              className="font-medium text-lg hover:text-primary py-2 border-b border-gray-200"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={toggleMenu}
              className="font-medium text-lg hover:text-primary py-2 border-b border-gray-200"
            >
              Pricing
            </Link>
            <Link
              href="#faqs"
              onClick={toggleMenu}
              className="font-medium text-lg hover:text-primary py-2 border-b border-gray-200"
            >
              FAQs
            </Link>
          </nav>

          {/* Auth Button */}
          <div className="mt-4">
            {user ? (
              <Link
                href="/books"
                onClick={toggleMenu}
                className="block w-full py-3 px-5 rounded-lg bg-primary text-white text-center font-medium hover:opacity-80 transition-opacity"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={toggleMenu}
                className="block w-full py-3 px-5 rounded-lg bg-primary text-white text-center font-medium hover:opacity-80 transition-opacity"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
