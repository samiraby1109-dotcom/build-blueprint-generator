'use client';

import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from './ProgressBar';
import { RadioQuestion } from './RadioQuestion';
import { CheckboxQuestion } from './CheckboxQuestion';
import { TextQuestion } from './TextQuestion';
import { EmailCapture } from './EmailCapture';
import { useQuizStore, canAdvanceQuestion } from '@/store/quizStore';
import { questions } from '@/data/questions';
import { cn } from '@/lib/utils';
import { saveResult } from '@/lib/utils';
import {
  BusinessModel,
  PainPoint,
  DreamState,
  PlatformCount,
  BuildingFor,
  ExperienceType,
  InvestmentLevel,
} from '@/types/quiz';

export function Quiz() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    currentQuestion,
    responses,
    showAfterMessage,
    setBusinessModel,
    togglePainPoint,
    toggleDreamState,
    setImpossibleChallenge,
    setPlatformCount,
    setBuildingFor,
    setExperienceType,
    setInvestmentLevel,
    setUserInfo,
    nextQuestion,
    previousQuestion,
    setShowAfterMessage,
    generateResult,
  } = useQuizStore();

  const isEmailCapture = currentQuestion === 8;
  const currentQ = !isEmailCapture ? questions[currentQuestion] : null;

  // Check if we can advance
  const canAdvance = canAdvanceQuestion(currentQuestion, responses);

  // Handle answer selection for single-select questions
  const handleSingleSelect = useCallback(
    (value: string) => {
      switch (currentQuestion) {
        case 0:
          setBusinessModel(value as BusinessModel);
          break;
        case 4:
          setPlatformCount(value as PlatformCount);
          break;
        case 5:
          setBuildingFor(value as BuildingFor);
          break;
        case 6:
          setExperienceType(value as ExperienceType);
          break;
        case 7:
          setInvestmentLevel(value as InvestmentLevel);
          break;
      }
      // Show after message when answer is selected
      setShowAfterMessage(true);
    },
    [
      currentQuestion,
      setBusinessModel,
      setPlatformCount,
      setBuildingFor,
      setExperienceType,
      setInvestmentLevel,
      setShowAfterMessage,
    ]
  );

  // Handle toggle for multi-select questions
  const handleMultiSelect = useCallback(
    (value: string) => {
      switch (currentQuestion) {
        case 1:
          togglePainPoint(value as PainPoint);
          break;
        case 2:
          toggleDreamState(value as DreamState);
          break;
      }
      setShowAfterMessage(true);
    },
    [currentQuestion, togglePainPoint, toggleDreamState, setShowAfterMessage]
  );

  // Handle text input
  const handleTextChange = useCallback(
    (value: string) => {
      setImpossibleChallenge(value);
      if (value.length > 0) {
        setShowAfterMessage(true);
      }
    },
    [setImpossibleChallenge, setShowAfterMessage]
  );

  // Handle email capture submission
  const handleEmailSubmit = useCallback(
    async (data: { firstName: string; email: string; phone?: string }) => {
      setIsSubmitting(true);
      setUserInfo(data);

      // Generate the result
      const result = generateResult();

      // Save to localStorage
      saveResult(result.id, result);

      // Submit to HighLevel API (non-blocking - don't wait for it)
      try {
        fetch('/api/submit-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: data.firstName,
            email: data.email,
            phone: data.phone,
            businessModel: responses.businessModel,
            painPoints: responses.painPoints,
            dreamState: responses.dreamState,
            impossibleChallenge: responses.impossibleChallenge,
            platformCount: responses.platformCount,
            buildingFor: responses.buildingFor,
            experienceType: responses.experienceType,
            investmentLevel: responses.investmentLevel,
            resultId: result.id,
            recommendedSystems: result.recommendedSystems,
          }),
        }).catch((err) => {
          // Log but don't block the user experience
          console.error('HighLevel submission error:', err);
        });
      } catch (err) {
        console.error('HighLevel submission error:', err);
      }

      // Navigate to results page immediately (don't wait for API)
      router.push(`/blueprint/${result.id}`);
    },
    [setUserInfo, generateResult, router, responses]
  );

  // Get current answer value(s)
  const getCurrentValue = (): string | string[] | null => {
    if (!currentQ) return null;

    switch (currentQuestion) {
      case 0:
        return responses.businessModel;
      case 1:
        return responses.painPoints;
      case 2:
        return responses.dreamState;
      case 3:
        return responses.impossibleChallenge;
      case 4:
        return responses.platformCount;
      case 5:
        return responses.buildingFor;
      case 6:
        return responses.experienceType;
      case 7:
        return responses.investmentLevel;
      default:
        return null;
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canAdvance && !isEmailCapture) {
        nextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canAdvance, isEmailCapture, nextQuestion]);

  // Render the current question
  const renderQuestion = () => {
    if (isEmailCapture) {
      return <EmailCapture onSubmit={handleEmailSubmit} isLoading={isSubmitting} />;
    }

    if (!currentQ) return null;

    const value = getCurrentValue();

    switch (currentQ.type) {
      case 'single_select':
        return (
          <RadioQuestion
            title={currentQ.title}
            options={currentQ.options || []}
            selectedValue={value as string | null}
            onSelect={handleSingleSelect}
            afterMessage={currentQ.afterMessage}
            showAfterMessage={showAfterMessage}
          />
        );

      case 'multi_select':
        return (
          <CheckboxQuestion
            title={currentQ.title}
            options={currentQ.options || []}
            selectedValues={(value as string[]) || []}
            onToggle={handleMultiSelect}
            afterMessage={currentQ.afterMessage}
            showAfterMessage={showAfterMessage}
          />
        );

      case 'text':
        return (
          <TextQuestion
            title={currentQ.title}
            value={(value as string) || ''}
            onChange={handleTextChange}
            placeholder={currentQ.placeholder}
            characterLimit={currentQ.characterLimit}
            afterMessage={currentQ.afterMessage}
            showAfterMessage={showAfterMessage}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            HighLevel Build Blueprint Generator
          </h1>
          <p className="text-slate-600 mt-2">
            Discover the custom systems we&apos;d build for your business
          </p>
        </div>

        {/* Progress bar - only show during questions, not email capture */}
        {!isEmailCapture && (
          <div className="max-w-2xl mx-auto">
            <ProgressBar currentStep={currentQuestion} totalSteps={8} />
          </div>
        )}

        {/* Question content */}
        <div className="max-w-2xl mx-auto py-8">{renderQuestion()}</div>

        {/* Navigation buttons - only show during questions, not email capture */}
        {!isEmailCapture && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="flex justify-between items-center">
              {/* Back button */}
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  currentQuestion === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                )}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>

              {/* Next/Continue button */}
              <button
                onClick={nextQuestion}
                disabled={!canAdvance}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200',
                  canAdvance
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                )}
              >
                {currentQuestion === 7 ? 'Get My Blueprint' : 'Continue'}
                <svg
                  className="w-5 h-5"
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
              </button>
            </div>

            {/* Skip hint for optional question */}
            {currentQuestion === 3 && (
              <p className="text-center text-sm text-slate-500 mt-4">
                This question is optional. Press Continue to skip.
              </p>
            )}

            {/* Keyboard hint */}
            {canAdvance && (
              <p className="text-center text-sm text-slate-400 mt-4">
                Press <kbd className="px-2 py-1 bg-slate-100 rounded text-slate-600">Enter</kbd> to continue
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
