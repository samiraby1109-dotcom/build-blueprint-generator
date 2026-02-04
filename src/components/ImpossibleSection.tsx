'use client';

import { impossibleSectionContent } from '@/data/copy';

interface ImpossibleSectionProps {
  userChallenge?: string;
}

export function ImpossibleSection({ userChallenge }: ImpossibleSectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white">
        {/* User's challenge */}
        {userChallenge && userChallenge.trim().length > 0 && (
          <div className="mb-10 pb-10 border-b border-slate-700">
            <h3 className="text-xl font-semibold text-slate-300 mb-4">
              You said:
            </h3>
            <blockquote className="text-2xl md:text-3xl font-bold text-cyan-400 italic">
              &quot;{userChallenge}&quot;
            </blockquote>
          </div>
        )}

        {/* Intro text */}
        <p className="text-lg md:text-xl text-slate-300 mb-8">
          {impossibleSectionContent.intro}
        </p>

        {/* Examples */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-white mb-4">
            Here are some &quot;impossible&quot; things we&apos;ve already built in
            HighLevel:
          </h3>
          <ul className="space-y-3">
            {impossibleSectionContent.examples.map((example, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="text-slate-300">{example}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-white/5 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            {impossibleSectionContent.cta.headline}
          </h3>
          <p className="text-slate-300 mb-4">
            {impossibleSectionContent.cta.description}
          </p>
          <p className="text-slate-400 text-sm mb-6">
            {impossibleSectionContent.cta.subtext}
          </p>
          <a
            href="#"
            className="inline-block py-3 px-8 rounded-xl font-semibold bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-200 shadow-lg"
          >
            Book a Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
}
