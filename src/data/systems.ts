import { QuizResponses, SystemRecommendation } from '@/types/quiz';

export const systems: SystemRecommendation[] = [
  // Systems for Coaches/Course Creators
  {
    id: 'hands-off-client-journey',
    name: 'The Hands-Off Client Journey',
    description: 'From the moment someone pays you to the moment they complete your program, every step runs automatically. Onboarding, reminders, check-ins, progress tracking, and offboarding—all hands-off while feeling personal.',
    replaces: [
      'Manual onboarding emails and scheduling',
      'Chasing people for prep work or homework',
      'Remembering to check in on client progress',
    ],
    includes: [
      'Automated payment-to-access workflow',
      'Smart calendar management with contextual reminders',
      'Progress-based check-in surveys that trigger follow-ups',
      'Engagement tracking that flags who needs attention',
      'Automated offboarding with testimonial collection',
    ],
    timeSaved: '8-12 hours per week',
    complexity: 'Custom build',
    priceRange: '$3,500-$7,000',
    realExample: 'We built this for Alex S., a physician and lifestyle coach. They went from 20 hours of manual work per week to under 5 hours—all while delivering a more personalized experience.',
    showWhen: (r: QuizResponses) =>
      r.painPoints.includes('onboarding') ||
      r.painPoints.includes('repetitive_delivery') ||
      r.businessModel === 'coach',
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.painPoints.includes('onboarding')) score += 3;
      if (r.painPoints.includes('repetitive_delivery')) score += 2;
      if (r.businessModel === 'coach') score += 2;
      return score;
    },
  },
  {
    id: 'evergreen-content-engine',
    name: 'The Evergreen Content Engine',
    description: "Your content delivers itself based on progress, not just time. Students get exactly what they need when they need it, with smart recommendations, automatic unlocks, and engagement-triggered support.",
    replaces: [
      'Manual course access management',
      "Checking who's engaged vs. who's stuck",
      'Sending the same resources over and over',
    ],
    includes: [
      'Progress-based content dripping (not just time-based)',
      'Dynamic access management for different tiers',
      'Engagement tracking with re-engagement triggers',
      'Smart resource library with personalized recommendations',
      'Community integration with automated discussion prompts',
    ],
    timeSaved: '10-15 hours per week',
    complexity: 'Custom build',
    priceRange: '$5,000-$10,000',
    realExample: 'We built this for Jamie, an educator serving 250+ students. She went from 80-hour weeks to a nearly hands-off business with happier students.',
    showWhen: (r: QuizResponses) =>
      r.businessModel === 'course_creator' || r.painPoints.includes('content_updates'),
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.businessModel === 'course_creator') score += 4;
      if (r.painPoints.includes('content_updates')) score += 3;
      if (r.painPoints.includes('repetitive_delivery')) score += 1;
      return score;
    },
  },
  {
    id: 'premium-experience-automation',
    name: 'The Premium Experience Automation',
    description: 'Make every client feel like your only client—at scale. Personalized welcome sequences, custom reporting, proactive support triggers, and milestone celebrations that happen automatically but feel completely intentional.',
    replaces: [
      'Manual "check-in" emails you forget to send',
      'Creating reports from scratch every month',
      'Remembering client milestones and wins',
    ],
    includes: [
      'Branded welcome sequence with personalization',
      'Custom reporting dashboards per client',
      'Automated milestone celebrations (with actual personality)',
      'Proactive support triggers before people have to ask',
      'Smart exit surveys with retention opportunities',
    ],
    timeSaved: '6-10 hours per week',
    complexity: 'Custom build',
    priceRange: '$4,000-$8,000',
    realExample: 'We built this for Stirling, a coach who wanted every touchpoint to feel high-end. Cut admin time by 80% while clients raved about the experience.',
    showWhen: (r: QuizResponses) =>
      r.experienceType === 'white_glove' || r.dreamState.includes('premium_experience'),
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.experienceType === 'white_glove') score += 4;
      if (r.dreamState.includes('premium_experience')) score += 3;
      if (r.businessModel === 'coach') score += 1;
      return score;
    },
  },

  // Systems for Agency Owners
  {
    id: 'white-label-client-portal',
    name: 'The White-Label Client Portal',
    description: 'Give each of your agency clients a branded dashboard that makes them think you have a 10-person tech team. Automated reporting, self-service resources, project tracking, and communication workflows—all white-labeled under your brand.',
    replaces: [
      'Manual client reporting every month',
      '"Where are we at?" status update calls',
      'Explaining the same things to every client',
    ],
    includes: [
      'Fully branded client dashboard per account',
      'Automated reports that showcase your value',
      'Self-service resource center with FAQs',
      'Project status tracking (updates itself)',
      'Client communication workflows',
    ],
    timeSaved: '15-20 hours per week',
    complexity: 'Custom build',
    priceRange: '$6,000-$12,000',
    realExample: 'We built this for a 3-person agency managing 15 clients. They look like a 20-person operation now.',
    showWhen: (r: QuizResponses) =>
      r.buildingFor === 'agency_clients' || r.buildingFor === 'both' || r.businessModel === 'agency',
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.buildingFor === 'agency_clients') score += 4;
      if (r.buildingFor === 'both') score += 3;
      if (r.businessModel === 'agency') score += 3;
      if (r.painPoints.includes('reporting')) score += 2;
      return score;
    },
  },
  {
    id: 'agency-operations-backend',
    name: 'The Agency Operations Backend',
    description: "Your internal operations machine. From the moment someone signs a proposal to project completion, everything is tracked, triggered, and templated. Your team knows what to do, clients stay in the loop, and nothing falls through the cracks.",
    replaces: [
      'Manual project kickoffs and onboarding',
      'Wondering what your team is working on',
      'Chasing down approvals and payments',
    ],
    includes: [
      'Client onboarding automation (proposal → kickoff)',
      'Project management workflows with team notifications',
      'Automated task assignments',
      'Client approval processes',
      'Billing and payment tracking with reminders',
    ],
    timeSaved: '12-18 hours per week',
    complexity: 'Custom build',
    priceRange: '$5,000-$10,000',
    realExample: 'We built this for an agency that was drowning in manual coordination. Now they can handle 2x the clients with the same team.',
    showWhen: (r: QuizResponses) =>
      (r.buildingFor === 'agency_clients' || r.buildingFor === 'both') &&
      r.painPoints.includes('team_management'),
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.buildingFor === 'agency_clients' || r.buildingFor === 'both') score += 2;
      if (r.painPoints.includes('team_management')) score += 4;
      if (r.businessModel === 'agency') score += 2;
      return score;
    },
  },
  {
    id: 'snapshot-factory-system',
    name: 'The Snapshot Factory System',
    description: "If you're building similar systems for multiple clients, you need a factory process. Template snapshot creation, quality control checklists, customization workflows, deployment automation, and post-launch support—all systematized.",
    replaces: [
      'Building every client system from scratch',
      'Missing steps in your build process',
      'Manual snapshot deployment and setup',
    ],
    includes: [
      'Template snapshot creation workflow',
      'Build quality control checklists',
      'Client-specific customization process',
      'One-click deployment automation',
      'Post-launch support automation',
    ],
    timeSaved: '20-30 hours per month',
    complexity: 'Custom build',
    priceRange: '$7,000-$15,000',
    realExample: 'We built this for an agency offering HighLevel setups to clients. Cut their build time by 60% while improving consistency.',
    showWhen: (r: QuizResponses) =>
      r.buildingFor === 'both' || r.painPoints.includes('repetitive_delivery'),
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.buildingFor === 'both') score += 3;
      if (r.painPoints.includes('repetitive_delivery')) score += 3;
      if (r.businessModel === 'agency') score += 2;
      return score;
    },
  },

  // Systems for Service Businesses
  {
    id: 'recurring-client-machine',
    name: 'The Recurring Client Machine',
    description: 'For businesses with recurring clients who need consistent service delivery. Automatic scheduling, service delivery checklists, client communication, billing automation, and retention triggers—all working together to create a seamless recurring revenue machine.',
    replaces: [
      'Manual scheduling and reminder calls',
      'Paper checklists or scattered task lists',
      'Chasing down payments every month',
    ],
    includes: [
      'Automated scheduling with smart reminders',
      'Service delivery checklists (digital, tracked)',
      'Client communication workflows',
      'Payment and billing automation',
      'Retention and upsell triggers',
    ],
    timeSaved: '10-15 hours per week',
    complexity: 'Custom build',
    priceRange: '$4,000-$8,000',
    realExample: 'We built this for a service business with 40+ recurring clients. They went from constant manual coordination to 90% automation.',
    showWhen: (r: QuizResponses) => r.businessModel === 'service_business',
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.businessModel === 'service_business') score += 5;
      if (r.painPoints.includes('payments')) score += 2;
      if (r.painPoints.includes('onboarding')) score += 1;
      return score;
    },
  },
  {
    id: 'operations-command-center',
    name: 'The Operations Command Center',
    description: "The central nervous system for your service business. Team coordination, client status tracking, resource allocation, quality control workflows, and performance reporting—all in one place so you can actually see what's happening in your business.",
    replaces: [
      'Slack messages asking "who\'s working on what?"',
      'Spreadsheets tracking client status',
      'Manual quality checks',
    ],
    includes: [
      'Team coordination and task management',
      'Client status tracking dashboard',
      'Resource allocation automation',
      'Quality control workflows',
      'Performance reporting that updates itself',
    ],
    timeSaved: '8-12 hours per week',
    complexity: 'Custom build',
    priceRange: '$5,000-$10,000',
    realExample: "We built this for a service business with 8 team members. The owner finally knows what's happening without constant check-ins.",
    showWhen: (r: QuizResponses) =>
      r.businessModel === 'service_business' && r.painPoints.includes('team_management'),
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.businessModel === 'service_business') score += 3;
      if (r.painPoints.includes('team_management')) score += 4;
      if (r.dreamState.includes('real_data')) score += 2;
      return score;
    },
  },

  // Systems for Snapshot/Product Sellers
  {
    id: 'product-creation-pipeline',
    name: 'The Product Creation Pipeline',
    description: 'Turn snapshot creation into a productized system. Build workflow with QA checkpoints, auto-generated documentation, customer delivery system, support ticket management, and update distribution—everything you need to create and sell HighLevel systems at scale.',
    replaces: [
      'Building snapshots with no standardized process',
      'Manual documentation creation',
      'Clunky delivery to customers',
    ],
    includes: [
      'Snapshot build workflow with QA checkpoints',
      'Auto-generated documentation system',
      'Customer delivery automation',
      'Support ticket management',
      'Update distribution to all customers',
    ],
    timeSaved: '15-25 hours per product launch',
    complexity: 'Custom build',
    priceRange: '$6,000-$12,000',
    realExample: 'We built this for a course creator selling HighLevel snapshots. They went from 40 hours per snapshot launch to 15 hours.',
    showWhen: (r: QuizResponses) =>
      r.buildingFor === 'snapshots_to_sell' || r.businessModel === 'info_product',
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.buildingFor === 'snapshots_to_sell') score += 5;
      if (r.businessModel === 'info_product') score += 5;
      if (r.investmentLevel === 'snapshot_creation') score += 3;
      return score;
    },
  },
  {
    id: 'launch-fulfillment-engine',
    name: 'The Launch & Fulfillment Engine',
    description: "Everything after someone buys your snapshot. Automated order fulfillment, snapshot delivery, customer onboarding, usage tracking, upsell triggers, and support workflows—turn your snapshot sales into a scalable digital product business.",
    replaces: [
      'Manual snapshot delivery after purchase',
      'Wondering if customers actually implemented it',
      'Missing upsell opportunities',
    ],
    includes: [
      'Instant snapshot delivery after payment',
      'Customer onboarding sequence',
      'Implementation progress tracking',
      'Automated upsell triggers for related products',
      'Support request workflows',
    ],
    timeSaved: '12-20 hours per week',
    complexity: 'Custom build',
    priceRange: '$5,000-$9,000',
    realExample: "We built this for someone selling 3 different HighLevel snapshots. They 5x'd their product revenue without adding support time.",
    showWhen: (r: QuizResponses) => r.buildingFor === 'snapshots_to_sell',
    priority: (r: QuizResponses) => {
      let score = 0;
      if (r.buildingFor === 'snapshots_to_sell') score += 4;
      if (r.businessModel === 'info_product') score += 3;
      if (r.painPoints.includes('onboarding')) score += 1;
      return score;
    },
  },
];

