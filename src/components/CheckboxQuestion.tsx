'use client';

import { cn } from '@/lib/utils';

interface CheckboxQuestionProps {
  title: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  afterMessage?: string;
  showAfterMessage?: boolean;
}

export function CheckboxQuestion({
  title,
  options,
  selectedValues,
  onToggle,
  afterMessage,
  showAfterMessage,
}: CheckboxQuestionProps) {
  return (
    <fieldset className="w-full max-w-2xl mx-auto">
      <legend className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2 text-center w-full">
        {title}
      </legend>
      <p className="text-slate-500 text-center mb-6 md:mb-8 text-sm">Select all that apply</p>

      <div className="space-y-3" role="group" aria-label={title}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);

          return (
            <button
              key={option.value}
              onClick={() => onToggle(option.value)}
              role="checkbox"
              aria-checked={isSelected}
              className={cn(
                'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
                'hover:border-indigo-400 hover:bg-indigo-50/50',
                'focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-slate-200 bg-white'
              )}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className={cn(
                    'w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 transition-all duration-200',
                    'flex items-center justify-center',
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-slate-300'
                  )}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={cn(
                    'text-sm sm:text-base md:text-lg transition-colors duration-200',
                    isSelected ? 'text-slate-800 font-medium' : 'text-slate-600'
                  )}
                >
                  {option.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected count badge */}
      {selectedValues.length > 0 && (
        <div className="mt-4 text-center">
          <span
            className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
            aria-live="polite"
          >
            {selectedValues.length} selected
          </span>
        </div>
      )}

      {/* After message */}
      {showAfterMessage && afterMessage && (
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100" role="status">
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            {afterMessage}
          </p>
        </div>
      )}
    </fieldset>
  );
}
