'use client';

import { useEffect, useState, useCallback } from 'react';
import { QuizResult, AIBlueprintContent } from '@/types/quiz';
import { systems } from '@/data/systems';
import { generatePersonalizedIntro, businessModelLabels } from '@/data/copy';
import { SystemCard } from './SystemCard';
import { ImpossibleSection } from './ImpossibleSection';
import { CTASection } from './CTASection';
import { WhyWorkWithUs } from './WhyWorkWithUs';
import { getResultsUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ResultsPageProps {
  result: QuizResult;
}

function getAICacheKey(resultId: string): string {
  return `blueprint-ai-${resultId}`;
}

const loadingMessages = [
  'Reading your answers...',
  'Mapping out your systems...',
  'Writing your personalized blueprint...',
  'Almost there...',
];

function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) =>
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Generating your blueprint"
    >
      <div className="text-center px-6 max-w-md">
        {/* Animated spinner */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Building your blueprint
        </h2>

        <p className="text-lg text-indigo-300 mb-6 transition-opacity duration-500">
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2" aria-hidden="true">
          {loadingMessages.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                i <= messageIndex ? 'bg-indigo-400 scale-100' : 'bg-slate-600 scale-75'
              )}
            />
          ))}
        </div>

        <p className="text-sm text-slate-400 mt-8">
          This takes a moment — we&apos;re writing this just for you.
        </p>
      </div>
    </div>
  );
}

function HeroShimmer() {
  return (
    <div className="space-y-4 animate-pulse" aria-hidden="true">
      <div className="h-5 bg-white/15 rounded w-full" />
      <div className="h-5 bg-white/15 rounded w-full" />
      <div className="h-5 bg-white/15 rounded w-3/4" />
    </div>
  );
}

