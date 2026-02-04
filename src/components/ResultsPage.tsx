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

function HeroShimmer() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-5 bg-white/15 rounded w-full" />
      <div className="h-5 bg-white/15 rounded w-full" />
      <div className="h-5 bg-white/15 rounded w-3/4" />
      <div className="h-5 bg-white/10 rounded w-full mt-6" />
      <div className="h-5 bg-white/10 rounded w-5/6" />
    </div>
  );
}

function ContentShimmer() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-full" />
      <div className="h-4 bg-slate-200 rounded w-full" />
      <div className="h-4 bg-slate-200 rounded w-5/6" />
      <div className="h-4 bg-slate-200 rounded w-full mt-4" />
      <div className="h-4 bg-slate-200 rounded w-4/5" />
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
      {/* Hero — personal note, not a product page */}
      <header className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            {/* From line */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                TFF
              </div>
              <div>
                <p className="text-sm text-indigo-200">
                  From Kylee + Sami at The Funnel Flippers
                </p>
                <p className="text-xs text-indigo-300">
                  Your personalized build blueprint
                </p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              {userInfo.firstName}, we read every answer.
              <br />
              <span className="text-cyan-400">
                Here&apos;s what we&apos;d build for you.
              </span>
            </h1>

            {/* AI intro or fallback */}
            <div className="space-y-4 text-lg md:text-xl">
              {aiLoading ? (
                <HeroShimmer />
              ) : aiContent?.personalizedIntro ? (
                <div className="space-y-4 text-indigo-100">
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
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-indigo-200">
              <span>Hundreds of HighLevel builds delivered</span>
              <span className="hidden sm:inline">|</span>
              <span>Coaches, agencies, course creators</span>
              <span className="hidden sm:inline">|</span>
              <span>We build what others say is impossible</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Systems Section */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
              Here&apos;s what we&apos;d build for your {businessType}{' '}
              business
            </h2>
            <p className="text-slate-600">
              We picked these three based on everything you told us — your pain
              points, what you want your business to feel like, and where
              you&apos;re trying to go. This isn&apos;t a generic list.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
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
        {(aiLoading || aiContent?.closingMessage) && (
          <section className="py-12 md:py-16">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12">
              {aiLoading ? (
                <ContentShimmer />
              ) : aiContent?.closingMessage ? (
                <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                  {renderParagraphs(aiContent.closingMessage)}
                </div>
              ) : null}
            </div>
          </section>
        )}

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
                onClick={handleCopyLink}
                className={cn(
                  'px-6 py-3 rounded-xl font-medium transition-all duration-200',
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                )}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            {aiError && (
              <div className="mt-6">
                <p className="text-slate-500 text-sm mb-2">
                  Your personalized insights are taking a moment.
                </p>
                <button
                  onClick={fetchAIContent}
                  className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition-colors duration-200 text-sm"
                >
                  Load Personalized Insights
                </button>
              </div>
            )}
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
