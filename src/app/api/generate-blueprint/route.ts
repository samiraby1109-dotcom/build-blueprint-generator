import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Human-readable labels for the prompt
const businessModelLabels: Record<string, string> = {
  coach: 'Coach or Consultant (works with clients 1:1 or in group programs)',
  course_creator: 'Course Creator / Membership Owner (delivers content and community)',
  agency: 'Agency Owner (provides HighLevel services/systems to clients)',
  service_business: 'Service Business (recurring clients who need consistent experience)',
  info_product: 'Info Product Creator (sells templates, snapshots, or done-for-you systems)',
};

const painPointLabels: Record<string, string> = {
  onboarding: 'Onboarding new clients/students manually',
  payments: 'Chasing payments or sending reminders',
  content_updates: 'Updating content across multiple places',
  reporting: 'Creating reports for clients',
  lead_followup: 'Following up with leads',
  team_management: 'Managing team tasks and communication',
  repetitive_delivery: 'Delivering the same information repeatedly',
  platform_switching: 'Switching between multiple platforms',
};

const dreamStateLabels: Record<string, string> = {
  runs_itself: 'Business runs itself while they focus on high-value work',
  premium_experience: "Clients say 'this is the most professional experience I've had'",
  scale_without_hiring: 'Scale without hiring more people',
  replicate_experience: 'Replicate best client experience for everyone',
  time_freedom: 'Free up 20+ hours a week',
  real_data: "Real data on what's actually working",
};

const platformLabels: Record<string, string> = {
  highlevel_only: 'Just HighLevel (but not using it fully)',
  'highlevel_plus_1-2': 'HighLevel + 1-2 other tools',
  'highlevel_plus_3-5': 'HighLevel + 3-5 other tools',
  'highlevel_plus_6+': 'HighLevel + 6+ tools',
  not_using_highlevel: 'Not using HighLevel yet',
};

const buildingForLabels: Record<string, string> = {
  own_business: 'Their own clients/students - systems for their business',
  agency_clients: 'Agency clients - builds HighLevel systems for other businesses',
  both: 'Both - uses HighLevel for their business AND offers it to clients',
  snapshots_to_sell: 'Future buyers - wants to create snapshots/systems to sell',
};

const experienceLabels: Record<string, string> = {
  white_glove: 'White-glove premium - every touchpoint feels high-end and intentional',
  effortlessly_simple: 'Effortlessly simple - everything just works',
  tech_forward: "Tech-forward impressive - they're wowed by how sophisticated it is",
  community_driven: 'Community-driven connected - they feel part of something bigger',
  results_focused: 'Results-focused efficient - no fluff, just what they need',
};

const investmentLabels: Record<string, string> = {
  premium_asap: 'ASAP premium budget ($5K-$15K)',
  moderate_timeline: 'Next 2-6 months, moderate budget ($3K-$5K)',
  ongoing_retainer: 'Ongoing monthly retainer ($1,500-$4K/month)',
  exploring: 'Just exploring - wants to understand what\'s possible',
  snapshot_creation: 'Wants to build snapshots to sell',
};

const systemLabels: Record<string, string> = {
  'hands-off-client-journey': 'The Hands-Off Client Journey',
  'evergreen-content-engine': 'The Evergreen Content Engine',
  'premium-experience-automation': 'The Premium Experience Automation',
  'white-label-client-portal': 'The White-Label Client Portal',
  'agency-operations-backend': 'The Agency Operations Backend',
  'snapshot-factory-system': 'The Snapshot Factory System',
  'recurring-client-machine': 'The Recurring Client Machine',
  'operations-command-center': 'The Operations Command Center',
  'product-creation-pipeline': 'The Product Creation Pipeline',
  'launch-fulfillment-engine': 'The Launch & Fulfillment Engine',
};

interface GenerateRequest {
  firstName: string;
  businessModel: string | null;
  painPoints: string[];
  dreamState: string[];
  impossibleChallenge: string;
  platformCount: string | null;
  buildingFor: string | null;
  experienceType: string | null;
  investmentLevel: string | null;
  recommendedSystems: string[];
}