// Get top 3 recommended systems based on responses
export function getRecommendedSystems(responses: QuizResponses): SystemRecommendation[] {
  // Filter systems that should be shown
  const eligibleSystems = systems.filter((system) => system.showWhen(responses));

  // Sort by priority score
  const sortedSystems = eligibleSystems.sort(
    (a, b) => b.priority(responses) - a.priority(responses)
  );

  // Return top 3
  return sortedSystems.slice(0, 3);
}

// Fallback systems if logic doesn't match well
export function getFallbackSystems(responses: QuizResponses): SystemRecommendation[] {
  const systemIds: string[] = [];

  // Always include based on business model
  switch (responses.businessModel) {
    case 'coach':
      systemIds.push('hands-off-client-journey', 'premium-experience-automation');
      break;
    case 'course_creator':
      systemIds.push('evergreen-content-engine', 'hands-off-client-journey');
      break;
    case 'agency':
      systemIds.push('white-label-client-portal', 'agency-operations-backend');
      break;
    case 'service_business':
      systemIds.push('recurring-client-machine', 'operations-command-center');
      break;
    case 'info_product':
      systemIds.push('product-creation-pipeline', 'launch-fulfillment-engine');
      break;
  }

  // Add based on buildingFor
  if (responses.buildingFor === 'snapshots_to_sell') {
    systemIds.push('product-creation-pipeline');
  }
  if (responses.buildingFor === 'agency_clients' || responses.buildingFor === 'both') {
    systemIds.push('white-label-client-portal');
  }

  // Get unique systems
  const uniqueIds = [...new Set(systemIds)];
  const result = uniqueIds
    .map((id) => systems.find((s) => s.id === id))
    .filter((s): s is SystemRecommendation => s !== undefined);

  return result.slice(0, 3);
}
