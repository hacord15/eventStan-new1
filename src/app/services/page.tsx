"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES, CATEGORY_FILTERS } from "@/lib/data";
import ServiceCard from "@/components/ui/ServiceCard";
import { Service } from "@/types";

const CATEGORIES = ["All", "Venue", "Decor", "Catering", "Entertainment"];

function ServicesContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    const search = searchParams.get("search");
    if (cat && CATEGORIES.includes(cat)) setSelectedCategory(cat);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const toggleFilter = (f: string) => {
    setSelectedFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const filtered = SERVICES.filter((s: Service) => {
    if (selectedCategory !== "All" && s.category !== selectedCategory) return false;
    if (s.price_min > priceRange[1]) return false;
    if (selectedFilters.length > 0 && !selectedFilters.some((f) => s.tags.includes(f))) return false;
    if (searchQuery && !s.title.toLowerCase().includes(searchQuery.toLowerCase()) && !s.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.price_min - b.price_min;
    if (sortBy === "price_desc") return b.price_min - a.price_min;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const currentFilters = selectedCategory !== "All" ? CATEGORY_FILTERS[selectedCategory] || [] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Services</h1>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setSelectedFilters([]); }}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedCategory === cat
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "block" : "hidden"} lg:block w-60 flex-shrink-0`}>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-6 sticky top-24">
            {currentFilters.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Filter by Type</h3>
                <div className="space-y-2">
                  {currentFilters.map((f) => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(f)}
                        onChange={() => toggleFilter(f)}
                        className="accent-orange-500"
                      />
                      <span className="text-sm text-gray-600">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">
                Max Price: <span className="text-orange-500">${priceRange[1].toLocaleString()}</span>
              </h3>
              <input
                type="range"
                min={0}
                max={15000}
                step={500}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0</span><span>$15,000</span>
              </div>
            </div>

            {(selectedFilters.length > 0 || sortBy !== "featured" || priceRange[1] < 15000) && (
              <button
                onClick={() => { setSelectedFilters([]); setSortBy("featured"); setPriceRange([0, 15000]); }}
                className="w-full text-sm text-orange-500 font-medium hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </aside>

        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-orange-500 text-white rounded-full p-3 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
          </button>
        </div>

        {/* Results */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-4">{filtered.length} services found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>No services match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
