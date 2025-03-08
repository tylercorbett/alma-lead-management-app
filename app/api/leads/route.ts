import { NextResponse } from 'next/server';
import { mockLeads } from '@/app/data/mockLeads';

// In-memory storage for leads (this will reset when server restarts)
let leads = [...mockLeads];

export async function GET() {
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newLead = {
      id: `lead_${Date.now()}`,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      country: body.country,
      linkedinUrl: body.linkedinUrl,
      visaCategory: body.visaCategory,
      message: body.message,
      status: "PENDING",
      submittedAt: new Date().toISOString(),
    };

    leads = [newLead, ...leads];

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 400 }
    );
  }
} 