'use client';

import { impossibleSectionContent } from '@/data/copy';

interface ImpossibleSectionProps {
  userChallenge?: string;
  aiResponse?: string;
  isLoading?: boolean;
}

function ResponseShimmer() {
  return (
    <div className="space-y-3 animate-pulse" aria-hidden="true">
      <div className="h-4 bg-white/10 rounded w-full" />
      <div className="h-4 bg-white/10 rounded w-full" />
      <div className="h-4 bg-white/10 rounded w-5/6" />
    </div>
  );
}

export function ImpossibleSection({
  userChallenge,
  aiResponse,
  isLoading,
}: ImpossibleSectionProps) {
  return (
    <section className="py-10 md:py-14" aria-labelledby="impossible-heading">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white">
        <h2 id="impossible-heading" className="sr-only">The impossible challenge</h2>

        {/* User's challenge */}
        {userChallenge && userChallenge.trim().length > 0 && (
          <div className="mb-8 pb-8 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-slate-300 mb-3">
              You said:
            </h3>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 italic">
              &quot;{userChallenge}&quot;
            </blockquote>
          </div>
        )}

        {/* AI-personalized response OR default content */}
        {isLoading ? (
          <div className="mb-8">
            <ResponseShimmer />
          </div>
        ) : aiResponse ? (
          <div className="mb-8">
            <div className="space-y-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              {aiResponse.split(/\n\n+/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8">
            {impossibleSectionContent.intro}
          </p>
        )}

        {/* Examples - always show these */}
        <div className="mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
            &quot;Impossible&quot; things we&apos;ve already built in HighLevel:
          </h3>
          <ul className="space-y-2.5" aria-label="Examples of complex builds we've completed">
            {impossibleSectionContent.examples.map((example, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="text-slate-300 text-sm sm:text-base">{example}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
            {impossibleSectionContent.cta.headline}
          </h3>
          <p className="text-slate-300 mb-3 text-sm sm:text-base">
            {impossibleSectionContent.cta.description}
          </p>
          <p className="text-slate-400 text-xs sm:text-sm mb-5">
            {impossibleSectionContent.cta.subtext}
          </p>
          <a
            href="#"
            className="inline-block py-3 px-6 sm:px-8 rounded-xl font-semibold bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-200 shadow-lg text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Book a Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
}
