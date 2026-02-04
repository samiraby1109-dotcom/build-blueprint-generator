import { QuizResponses, PainPoint, DreamState, ExperienceType } from '@/types/quiz';

// Pain point display names
export const painPointLabels: Record<PainPoint, string> = {
  onboarding: 'onboarding new clients manually',
  payments: 'chasing payments and reminders',
  content_updates: 'updating content across multiple places',
  reporting: 'creating reports for clients',
  lead_followup: 'following up with leads',
  team_management: 'managing team tasks and communication',
  repetitive_delivery: 'delivering the same information repeatedly',
  platform_switching: 'switching between multiple platforms',
};

// Dream state display names
export const dreamStateLabels: Record<DreamState, string> = {
  runs_itself: 'a business that runs itself while you focus on high-value work',
  premium_experience: "clients saying 'this is the most professional experience I've had'",
  scale_without_hiring: 'scaling without hiring more people',
  replicate_experience: 'replicating your best client experience for everyone',
  time_freedom: 'freeing up 20+ hours a week',
  real_data: "real data on what's actually working",
};

// Experience type display names
export const experienceTypeLabels: Record<ExperienceType, string> = {
  white_glove: 'a white-glove premium experience',
  effortlessly_simple: 'an effortlessly simple experience',
  tech_forward: 'a tech-forward impressive experience',
  community_driven: 'a community-driven connected experience',
  results_focused: 'a results-focused efficient experience',
};

// Business model labels
export const businessModelLabels = {
  coach: 'coach',
  course_creator: 'course creator',
  agency: 'agency owner',
  service_business: 'service business owner',
  info_product: 'info product creator',
};

// Generate personalized intro based on responses
export function generatePersonalizedIntro(responses: QuizResponses): string {
  const topPainPoints = responses.painPoints.slice(0, 2).map((p) => painPointLabels[p]);
  const topDreamState = responses.dreamState[0] ? dreamStateLabels[responses.dreamState[0]] : 'automation freedom';
  const experienceLabel = responses.experienceType ? experienceTypeLabels[responses.experienceType] : 'a premium experience';
  const impossibleChallenge = responses.impossibleChallenge || 'fully automated client journeys';

  switch (responses.businessModel) {
    case 'coach':
      return `Based on your answers, you're a coach spending way too much time on ${topPainPoints.join(' and ') || 'manual tasks'}, when you should be focused on ${topDreamState}. You want ${experienceLabel}, and you've got ideas about what should be automated that most people think are impossible. Good news: they're not. And here's how we'd build it.`;

    case 'course_creator':
      return `You're delivering content and building community, but you're probably manually doing a lot of what should run on autopilot. You want ${experienceLabel}, and based on your answers, you're dealing with ${topPainPoints.join(' and ') || 'too much manual work'}. Here's what we'd build to fix that.`;

    case 'agency':
      if (responses.buildingFor === 'agency_clients' || responses.buildingFor === 'both') {
        return `You're running an agency, which means you're building HighLevel systems for OTHER people while probably duct-taping your own backend together. You need white-label support that makes your clients think you have a massive tech team. We do this for agencies all the time. Here's what we'd build for you.`;
      }
      return `You're running an agency and need systems that can scale with your client load. You're dealing with ${topPainPoints.join(' and ') || 'operational complexity'}, and you want ${experienceLabel}. Here's what we'd automate.`;

    case 'service_business':
      return `Running a service business with recurring clients means you need systems that deliver consistency without constant manual work. You're dealing with ${topPainPoints.join(' and ') || 'too much manual coordination'}, and you want ${experienceLabel}. Here's what we'd automate.`;

    case 'info_product':
      return `You want to create HighLevel systems that OTHER people can buy and implement. That means you need productized snapshots with proper documentation, delivery systems, and update workflows. Here's what we'd build for you to sell.`;

    default:
      return `Based on your answers, you have a clear vision of what you want—${topDreamState}—but you're stuck dealing with ${topPainPoints.join(' and ') || 'manual processes'}. Here's how we'd build the automation to get you there.`;
  }
}

// Generate intro specifically for snapshot sellers
export function generateSnapshotSellerIntro(responses: QuizResponses): string | null {
  if (responses.buildingFor === 'snapshots_to_sell' || responses.businessModel === 'info_product') {
    return `You want to create HighLevel systems that OTHER people can buy and implement. That means you need productized snapshots with proper documentation, delivery systems, and update workflows. Here's what we'd build for you to sell.`;
  }
  return null;
}

