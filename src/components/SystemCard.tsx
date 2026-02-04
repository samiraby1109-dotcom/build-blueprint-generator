'use client';

import { SystemRecommendation } from '@/types/quiz';
import { cn } from '@/lib/utils';

interface SystemCardProps {
  system: SystemRecommendation;
  index: number;
}

export function SystemCard({ system, index }: SystemCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white font-bold text-sm">
            {index + 1}
          </span>
          <h3 className="text-xl font-bold text-white">{system.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <p className="text-slate-600 leading-relaxed">{system.description}</p>

        {/* What it replaces */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            What it replaces:
          </h4>
          <ul className="space-y-2">
            {system.replaces.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-600">
                <span className="text-red-400 mt-1">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What it includes */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
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
            What it includes:
          </h4>
          <ul className="space-y-2">
            {system.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-600">
                <svg
                  className="w-4 h-4 text-green-500 mt-1 flex-shrink-0"
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="text-center p-3 bg-indigo-50 rounded-xl">
            <div className="text-sm text-slate-500 mb-1">Time Saved</div>
            <div className="font-semibold text-indigo-600">{system.timeSaved}</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-xl">
            <div className="text-sm text-slate-500 mb-1">Complexity</div>
            <div className="font-semibold text-purple-600">{system.complexity}</div>
          </div>
          <div className="text-center p-3 bg-emerald-50 rounded-xl">
            <div className="text-sm text-slate-500 mb-1">Investment</div>
            <div className="font-semibold text-emerald-600">{system.priceRange}</div>
          </div>
        </div>

        {/* Real example */}
        <div className="bg-gradient-to-r from-slate-50 to-indigo-50/50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500 mb-1">
                Real example:
              </div>
              <p className="text-slate-700 italic">&quot;{system.realExample}&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
