'use client';

import { QuizResult } from '@/types/quiz';
import { systems } from '@/data/systems';
import { generatePersonalizedIntro, businessModelLabels } from '@/data/copy';
import { SystemCard } from './SystemCard';
import { ImpossibleSection } from './ImpossibleSection';
import { CTASection } from './CTASection';
import { WhyWorkWithUs } from './WhyWorkWithUs';
import { getResultsUrl } from '@/lib/utils';

interface ResultsPageProps {
  result: QuizResult;
}

export function ResultsPage({ result }: ResultsPageProps) {
  const { responses, userInfo, recommendedSystems } = result;

  // Get the actual system objects
  const systemObjects = recommendedSystems
    .map((id) => systems.find((s) => s.id === id))
    .filter((s) => s !== undefined);

  // Generate personalized intro
  const personalizedIntro = generatePersonalizedIntro(responses);

  // Get business type label
  const businessType = responses.businessModel
    ? businessModelLabels[responses.businessModel]
    : 'business owner';

  // Get shareable URL
  const shareUrl = getResultsUrl(result.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-indigo-200 mb-3">Your custom build blueprint</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Hey {userInfo.firstName}, here&apos;s what we&apos;d build for you
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">
              {personalizedIntro}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Systems Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              The 3 Systems We&apos;d Build For Your {businessType.charAt(0).toUpperCase() + businessType.slice(1)} Business
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Based on your answers, these are the automation systems that would
              have the biggest impact on your business.
            </p>
          </div>

          <div className="space-y-8">
            {systemObjects.map((system, index) => (
              <SystemCard key={system.id} system={system} index={index} />
            ))}
          </div>
        </section>

        {/* Impossible Section */}
        <ImpossibleSection userChallenge={responses.impossibleChallenge} />

        {/* CTA Section */}
        <CTASection responses={responses} />

        {/* Why Work With Us */}
        <WhyWorkWithUs />

        {/* Share Section */}
        <section className="py-12 border-t border-slate-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">
              Save or share your blueprint
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full sm:w-auto sm:min-w-[400px] px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                }}
                className="px-6 py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors duration-200"
              >
                Copy Link
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} The Funnel Flippers. All rights
            reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Kylee + Sami | HighLevel Build Experts
          </p>
        </div>
      </footer>
    </div>
  );
}
