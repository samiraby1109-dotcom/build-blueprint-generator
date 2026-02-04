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

// Cache key for AI content in localStorage
function getAICacheKey(resultId: string): string {
  return `blueprint-ai-${resultId}`;
}

// Loading shimmer component
function TextShimmer({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-3 animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-white/20 rounded',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

function ContentShimmer({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3 animate-pulse', className)}>
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

  // Get the actual system objects
  const systemObjects = recommendedSystems
    .map((id) => systems.find((s) => s.id === id))
    .filter((s) => s !== undefined);

  // Fallback intro (template-based) in case AI fails
  const fallbackIntro = generatePersonalizedIntro(responses);

  // Get business type label
  const businessType = responses.businessModel
    ? businessModelLabels[responses.businessModel]
    : 'business owner';

  // Get shareable URL
  const shareUrl = getResultsUrl(result.id);

  // Fetch AI-generated content
  const fetchAIContent = useCallback(async () => {
    // Check localStorage cache first
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

      if (!response.ok) {
        throw new Error('AI generation failed');
      }

      const data = await response.json();

      if (data.success && data.content) {
        setAiContent(data.content);
        // Cache it
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

  // Handle copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render paragraphs from a string (split on double newlines)
  const renderParagraphs = (text: string, className?: string) => {
    return text.split(/\n\n+/).map((paragraph, i) => (
      <p key={i} className={cn('leading-relaxed', className)}>
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-indigo-200 mb-3">Your custom build blueprint</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-8">
              Hey {userInfo.firstName}, here&apos;s what we&apos;d build for you
            </h1>

            {/* AI-generated intro or fallback */}
            <div className="text-left md:text-center space-y-4">
              {aiLoading ? (
                <TextShimmer lines={5} />
              ) : aiContent?.personalizedIntro ? (
                <div className="space-y-4 text-lg md:text-xl text-indigo-100">
                  {renderParagraphs(aiContent.personalizedIntro, 'text-indigo-100')}
                </div>
              ) : (
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed">
                  {fallbackIntro}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {/* Systems Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              The 3 Systems We&apos;d Build For Your{' '}
              {businessType.charAt(0).toUpperCase() + businessType.slice(1)}{' '}
              Business
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Based on your answers, these are the automation systems that would
              have the biggest impact on your business.
            </p>
          </div>

          <div className="space-y-8">
            {systemObjects.map((system, index) => (
              <div key={system.id}>
                <SystemCard system={system} index={index} />

                {/* AI insight for this system */}
                <div className="mt-4 mx-4 md:mx-8">
                  {aiLoading ? (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                      <ContentShimmer />
                    </div>
                  ) : aiContent?.systemInsights?.[index] ? (
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                      <div className="flex items-start gap-3 mb-3">
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
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-indigo-700">
                          Why this matters for you specifically
                        </h4>
                      </div>
                      <div className="space-y-3 text-slate-700 pl-11">
                        {renderParagraphs(aiContent.systemInsights[index])}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impossible Section - now with AI response */}
        <ImpossibleSection
          userChallenge={responses.impossibleChallenge}
          aiResponse={aiContent?.impossibleResponse}
          isLoading={aiLoading}
        />

        {/* CTA Section */}
        <CTASection responses={responses} />

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

            {/* Retry button if AI failed */}
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
