'use client';

import { whyWorkWithUsContent } from '@/data/copy';

export function WhyWorkWithUs() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 text-center">
          {whyWorkWithUsContent.headline}
        </h2>

        <p className="text-lg text-slate-600 mb-10 text-center">
          {whyWorkWithUsContent.intro}
        </p>

        <div className="space-y-6">
          {whyWorkWithUsContent.points.map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
                <h3 className="font-bold text-slate-800 mb-1">{point.title}</h3>
                <p className="text-slate-600">{point.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8">
            {whyWorkWithUsContent.closing}
          </p>
          <a
            href="#"
            className="inline-block py-4 px-10 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            Book Your Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
}
