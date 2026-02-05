'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { isValidEmail } from '@/lib/utils';

interface EmailCaptureProps {
  onSubmit: (data: { firstName: string; email: string; phone?: string }) => void;
  isLoading?: boolean;
}

export function EmailCapture({ onSubmit, isLoading }: EmailCaptureProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { firstName?: string; email?: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      firstName: firstName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Heading */}
      <div className="text-center mb-6 md:mb-8">
        <div
          className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-5"
          aria-hidden="true"
        >
          <svg
            className="w-7 h-7 md:w-8 md:h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          Your Build Blueprint is ready
        </h2>
        <p className="text-base sm:text-lg text-slate-600">
          Enter your info to see the 3 custom systems we&apos;d build for your business
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            First Name <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200',
              'text-slate-700 placeholder-slate-400 text-sm sm:text-base',
              'focus:outline-none focus:ring-0 focus:border-indigo-500',
              errors.firstName
                ? 'border-red-300 bg-red-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            )}
          />
          {errors.firstName && (
            <p id="firstName-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Email <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200',
              'text-slate-700 placeholder-slate-400 text-sm sm:text-base',
              'focus:outline-none focus:ring-0 focus:border-indigo-500',
              errors.email
                ? 'border-red-300 bg-red-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            )}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone (optional) */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Phone <span className="text-slate-400 text-xs">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 123-4567"
            autoComplete="tel"
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200',
              'text-slate-700 placeholder-slate-400 text-sm sm:text-base',
              'focus:outline-none focus:ring-0 focus:border-indigo-500',
              'border-slate-200 bg-white hover:border-slate-300'
            )}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full py-3.5 px-6 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200',
            'bg-gradient-to-r from-indigo-600 to-purple-600',
            'hover:from-indigo-700 hover:to-purple-700',
            'text-white shadow-lg hover:shadow-xl',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
            isLoading && 'opacity-70 cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating Blueprint...
            </span>
          ) : (
            'Show Me My Blueprint'
          )}
        </button>
      </form>

      {/* Privacy note */}
      <p className="mt-5 text-center text-xs sm:text-sm text-slate-500">
        No spam. Just your blueprint and occasional HighLevel tips.
      </p>
    </div>
  );
}
