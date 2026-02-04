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
    <div className="space-y-3 animate-pulse">
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

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white font-bold text-lg">
            {index + 1}
          </span>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {system.name}
            </h3>
            <div className="flex items-center gap-4 mt-1 text-indigo-200 text-sm">
              <span>{system.timeSaved} saved</span>
              <span>|</span>
              <span>{system.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* AI personalized insight — the main content */}
        {isLoadingInsight ? (
          <div className="mb-6">
            <InsightShimmer />
          </div>
        ) : aiInsight ? (
          <div className="mb-6">
            <div className="space-y-4 text-slate-700 text-base md:text-lg leading-relaxed">
              {aiInsight.split(/\n\n+/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : (
          /* Fallback: show the static description if no AI */
          <p className="text-slate-600 leading-relaxed mb-6">
            {system.description}
          </p>
        )}

        {/* Real example — social proof */}
        <div className="bg-slate-50 rounded-xl p-4 mb-6 border-l-4 border-indigo-500">
          <p className="text-slate-700 italic">
            &quot;{system.realExample}&quot;
          </p>
        </div>

        {/* Expandable details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors duration-200"
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
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-6 animate-in fade-in duration-200">
            {/* Two-column layout on desktop */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* What it replaces */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide text-red-600">
                  What it replaces
                </h4>
                <ul className="space-y-2">
                  {system.replaces.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-slate-600 text-sm"
                    >
                      <span className="text-red-400 mt-0.5 flex-shrink-0">
                        &times;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What it includes */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide text-green-600">
                  What it includes
                </h4>
                <ul className="space-y-2">
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
    </div>
  );
}
