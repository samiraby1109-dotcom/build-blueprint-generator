'use client';

import { impossibleSectionContent } from '@/data/copy';

interface ImpossibleSectionProps {
  userChallenge?: string;
  aiResponse?: string;
  isLoading?: boolean;
}

function ResponseShimmer() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-white/10 rounded w-full" />
      <div className="h-4 bg-white/10 rounded w-full" />
      <div className="h-4 bg-white/10 rounded w-5/6" />
      <div className="h-4 bg-white/10 rounded w-full mt-4" />
      <div className="h-4 bg-white/10 rounded w-3/4" />
    </div>
  );
}

export function ImpossibleSection({
  userChallenge,
  aiResponse,
  isLoading,
}: ImpossibleSectionProps) {
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

        {/* AI-personalized response OR default content */}
        {isLoading ? (
          <div className="mb-10">
            <ResponseShimmer />
          </div>
        ) : aiResponse ? (
          <div className="mb-10">
            <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
              {aiResponse.split(/\n\n+/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Fallback: default intro text */}
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              {impossibleSectionContent.intro}
            </p>
          </>
        )}

        {/* Examples - always show these */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-white mb-4">
            Here are some &quot;impossible&quot; things we&apos;ve already built
            in HighLevel:
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