export async function POST(request: NextRequest) {
  try {
    const data: GenerateRequest = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('Missing ANTHROPIC_API_KEY');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Build human-readable summary of their answers
    const businessModel = data.businessModel
      ? businessModelLabels[data.businessModel] || data.businessModel
      : 'Not specified';

    const painPoints = data.painPoints
      .map((p) => painPointLabels[p] || p)
      .join('\n  - ');

    const dreamStates = data.dreamState
      .map((d) => dreamStateLabels[d] || d)
      .join('\n  - ');

    const platform = data.platformCount
      ? platformLabels[data.platformCount] || data.platformCount
      : 'Not specified';

    const buildingFor = data.buildingFor
      ? buildingForLabels[data.buildingFor] || data.buildingFor
      : 'Not specified';

    const experience = data.experienceType
      ? experienceLabels[data.experienceType] || data.experienceType
      : 'Not specified';

    const investment = data.investmentLevel
      ? investmentLabels[data.investmentLevel] || data.investmentLevel
      : 'Not specified';

    const systems = data.recommendedSystems
      .map((s) => systemLabels[s] || s)
      .join(', ');

    const systemPrompt = `You are the voice of The Funnel Flippers (TFF) — a partnership between Kylee and Sami. They are HighLevel build experts who create custom automation systems.

VOICE & TONE RULES (follow these exactly):
- Write like you're voice-texting someone while emptying the dishwasher and your kid just asked you something. Real answers, not polished ones.
- Say "we" constantly — Kylee and Sami are a partnership and both co-own TFF equally.
- When something's broken, call it broken. Not "suboptimal" or "needs improvement." Their HighLevel is a hot mess? Say that.
- Be direct, confident, a little irreverent. You've actually done this shit and you know where they're gonna screw it up.
- NO corporate speak. NO buzzwords. NO filler fluff.
- Short sentences. Punchy. Like texting, not writing an essay.
- You can be funny but don't force it. Humor comes from honesty.
- Use "you" and "your" a lot — talk directly to this person.
- Contractions always. "We've" not "we have." "You're" not "you are."
- It's ok to start sentences with "And" or "But" or "Look,"
- Don't use emojis.

IMPORTANT: You are writing about what TFF WOULD build — not what already exists. This is a proposal/blueprint, not a report.

You must return valid JSON only. No markdown, no code fences, no text outside the JSON.`;

    const userPrompt = `Here are the quiz responses from ${data.firstName}:

BUSINESS MODEL: ${businessModel}

PAIN POINTS:
  - ${painPoints || 'None selected'}

DREAM STATE:
  - ${dreamStates || 'None selected'}

"IMPOSSIBLE" CHALLENGE: ${data.impossibleChallenge || 'They skipped this question'}

PLATFORM SITUATION: ${platform}

BUILDING FOR: ${buildingFor}

CLIENT EXPERIENCE STANDARD: ${experience}

INVESTMENT LEVEL: ${investment}

RECOMMENDED SYSTEMS: ${systems}

---

Generate a personalized build blueprint. Return a JSON object with these exact keys:

{
  "personalizedIntro": "2-3 paragraphs written directly to ${data.firstName}. Synthesize ALL their answers into a narrative that shows you actually read and understood their situation. Don't just list back what they said — connect the dots. Show them you see the bigger picture of what's broken and what's possible. Make them feel seen. End with something that makes them want to keep reading.",

  "systemInsights": [
    "One paragraph per recommended system (${data.recommendedSystems.length} total). For each system, explain WHY this specific system matters for THEIR specific situation based on their answers. Connect it to their pain points, their dream state, their business model. Don't just describe the system generically — explain what it would change for THEM specifically."
  ],

  "impossibleResponse": "If they provided an impossible challenge, write 2-3 paragraphs responding directly to what they said. Explain how you'd actually approach building it. Be specific about the HighLevel features or workarounds you'd use. If it's genuinely possible (and most things are), get excited about it. If there are limitations, be honest about them and explain the workaround. If they skipped this question, write something like 'You skipped the impossible question, which either means everything's running perfectly (doubtful) or you haven't let yourself dream big enough yet about what automation can actually do. Next time you catch yourself thinking that can't be automated — text us. Seriously. We live for that stuff.'",

  "closingMessage": "1-2 paragraphs. A direct, personal close. Reference something specific from their answers. Make it clear this isn't a generic template. Push them toward a next step without being salesy. Sign off as Kylee + Sami."
}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    // Extract text from the response
    const textBlock = message.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse the JSON response
    let aiContent;
    try {
      aiContent = JSON.parse(textBlock.text);
    } catch {
      // Try to extract JSON from the response if it has extra text
      const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    return NextResponse.json({
      success: true,
      content: aiContent,
    });
  } catch (error) {
    console.error('Blueprint generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate blueprint' },
      { status: 500 }
    );
  }
}
