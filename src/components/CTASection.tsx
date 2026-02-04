'use client';

import { QuizResponses } from '@/types/quiz';
import { ctaOptions, getCTAOrder } from '@/data/copy';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  responses: QuizResponses;
}

interface CTACardProps {
  option: typeof ctaOptions.customBuild | typeof ctaOptions.whiteLabel | typeof ctaOptions.snapshotDevelopment;
  isPrimary?: boolean;
}

function CTACard({ option, isPrimary }: CTACardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        isPrimary
          ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl'
          : 'bg-white border border-slate-200 shadow-lg'
      )}
    >
      <div className="p-6 md:p-8">
        <h3
          className={cn(
            'text-xl md:text-2xl font-bold mb-2',
            isPrimary ? 'text-white' : 'text-slate-800'
          )}
        >
          {option.title}
        </h3>
        <p
          className={cn(
            'text-sm mb-6',
            isPrimary ? 'text-indigo-100' : 'text-slate-500'
          )}
        >
          <span className="font-medium">Best for:</span> {option.bestFor}
        </p>

        {/* Benefits */}
        <div className="mb-6">
          <h4
            className={cn(
              'font-semibold mb-3',
              isPrimary ? 'text-white' : 'text-slate-700'
            )}
          >
            What you get:
          </h4>
          <ul className="space-y-2">
            {option.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg
                  className={cn(
                    'w-5 h-5 mt-0.5 flex-shrink-0',
                    isPrimary ? 'text-indigo-200' : 'text-indigo-500'
                  )}
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
                <span
                  className={cn(
                    'text-sm',
                    isPrimary ? 'text-indigo-50' : 'text-slate-600'
                  )}
                >
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline & Investment */}
        <div
          className={cn(
            'rounded-xl p-4 mb-6',
            isPrimary ? 'bg-white/10' : 'bg-slate-50'
          )}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div
                className={cn(
                  'text-xs uppercase tracking-wide mb-1',
                  isPrimary ? 'text-indigo-200' : 'text-slate-400'
                )}
              >
                Timeline
              </div>
              <div
                className={cn(
                  'font-semibold text-sm',
                  isPrimary ? 'text-white' : 'text-slate-700'
                )}
              >
                {option.timeline}
              </div>
            </div>
            <div>
              <div
                className={cn(
                  'text-xs uppercase tracking-wide mb-1',
                  isPrimary ? 'text-indigo-200' : 'text-slate-400'
                )}
              >
                Investment
              </div>
              <div
                className={cn(
                  'font-semibold text-sm',
                  isPrimary ? 'text-white' : 'text-slate-700'
                )}
              >
                {option.investment}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={option.buttonLink}
          className={cn(
            'block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200',
            isPrimary
              ? 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md'
          )}
        >
          {option.buttonText}
        </a>
      </div>
    </div>
  );
}

function HackingHighLevelCard({ showExploring }: { showExploring?: boolean }) {
  const option = ctaOptions.hackingHighLevel;

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-xl md:text-2xl font-bold mb-2">{option.title}</h3>
        <p className="text-cyan-400 font-semibold text-lg mb-4">
          {option.subtitle}
        </p>

        {showExploring && (
          <p className="text-slate-300 mb-4">
            Not ready to commit to a custom build? Start here and learn the ropes
            first.
          </p>
        )}

        <ul className="space-y-2 mb-6 text-left max-w-md mx-auto">
          {option.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0"
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
              <span className="text-slate-300 text-sm">{benefit}</span>
            </li>
          ))}
        </ul>

        <a
          href={option.buttonLink}
          className="inline-block py-3 px-8 rounded-xl font-semibold bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-200 shadow-lg"
        >
          {option.buttonText}
        </a>
      </div>
    </div>
  );
}

export function CTASection({ responses }: CTASectionProps) {
  const ctaOrder = getCTAOrder(responses);

  // Map CTA keys to their options
  const getOption = (key: keyof typeof ctaOptions) => {
    switch (key) {
      case 'customBuild':
        return ctaOptions.customBuild;
      case 'whiteLabel':
        return ctaOptions.whiteLabel;
      case 'snapshotDevelopment':
        return ctaOptions.snapshotDevelopment;
      default:
        return null;
    }
  };

  const primaryOption = getOption(ctaOrder.primary);
  const secondaryOption = ctaOrder.secondary
    ? getOption(ctaOrder.secondary)
    : null;
  const tertiaryOption = ctaOrder.tertiary ? getOption(ctaOrder.tertiary) : null;

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Your Next Steps
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Based on your answers, here are the best paths forward
        </p>
      </div>

      <div className="space-y-6">
        {/* Primary CTA */}
        {ctaOrder.primary === 'hackingHighLevel' ? (
          <HackingHighLevelCard showExploring={ctaOrder.showExploring} />
        ) : (
          primaryOption && <CTACard option={primaryOption} isPrimary />
        )}

        {/* Secondary & Tertiary CTAs */}
        {(secondaryOption || tertiaryOption) && (
          <div
            className={cn(
              'grid gap-6',
              secondaryOption && tertiaryOption
                ? 'md:grid-cols-2'
                : 'md:grid-cols-1 max-w-xl mx-auto'
            )}
          >
            {secondaryOption && <CTACard option={secondaryOption} />}
            {tertiaryOption && <CTACard option={tertiaryOption} />}
          </div>
        )}

        {/* "When you're ready" frame for exploring */}
        {ctaOrder.showExploring && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-700 text-center mb-6">
              When you&apos;re ready to build, here are your options:
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <CTACard option={ctaOptions.customBuild} />
              <CTACard option={ctaOptions.whiteLabel} />
              <CTACard option={ctaOptions.snapshotDevelopment} />
            </div>
          </div>
        )}

        {/* Always show Hacking HighLevel if not primary */}
        {ctaOrder.primary !== 'hackingHighLevel' && (
          <div className="mt-8">
            <HackingHighLevelCard />
          </div>
        )}
      </div>
    </section>
  );
}