// The "impossible" section content
export const impossibleSectionContent = {
  intro: 'We love this question because 95% of the time when someone says "that probably can\'t be automated," it actually can.',
  examples: [
    'Personalized check-ins at scale based on student progress data',
    'Dynamic content delivery that adapts to engagement patterns',
    'Automated client success scoring that flags at-risk accounts',
    'White-label portals that update themselves when you update the master',
    'Multi-tier pricing with dynamic upsell triggers',
    'An entire call center agency with automated customer journeys based on call results',
  ],
  cta: {
    headline: 'Want to know if YOUR idea is possible?',
    description: "Book a strategy call and we'll tell you exactly how we'd approach it. Even if we can't build it in HighLevel (rare, but it happens), we'll tell you straight up what IS possible and what the workarounds would be.",
    subtext: "We're not here to sell you something that won't work. We're here to build systems that actually do what you need them to do.",
  },
};

// Why work with us section
export const whyWorkWithUsContent = {
  headline: 'Why work with us instead of trying to DIY this?',
  intro: "Look, we're not going to tell you that you CAN'T build this yourself. You probably could, eventually, after watching 47 YouTube tutorials, breaking things twice, and spending 40+ hours figuring it out.",
  points: [
    {
      title: "We've done this hundreds of times.",
      description: "We know the shortcuts, the gotchas, the workarounds for the things HighLevel doesn't document well.",
    },
    {
      title: 'We see the bigger picture.',
      description: 'You tell us what you want to happen, we figure out the technical architecture that makes it work long-term.',
    },
    {
      title: 'We love the impossible stuff.',
      description: "When you say \"I wish I could...\" and someone else says \"that can't be done,\" that's our favorite kind of project.",
    },
    {
      title: 'We move fast.',
      description: "What would take you weeks takes us days. Because we've built similar systems before and know exactly what works.",
    },
    {
      title: "We're obsessed with this.",
      description: "While you're running your actual business, we're staying up until midnight testing new HighLevel features and figuring out how to bend the platform to do things it wasn't designed to do.",
    },
  ],
  closing: 'You dream it. We build it. You get your life back.',
};

// CTA Options
export const ctaOptions = {
  customBuild: {
    title: 'Custom Build Project',
    bestFor: 'You need these systems built for YOUR business',
    benefits: [
      'Strategy call to map out exactly what you need',
      'Custom build of 1-3 systems (based on scope)',
      'Training on how to use and maintain it',
      '30 days of post-launch support',
    ],
    timeline: '4-12 weeks depending on project scope and current capacity',
    investment: '$3K-$15K depending on complexity',
    buttonText: 'Book Your Strategy Call',
    buttonLink: '#', // TODO: Add actual link
  },
  whiteLabel: {
    title: 'White-Label Agency Support',
    bestFor: "You're building HighLevel systems for clients and need backend support",
    benefits: [
      'Ongoing builds for your agency clients',
      'We stay invisible, you get the credit',
      'Monthly capacity for new builds',
      'Priority support for client emergencies',
    ],
    timeline: 'Ongoing partnership',
    investment: '$1,497-$3,997/month depending on volume',
    buttonText: 'Book Your Agency Call',
    buttonLink: '#', // TODO: Add actual link
  },
  snapshotDevelopment: {
    title: 'Snapshot Development',
    bestFor: 'You want to create systems/snapshots to SELL',
    benefits: [
      'We build the snapshot/system to your specifications',
      'Complete documentation and setup guide',
      'Delivery system for your customers',
      'Update management workflow',
    ],
    timeline: '4-12 weeks depending on complexity and current capacity',
    investment: '$5K-$15K for complete productized system',
    buttonText: 'Book Your Snapshot Call',
    buttonLink: '#', // TODO: Add actual link
  },
  hackingHighLevel: {
    title: 'Not ready to build yet?',
    subtitle: 'Join Hacking HighLevel for $14/month',
    benefits: [
      'Monthly live calls where we troubleshoot your specific situations',
      'Access to our tutorial library',
      'Community of people building cool stuff in HighLevel',
    ],
    buttonText: 'Join Hacking HighLevel',
    buttonLink: '#', // TODO: Add actual link
  },
};

// Determine which CTAs to show prominently based on investment level
export function getCTAOrder(responses: QuizResponses): {
  primary: keyof typeof ctaOptions;
  secondary?: keyof typeof ctaOptions;
  tertiary?: keyof typeof ctaOptions;
  showExploring?: boolean;
} {
  switch (responses.investmentLevel) {
    case 'premium_asap':
    case 'moderate_timeline':
      return {
        primary: 'customBuild',
        secondary: responses.buildingFor === 'agency_clients' || responses.buildingFor === 'both'
          ? 'whiteLabel'
          : undefined,
        tertiary: responses.buildingFor === 'snapshots_to_sell' ? 'snapshotDevelopment' : undefined,
      };

    case 'ongoing_retainer':
      return {
        primary: 'whiteLabel',
        secondary: 'customBuild',
      };

    case 'snapshot_creation':
      return {
        primary: 'snapshotDevelopment',
        secondary: 'customBuild',
      };

    case 'exploring':
      return {
        primary: 'hackingHighLevel',
        showExploring: true,
      };

    default:
      return {
        primary: 'customBuild',
      };
  }
}
