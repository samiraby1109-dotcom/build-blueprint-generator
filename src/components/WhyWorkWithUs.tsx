'use client';

import { whyWorkWithUsContent } from '@/data/copy';

export function WhyWorkWithUs() {
  return (
    <section className="py-10 md:py-14" aria-labelledby="why-us-heading">
      <div className="max-w-3xl mx-auto">
        <h2 id="why-us-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-center">
          {whyWorkWithUsContent.headline}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 mb-8 text-center max-w-2xl mx-auto">
          {whyWorkWithUsContent.intro}
        </p>

        <div className="space-y-4">
          {whyWorkWithUsContent.points.map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-3 sm:gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
            >
              <div
                className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-0.5 text-sm sm:text-base">{point.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm">{point.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            {whyWorkWithUsContent.closing}
          </p>
          <a
            href="#"
            className="inline-block py-3 sm:py-4 px-8 sm:px-10 rounded-xl font-semibold text-base sm:text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Book Your Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
}
