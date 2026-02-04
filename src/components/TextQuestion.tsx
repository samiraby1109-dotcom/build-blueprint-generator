'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TextQuestionProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  characterLimit?: number;
  afterMessage?: string;
  showAfterMessage?: boolean;
}

export function TextQuestion({
  title,
  value,
  onChange,
  placeholder,
  characterLimit = 300,
  afterMessage,
  showAfterMessage,
}: TextQuestionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const remainingChars = characterLimit - value.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 text-center">
        {title}
      </h2>
      <p className="text-slate-500 text-center mb-8">
        This is optional, but helps us understand your unique needs
      </p>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue.length <= characterLimit) {
              onChange(newValue);
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={5}
          className={cn(
            'w-full p-4 rounded-xl border-2 transition-all duration-200 resize-none',
            'text-slate-700 placeholder-slate-400',
            'focus:outline-none focus:ring-0',
            isFocused
              ? 'border-indigo-500 bg-white shadow-md'
              : 'border-slate-200 bg-white hover:border-slate-300'
          )}
        />

        {/* Character counter */}
        <div className="absolute bottom-3 right-3 text-sm">
          <span
            className={cn(
              'font-medium',
              remainingChars < 50 ? 'text-amber-500' : 'text-slate-400'
            )}
          >
            {remainingChars}
          </span>
          <span className="text-slate-400"> characters left</span>
        </div>
      </div>

      {/* After message */}
      {showAfterMessage && afterMessage && value.length > 0 && (
        <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            {afterMessage}
          </p>
        </div>
      )}
    </div>
  );
}
