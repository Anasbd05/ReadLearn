import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-12 lg:col-span-4">
            <Link
              href={"/"}
              className="inline-flex items-center gap-2 mb-4 group"
            >
              <Image
                alt="fluencywave logo"
                width={32}
                height={32}
                className="w-8 h-8"
                src={"/logo.png"}
              />
              <span className="font-bold text-xl text-gray-900 group-hover:text-secondary transition-colors">
                FluencyWave
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Master languages through the power of reading. Learn English,
              French, Spanish, German and Chinese naturally with our innovative
              platform.
            </p>
          </div>

          {/* Product Column */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#reviews"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Book Library
                </Link>
              </li>
              <li>
                <Link
                  href="/daily-articles"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Languages Column */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">
              Languages
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/learn-english"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Learn english
                </Link>
              </li>
              <li>
                <Link
                  href="/learn-french"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Learn french
                </Link>
              </li>
              <li>
                <Link
                  href="/learn-spanish"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Learn spanish
                </Link>
              </li>
              <li>
                <Link
                  href="/learn-german"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Learn german
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="mailto:anastrying05@gmail.com"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t px-6 py-6 border-gray-200">
        <p className="text-gray-600 text-sm text-center">
          © {currentYear} FluencyWave. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
