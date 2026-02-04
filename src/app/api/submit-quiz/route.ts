import { NextRequest, NextResponse } from 'next/server';

const HIGHLEVEL_API_URL = 'https://services.leadconnectorhq.com';

interface QuizSubmission {
  // User info
  firstName: string;
  email: string;
  phone?: string;

  // Quiz responses
  businessModel: string | null;
  painPoints: string[];
  dreamState: string[];
  impossibleChallenge: string;
  platformCount: string | null;
  buildingFor: string | null;
  experienceType: string | null;
  investmentLevel: string | null;

  // Result info
  resultId: string;
  recommendedSystems: string[];
}

// Map values to human-readable labels for HighLevel
const businessModelLabels: Record<string, string> = {
  coach: 'Coach or Consultant',
  course_creator: 'Course Creator/Membership Owner',
  agency: 'Agency Owner',
  service_business: 'Service Business',
  info_product: 'Info Product Creator',
};

const painPointLabels: Record<string, string> = {
  onboarding: 'Onboarding manually',
  payments: 'Chasing payments',
  content_updates: 'Updating content',
  reporting: 'Creating reports',
  lead_followup: 'Following up with leads',
  team_management: 'Managing team',
  repetitive_delivery: 'Repetitive delivery',
  platform_switching: 'Platform switching',
};

const investmentLabels: Record<string, string> = {
  premium_asap: 'Premium ASAP ($5K-$15K)',
  moderate_timeline: 'Moderate 2-6 months ($3K-$5K)',
  ongoing_retainer: 'Ongoing retainer ($1.5K-$4K/mo)',
  exploring: 'Just exploring',
  snapshot_creation: 'Snapshot creation',
};

const systemLabels: Record<string, string> = {
  'hands-off-client-journey': 'Hands-Off Client Journey',
  'evergreen-content-engine': 'Evergreen Content Engine',
  'premium-experience-automation': 'Premium Experience Automation',
  'white-label-client-portal': 'White-Label Client Portal',
  'agency-operations-backend': 'Agency Operations Backend',
  'snapshot-factory-system': 'Snapshot Factory System',
  'recurring-client-machine': 'Recurring Client Machine',
  'operations-command-center': 'Operations Command Center',
  'product-creation-pipeline': 'Product Creation Pipeline',
  'launch-fulfillment-engine': 'Launch & Fulfillment Engine',
};

export async function POST(request: NextRequest) {
  try {
    const data: QuizSubmission = await request.json();

    const apiKey = process.env.HIGHLEVEL_API_KEY;
    const locationId = process.env.HIGHLEVEL_LOCATION_ID;

    if (!apiKey || !locationId) {
      console.error('Missing HighLevel configuration');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Format quiz data for notes
    const painPointsFormatted = data.painPoints
      .map((p) => painPointLabels[p] || p)
      .join(', ');

    const systemsFormatted = data.recommendedSystems
      .map((s) => systemLabels[s] || s)
      .join(', ');

    const quizNotes = `
=== Build Blueprint Quiz Results ===

Business Model: ${data.businessModel ? businessModelLabels[data.businessModel] || data.businessModel : 'Not specified'}

Pain Points: ${painPointsFormatted || 'None selected'}

Dream State: ${data.dreamState.join(', ') || 'None selected'}

"Impossible" Challenge: ${data.impossibleChallenge || 'Not provided'}

Platform Count: ${data.platformCount || 'Not specified'}

Building For: ${data.buildingFor || 'Not specified'}

Experience Type: ${data.experienceType || 'Not specified'}

Investment Level: ${data.investmentLevel ? investmentLabels[data.investmentLevel] || data.investmentLevel : 'Not specified'}

=== Recommended Systems ===
${systemsFormatted}

Blueprint URL: ${process.env.NEXT_PUBLIC_APP_URL || ''}/blueprint/${data.resultId}
    `.trim();

    // Create/update contact in HighLevel
    const contactPayload = {
      firstName: data.firstName,
      email: data.email,
      phone: data.phone || undefined,
      locationId: locationId,
      tags: ['[LM] Build Blueprint Generator'],
      source: 'Build Blueprint Generator',
      customFields: [
        // You can add custom field mappings here if you have them set up in HighLevel
        // { id: 'your_custom_field_id', value: data.businessModel }
      ],
    };

    // First, try to find existing contact by email
    const searchResponse = await fetch(
      `${HIGHLEVEL_API_URL}/contacts/search/duplicate?locationId=${locationId}&email=${encodeURIComponent(data.email)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
      }
    );

    let contactId: string | null = null;

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      if (searchData.contact?.id) {
        contactId = searchData.contact.id;
      }
    }

    if (contactId) {
      // Update existing contact - add tag and update notes
      const updateResponse = await fetch(
        `${HIGHLEVEL_API_URL}/contacts/${contactId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: data.firstName,
            phone: data.phone || undefined,
            tags: ['[LM] Build Blueprint Generator'],
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error('HighLevel update error:', errorText);
      }

      // Add note with quiz results
      await fetch(`${HIGHLEVEL_API_URL}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: quizNotes,
        }),
      });
    } else {
      // Create new contact
      const createResponse = await fetch(`${HIGHLEVEL_API_URL}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactPayload),
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error('HighLevel create error:', errorText);
        return NextResponse.json(
          { error: 'Failed to create contact' },
          { status: 500 }
        );
      }

      const createData = await createResponse.json();
      contactId = createData.contact?.id;

      // Add note with quiz results
      if (contactId) {
        await fetch(`${HIGHLEVEL_API_URL}/contacts/${contactId}/notes`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: quizNotes,
          }),
        });
      }
    }

    return NextResponse.json({
      success: true,
      contactId,
      message: 'Contact created/updated successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
