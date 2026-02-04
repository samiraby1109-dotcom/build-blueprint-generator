import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {
  QuizResponses,
  UserInfo,
  QuizResult,
  BusinessModel,
  PainPoint,
  DreamState,
  PlatformCount,
  BuildingFor,
  ExperienceType,
  InvestmentLevel,
} from '@/types/quiz';
import { getRecommendedSystems, getFallbackSystems } from '@/data/systems';

interface QuizState {
  // Current question index (0-7 for questions, 8 for email capture)
  currentQuestion: number;

  // Quiz responses
  responses: QuizResponses;

  // User info (collected at email capture step)
  userInfo: UserInfo | null;

  // Generated result ID
  resultId: string | null;

  // Show "after" message for current question
  showAfterMessage: boolean;

  // Actions
  setBusinessModel: (value: BusinessModel) => void;
  togglePainPoint: (value: PainPoint) => void;
  toggleDreamState: (value: DreamState) => void;
  setImpossibleChallenge: (value: string) => void;
  setPlatformCount: (value: PlatformCount) => void;
  setBuildingFor: (value: BuildingFor) => void;
  setExperienceType: (value: ExperienceType) => void;
  setInvestmentLevel: (value: InvestmentLevel) => void;
  setUserInfo: (info: UserInfo) => void;

  // Navigation
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;

  // Result generation
  generateResult: () => QuizResult;

  // Reset
  resetQuiz: () => void;

  // After message
  setShowAfterMessage: (show: boolean) => void;
}

const initialResponses: QuizResponses = {
  businessModel: null,
  painPoints: [],
  dreamState: [],
  impossibleChallenge: '',
  platformCount: null,
  buildingFor: null,
  experienceType: null,
  investmentLevel: null,
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentQuestion: 0,
      responses: initialResponses,
      userInfo: null,
      resultId: null,
      showAfterMessage: false,

      setBusinessModel: (value) =>
        set((state) => ({
          responses: { ...state.responses, businessModel: value },
        })),

      togglePainPoint: (value) =>
        set((state) => {
          const current = state.responses.painPoints;
          const newPainPoints = current.includes(value)
            ? current.filter((p) => p !== value)
            : [...current, value];
          return {
            responses: { ...state.responses, painPoints: newPainPoints },
          };
        }),

      toggleDreamState: (value) =>
        set((state) => {
          const current = state.responses.dreamState;
          const newDreamState = current.includes(value)
            ? current.filter((d) => d !== value)
            : [...current, value];
          return {
            responses: { ...state.responses, dreamState: newDreamState },
          };
        }),

      setImpossibleChallenge: (value) =>
        set((state) => ({
          responses: { ...state.responses, impossibleChallenge: value },
        })),

      setPlatformCount: (value) =>
        set((state) => ({
          responses: { ...state.responses, platformCount: value },
        })),

      setBuildingFor: (value) =>
        set((state) => ({
          responses: { ...state.responses, buildingFor: value },
        })),

      setExperienceType: (value) =>
        set((state) => ({
          responses: { ...state.responses, experienceType: value },
        })),

      setInvestmentLevel: (value) =>
        set((state) => ({
          responses: { ...state.responses, investmentLevel: value },
        })),

      setUserInfo: (info) => set({ userInfo: info }),

      nextQuestion: () =>
        set((state) => ({
          currentQuestion: Math.min(state.currentQuestion + 1, 8),
          showAfterMessage: false,
        })),

      previousQuestion: () =>
        set((state) => ({
          currentQuestion: Math.max(state.currentQuestion - 1, 0),
          showAfterMessage: false,
        })),

      goToQuestion: (index) =>
        set({
          currentQuestion: Math.max(0, Math.min(index, 8)),
          showAfterMessage: false,
        }),

      setShowAfterMessage: (show) => set({ showAfterMessage: show }),

      generateResult: () => {
        const state = get();
        const { responses, userInfo } = state;

        // Get recommended systems
        let recommendedSystems = getRecommendedSystems(responses);

        // If we don't have 3 systems, use fallback
        if (recommendedSystems.length < 3) {
          const fallbacks = getFallbackSystems(responses);
          const existingIds = recommendedSystems.map((s) => s.id);
          const additionalSystems = fallbacks.filter((s) => !existingIds.includes(s.id));
          recommendedSystems = [...recommendedSystems, ...additionalSystems].slice(0, 3);
        }

        const resultId = uuidv4();

        const result: QuizResult = {
          id: resultId,
          responses,
          userInfo: userInfo || { firstName: '', email: '' },
          recommendedSystems: recommendedSystems.map((s) => s.id),
          timestamp: new Date().toISOString(),
        };

        set({ resultId });

        return result;
      },

      resetQuiz: () =>
        set({
          currentQuestion: 0,
          responses: initialResponses,
          userInfo: null,
          resultId: null,
          showAfterMessage: false,
        }),
    }),
    {
      name: 'blueprint-quiz-storage',
      partialize: (state) => ({
        responses: state.responses,
        userInfo: state.userInfo,
        resultId: state.resultId,
        currentQuestion: state.currentQuestion,
      }),
    }
  )
);

// Helper to check if a question can be advanced
export function canAdvanceQuestion(
  questionIndex: number,
  responses: QuizResponses
): boolean {
  switch (questionIndex) {
    case 0:
      return responses.businessModel !== null;
    case 1:
      return responses.painPoints.length > 0;
    case 2:
      return responses.dreamState.length > 0;
    case 3:
      return true; // Optional text field
    case 4:
      return responses.platformCount !== null;
    case 5:
      return responses.buildingFor !== null;
    case 6:
      return responses.experienceType !== null;
    case 7:
      return responses.investmentLevel !== null;
    default:
      return true;
  }
}
