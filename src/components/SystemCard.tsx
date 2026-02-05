'use client';

import { useState } from 'react';
import { SystemRecommendation } from '@/types/quiz';
import { cn } from '@/lib/utils';

interface SystemCardProps {
  system: SystemRecommendation;
  index: number;
  aiInsight?: string;
  isLoadingInsight?: boolean;
}

function InsightShimmer() {
  return (
    <div className="space-y-3 animate-pulse" aria-hidden="true">
      <div className="h-4 bg-slate-200 rounded w-full" />
      <div className="h-4 bg-slate-200 rounded w-full" />
      <div className="h-4 bg-slate-200 rounded w-4/5" />
    </div>
  );
}

export function SystemCard({
  system,
  index,
  aiInsight,
  isLoadingInsight,
}: SystemCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const detailsId = `system-details-${system.id}`;

  return (
    <article
      className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden"
      aria-labelledby={`system-name-${system.id}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 text-white font-bold text-base sm:text-lg flex-shrink-0"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <div className="min-w-0">
            <h3
              id={`system-name-${system.id}`}
              className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight"
            >
              {system.name}
            </h3>
            <p className="text-indigo-200 text-sm mt-0.5">
              Saves {system.timeSaved}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 md:p-8">
        {/* AI personalized insight — the main content */}
        {isLoadingInsight ? (
          <div className="mb-5">
            <InsightShimmer />
          </div>
        ) : aiInsight ? (
          <div className="mb-5">
            <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
              {aiInsight.split(/\n\n+/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-slate-600 leading-relaxed mb-5 text-sm sm:text-base">
            {system.description}
          </p>
        )}

        {/* Real example — social proof */}
        <div className="bg-slate-50 rounded-xl p-4 mb-5 border-l-4 border-indigo-500">
          <p className="text-slate-700 italic text-sm sm:text-base">
            &quot;{system.realExample}&quot;
          </p>
        </div>

        {/* Expandable details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
          aria-controls={detailsId}
          className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors duration-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-md px-1 -mx-1"
        >
          <svg
            className={cn(
              'w-4 h-4 transition-transform duration-200',
              showDetails && 'rotate-90'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          {showDetails ? 'Hide' : 'See'} what this replaces & includes
        </button>

        {showDetails && (
          <div
            id={detailsId}
            className="mt-4 pt-4 border-t border-slate-100 space-y-6"
            role="region"
            aria-label={`Details for ${system.name}`}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {/* What it replaces */}
              <div>
                <h4 className="font-semibold mb-3 text-xs uppercase tracking-wide text-red-600">
                  What it replaces
                </h4>
                <ul className="space-y-2" aria-label="What this system replaces">
                  {system.replaces.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-slate-600 text-sm"
                    >
                      <span className="text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true">
                        &times;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What it includes */}
              <div>
                <h4 className="font-semibold mb-3 text-xs uppercase tracking-wide text-green-600">
                  What it includes
                </h4>
                <ul className="space-y-2" aria-label="What this system includes">
                  {system.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-slate-600 text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