export function ResultsPage({ result }: ResultsPageProps) {
  const { responses, userInfo, recommendedSystems } = result;
  const [aiContent, setAiContent] = useState<AIBlueprintContent | null>(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiError, setAiError] = useState(false);
  const [copied, setCopied] = useState(false);

  const systemObjects = recommendedSystems
    .map((id) => systems.find((s) => s.id === id))
    .filter((s) => s !== undefined);

  const fallbackIntro = generatePersonalizedIntro(responses);

  const businessType = responses.businessModel
    ? businessModelLabels[responses.businessModel]
    : 'business owner';

  const shareUrl = getResultsUrl(result.id);

  const fetchAIContent = useCallback(async () => {
    const cacheKey = getAICacheKey(result.id);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        setAiContent(JSON.parse(cached));
        setAiLoading(false);
        return;
      } catch {
        // Cache corrupted, regenerate
      }
    }

    setAiLoading(true);
    setAiError(false);

    try {
      const response = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: userInfo.firstName,
          businessModel: responses.businessModel,
          painPoints: responses.painPoints,
          dreamState: responses.dreamState,
          impossibleChallenge: responses.impossibleChallenge,
          platformCount: responses.platformCount,
          buildingFor: responses.buildingFor,
          experienceType: responses.experienceType,
          investmentLevel: responses.investmentLevel,
          recommendedSystems: recommendedSystems,
        }),
      });

      if (!response.ok) throw new Error('AI generation failed');

      const data = await response.json();

      if (data.success && data.content) {
        setAiContent(data.content);
        localStorage.setItem(cacheKey, JSON.stringify(data.content));
      } else {
        throw new Error('Invalid AI response');
      }
    } catch (err) {
      console.error('AI generation error:', err);
      setAiError(true);
    } finally {
      setAiLoading(false);
    }
  }, [result.id, userInfo.firstName, responses, recommendedSystems]);

  useEffect(() => {
    fetchAIContent();
  }, [fetchAIContent]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderParagraphs = (text: string, className?: string) => {
    return text.split(/\n\n+/).map((paragraph, i) => (
      <p key={i} className={cn('leading-relaxed', className)}>
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      {/* Loading overlay — shown while AI generates */}
      {aiLoading && <LoadingOverlay />}

      {/* Hero */}
      <header className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            {/* From line */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold"
                aria-hidden="true"
              >
                TFF
              </div>
              <div>
                <p className="text-sm text-indigo-200">
                  From Kylee + Sami at The Funnel Flippers
                </p>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {userInfo.firstName}, we read every answer.{' '}
              <span className="text-cyan-400">
                Here&apos;s what we&apos;d build.
              </span>
            </h1>

            {/* AI intro or fallback */}
            <div className="text-base md:text-lg max-w-2xl">
              {aiLoading ? (
                <HeroShimmer />
              ) : aiContent?.personalizedIntro ? (
                <div className="space-y-3 text-indigo-100">
                  {renderParagraphs(
                    aiContent.personalizedIntro,
                    'text-indigo-100'
                  )}
                </div>
              ) : (
                <p className="text-indigo-100 leading-relaxed">
                  {fallbackIntro}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Credibility strip */}
        <div className="border-t border-white/10 bg-white/5">
          <div className="container mx-auto px-4 py-3">
            <div
              className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-indigo-200"
              role="list"
              aria-label="Our credentials"
            >
              <span role="listitem">Hundreds of HighLevel builds</span>
              <span className="hidden sm:inline" aria-hidden="true">|</span>
              <span role="listitem">Coaches, agencies, course creators</span>
              <span className="hidden sm:inline" aria-hidden="true">|</span>
              <span role="listitem">We build what others say is impossible</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 md:py-14" id="main-content">
        {/* Systems Section */}
        <section className="mb-12" aria-labelledby="systems-heading">
          <div className="max-w-3xl mx-auto mb-8">
            <h2 id="systems-heading" className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              What we&apos;d build for your {businessType} business
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Picked based on your pain points, goals, and where you&apos;re headed.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {systemObjects.map((system, index) => (
              <SystemCard
                key={system.id}
                system={system}
                index={index}
                aiInsight={aiContent?.systemInsights?.[index]}
                isLoadingInsight={aiLoading}
              />
            ))}
          </div>
        </section>

        {/* Impossible Section */}
        <div className="max-w-3xl mx-auto">
          <ImpossibleSection
            userChallenge={responses.impossibleChallenge}
            aiResponse={aiContent?.impossibleResponse}
            isLoading={aiLoading}
          />
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <CTASection responses={responses} />
        </div>

        {/* AI Closing Message */}
        {!aiLoading && aiContent?.closingMessage && (
          <section className="py-10 md:py-14" aria-labelledby="closing-heading">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-10">
              <h2 id="closing-heading" className="sr-only">Personal note</h2>
              <div className="space-y-3 text-slate-700 text-base leading-relaxed">
                {renderParagraphs(aiContent.closingMessage)}
              </div>
            </div>
          </section>
        )}

        {/* Why Work With Us */}
        <WhyWorkWithUs />

        {/* Share Section */}
        <section className="py-10 border-t border-slate-200" aria-labelledby="share-heading">
          <div className="text-center">
            <h3 id="share-heading" className="text-lg font-semibold text-slate-700 mb-4">
              Save or share your blueprint
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <label htmlFor="share-url" className="sr-only">Blueprint URL</label>
              <input
                id="share-url"
                type="text"
                readOnly
                value={shareUrl}
                className="w-full sm:w-auto sm:min-w-[360px] px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm"
                aria-label="Your blueprint URL"
              />
              <button
                onClick={handleCopyLink}
                className={cn(
                  'px-5 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm',
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-800 text-white hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
                )}
                aria-label={copied ? 'Link copied to clipboard' : 'Copy blueprint link'}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            {aiError && (
              <div className="mt-6" role="alert">
                <p className="text-slate-500 text-sm mb-2">
                  Personalized insights are taking a moment.
                </p>
                <button
                  onClick={fetchAIContent}
                  className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition-colors duration-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Load Personalized Insights
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-6" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} The Funnel Flippers. All rights
            reserved.
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Kylee + Sami | HighLevel Build Experts
          </p>
        </div>
      </footer>
    </div>
  );
}
