// Business model types
export type BusinessModel = 'coach' | 'course_creator' | 'agency' | 'service_business' | 'info_product';

// Pain points that can be selected
export type PainPoint =
  | 'onboarding'
  | 'payments'
  | 'content_updates'
  | 'reporting'
  | 'lead_followup'
  | 'team_management'
  | 'repetitive_delivery'
  | 'platform_switching';

// Dream state options
export type DreamState =
  | 'runs_itself'
  | 'premium_experience'
  | 'scale_without_hiring'
  | 'replicate_experience'
  | 'time_freedom'
  | 'real_data';

// Platform count options
export type PlatformCount =
  | 'highlevel_only'
  | 'highlevel_plus_1-2'
  | 'highlevel_plus_3-5'
  | 'highlevel_plus_6+'
  | 'not_using_highlevel';

// Who they're building for
export type BuildingFor = 'own_business' | 'agency_clients' | 'both' | 'snapshots_to_sell';

// Experience type preference
export type ExperienceType =
  | 'white_glove'
  | 'effortlessly_simple'
  | 'tech_forward'
  | 'community_driven'
  | 'results_focused';

// Investment level
export type InvestmentLevel =
  | 'premium_asap'
  | 'moderate_timeline'
  | 'ongoing_retainer'
  | 'exploring'
  | 'snapshot_creation';

// Complete quiz responses
export interface QuizResponses {
  businessModel: BusinessModel | null;
  painPoints: PainPoint[];
  dreamState: DreamState[];
  impossibleChallenge: string;
  platformCount: PlatformCount | null;
  buildingFor: BuildingFor | null;
  experienceType: ExperienceType | null;
  investmentLevel: InvestmentLevel | null;
}

// User contact info
export interface UserInfo {
  firstName: string;
  email: string;
  phone?: string;
}

// System recommendation
export interface SystemRecommendation {
  id: string;
  name: string;
  description: string;
  replaces: string[];
  includes: string[];
  timeSaved: string;
  complexity: string;
  priceRange: string;
  realExample: string;
  showWhen: (responses: QuizResponses) => boolean;
  priority: (responses: QuizResponses) => number;
}

// Question types
export type QuestionType = 'single_select' | 'multi_select' | 'text';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: number;
  title: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  characterLimit?: number;
  required?: boolean;
  afterMessage: string;
  storageKey: keyof QuizResponses;
}

// Complete quiz result for storage
export interface QuizResult {
  id: string;
  responses: QuizResponses;
  userInfo: UserInfo;
  recommendedSystems: string[];
  timestamp: string;
}

// AI-generated blueprint content
export interface AIBlueprintContent {
  personalizedIntro: string;
  systemInsights: string[];
  impossibleResponse: string;
  closingMessage: string;
}
