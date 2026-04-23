"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SERVICES, REVIEWS } from "@/lib/data";
import ServiceCard from "@/components/ui/ServiceCard";

const CATEGORY_DATA = [
  { name: "Venue", desc: "Halls, gardens, resorts & unique spaces", icon: "🏛️", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80" },
  { name: "Decor", desc: "Themes, florals, lighting & staging", icon: "🌸", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80" },
  { name: "Catering", desc: "Cuisines, buffets, desserts & bars", icon: "🍽️", img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80" },
  { name: "Entertainment", desc: "DJs, bands, performers & MCs", icon: "🎵", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80" },
];

const WORKS = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80",
  "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&q=80",
  "https://images.unsplash.com/photo-1561638763-7c9eee01d0d5?w=400&q=80",
];

const PARTNERS = ["Hilton Hotels", "Marriott", "Four Seasons", "Hyatt", "IHG", "Ritz Carlton", "Wyndham", "Starwood", "Loews", "Omni", "InterContinental", "Fairmont"];

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/services?search=${encodeURIComponent(search)}`);
    else router.push("/services");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-40 right-40 w-40 h-40 bg-orange-100 rounded-full blur-2xl opacity-50" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white border border-orange-100 rounded-full px-4 py-2 text-sm text-orange-600 font-medium mb-6 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Your event, perfectly planned
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-4">
            Find the Perfect{" "}
            <span className="text-orange-500 relative">
              Vendors
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M0 6 Q100 0 200 6" stroke="#f97316" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </svg>
            </span>{" "}
            for Your Event
          </h1>

          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Discover and book top-rated venues, decorators, caterers, and entertainers — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/services" className="bg-orange-500 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
              Explore Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/vendor-dashboard" className="border-2 border-gray-900 text-gray-900 px-8 py-3.5 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors">
              List Your Service
            </Link>
          </div>

          <form onSubmit={handleSearch} className="flex max-w-md mx-auto gap-2">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vendors..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-orange-400 bg-white"
              />
            </div>
            <button type="submit" className="bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors">
              Search
            </button>
          </form>

          <div className="flex items-center justify-center gap-6 mt-8">
            {[["500+", "Vendors"], ["1,200+", "Events"], ["4.9★", "Rating"]].map(([num, label]) => (
              <div key={label} className="bg-white rounded-full px-5 py-2 shadow-sm border border-gray-100 text-sm">
                <span className="text-orange-500 font-bold">{num}</span>
                <span className="text-gray-500 ml-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORY_DATA.map((cat) => (
            <Link key={cat.name} href={`/services?category=${cat.name}`}>
              <div className="relative rounded-2xl overflow-hidden h-44 group cursor-pointer">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-lg font-bold">{cat.name}</div>
                  <div className="text-xs text-white/80">{cat.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Services</h2>
            <p className="text-gray-500 mt-1">Hand-picked vendors for your next event</p>
          </div>
          <Link href="/services" className="text-orange-500 font-medium hover:text-orange-600 flex items-center gap-1">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
          <p className="text-gray-500 mb-10">Three simple steps to your dream event</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-orange-100" />
            {[
              { icon: "🔍", title: "Browse Services", desc: "Explore our curated collection of premium event vendors across four categories." },
              { icon: "📋", title: "Request Booking", desc: "Send your event details to the vendor and get a personalized quote instantly." },
              { icon: "🎉", title: "Confirm & Celebrate", desc: "Lock in your vendor, plan your event, and create unforgettable memories." },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Works */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Previous Works</h2>
          <p className="text-gray-500 mt-1">A glimpse into the magical events we&apos;ve helped create</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {WORKS.map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer">
              <img src={img} alt={`Work ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-500 mt-1">Real stories from real celebrations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-orange-400 text-2xl mb-3">&ldquo;&rdquo;</div>
                <p className="text-gray-600 text-sm mb-4">{review.comment}</p>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <img src={review.reviewer_avatar} alt={review.reviewer_name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{review.reviewer_name}</div>
                    <div className="text-xs text-gray-400">{review.event_type} — {review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Trusted By</p>
          <h2 className="text-2xl font-bold text-gray-900">Our Clients & Vendor Partners</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {PARTNERS.map((name) => (
            <div key={name} className="border border-gray-100 rounded-xl py-3 px-4 text-center text-sm text-gray-500 font-medium hover:border-orange-200 hover:text-orange-500 transition-colors cursor-pointer">
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="bg-orange-500 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Make Your Event Unforgettable?</h2>
          <p className="text-orange-100 mb-6">Join hundreds of happy clients who found their perfect event vendors through EventStan.</p>
          <Link href="/services" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition-colors">
            Get Started Now →
          </Link>
        </div>
      </section>
    </div>
  );
}
