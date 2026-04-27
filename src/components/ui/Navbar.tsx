"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCart, count } = useCart();

  const links = [
    { href: "/services", label: "Services" },
    { href: "/event-types", label: "Event Types" },
    { href: "/about", label: "About Us" },
    { href: "/packages", label: "Packages" },
    { href: "/bookings", label: "My Bookings" },
  ];



  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - responsive sizing */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">EventStan</span>
          </Link>

          {/* Desktop Links - visible from md (768px) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === link.href ? "text-orange-500" : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button - improved touch target */}
            <button
               onClick={toggleCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all"
              aria-label="Open shopping cart"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            {/* Vendor Portal - desktop, hidden on mobile */}
            <Link  
              href="https://event-stan-vendor.vercel.app/vendor/dashboard"
              className="hidden sm:block border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-gray-400 transition-colors whitespace-nowrap"
            >
              Vendor Portal
            </Link>

            {/* Mobile hamburger button - visible below md */}
            <button
              className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu with overlay and animation */}
        {menuOpen && (
          <>
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg z-50 py-2 px-4 animate-slideDown">
              <div className="flex flex-col space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 my-1"></div>
                <Link
                  href="https://event-stan-vendor.vercel.app/vendor/dashboard"
                  className="block px-4 py-3 text-base font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Vendor Portal
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add custom keyframe animation for mobile menu */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}