"use client";
import { useState } from "react";
import { Package, Service } from "@/types";
import { useCart } from "@/lib/CartContext";

interface Props {
  pkg: Package;
  service?: Service;
  onBook?: (pkg: Package) => void;
}

export default function PackageCard({ pkg, service, onBook }: Props) {
  const { addPackage, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((i) => i.id === `pkg-${pkg.id}`);

  const handleAddToCart = () => {
    addPackage(pkg, service);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className={`relative bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-lg ${pkg.is_popular ? "border-orange-500" : "border-gray-100"}`}>
      {pkg.is_popular && (
        <span className="absolute -top-3 left-6 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-orange-500">${pkg.price.toLocaleString()}</span>
        <span className="text-sm text-gray-400">flat</span>
      </div>

      <div className="flex gap-4 mb-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Up to {pkg.max_guests} guests
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {pkg.duration_hours}h
        </span>
      </div>

      <ul className="space-y-2 mb-6">
        {pkg.inclusions.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={inCart}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
            inCart
              ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
              : justAdded
              ? "bg-orange-100 text-orange-600 border border-orange-200"
              : "bg-white text-gray-700 border border-gray-200 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50"
          }`}
        >
          {inCart ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added to Cart
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {justAdded ? "Added!" : "Add to Cart"}
            </>
          )}
        </button>

        {/* Book Now */}
        {onBook && (
          <button
            onClick={() => onBook(pkg)}
            className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              pkg.is_popular
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
}
