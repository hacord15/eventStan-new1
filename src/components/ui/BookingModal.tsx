"use client";
import { useState } from "react";
import { Package, Service } from "@/types";

interface Props {
  pkg?: Package;
  service?: Service;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

export default function BookingModal({ pkg, service, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event_date: "",
    event_type: "",
    guest_count: "",
    message: "",
  });

  const title = pkg ? pkg.title : service?.title || "Service";
  const price = pkg ? pkg.price : service?.price_min || 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-orange-500 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">Book: {title}</h2>
          <button onClick={onClose} className="text-white hover:text-orange-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center px-6 py-3 border-b border-gray-100">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                {step > s ? "✓" : s}
              </div>
              <span className={`ml-2 text-xs font-medium ${step >= s ? "text-gray-900" : "text-gray-400"}`}>
                {s === 1 ? "Details" : s === 2 ? "Review" : "Confirm"}
              </span>
              {s < 3 && <div className={`w-12 h-0.5 mx-3 ${step > s ? "bg-orange-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Event Date</label>
                  <input type="date" name="event_date" value={form.event_date} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Guest Count</label>
                  <input type="number" name="guest_count" value={form.guest_count} onChange={handleChange} placeholder="50" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Event Type</label>
                <select name="event_type" value={form.event_type} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400">
                  <option value="">Select type</option>
                  {["Wedding", "Birthday", "Corporate", "Anniversary", "Baby Shower", "Graduation", "Proposal", "Other"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Message (Optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any special requirements..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none" />
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                Review Order →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium">{title}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Date</span><span>{form.event_date}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Guests</span><span>{form.guest_count}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Event Type</span><span>{form.event_type}</span></div>
                  <div className="border-t border-orange-200 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-orange-500">${price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              {pkg && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Inclusions:</h4>
                  <ul className="space-y-1">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50">
                  ← Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600">
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-500 text-sm mb-2">Your booking request for <strong>{title}</strong> has been submitted.</p>
              <p className="text-gray-400 text-xs mb-6">We&apos;ll send a confirmation to <strong>{form.email}</strong> within 24 hours.</p>
              <div className="bg-gray-50 rounded-xl p-4 text-left text-sm mb-6">
                <div className="flex justify-between mb-1"><span className="text-gray-500">Booking ID</span><span className="font-mono font-medium">ES-{Math.random().toString(36).substr(2,8).toUpperCase()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Total</span><span className="text-orange-500 font-bold">${price.toLocaleString()}</span></div>
              </div>
              <button onClick={onClose} className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
