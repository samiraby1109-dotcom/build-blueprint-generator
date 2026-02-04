'use client';

import { cn } from '@/lib/utils';

interface RadioQuestionProps {
  title: string;
  options: { label: string; value: string }[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  afterMessage?: string;
  showAfterMessage?: boolean;
}

export function RadioQuestion({
  title,
  options,
  selectedValue,
  onSelect,
  afterMessage,
  showAfterMessage,
}: RadioQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center">
        {title}
      </h2>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={cn(
                'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
                'hover:border-indigo-400 hover:bg-indigo-50/50',
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-slate-200 bg-white'
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all duration-200',
                    'flex items-center justify-center',
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-slate-300'
                  )}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={cn(
                    'text-base md:text-lg transition-colors duration-200',
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

      {/* After message */}
      {showAfterMessage && afterMessage && (
        <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            {afterMessage}
          </p>
        </div>
      )}
    </div>
  );
}
