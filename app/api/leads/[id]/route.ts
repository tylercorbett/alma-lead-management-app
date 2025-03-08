import { NextResponse } from "next/server";
import { mockLeads } from "@/app/data/mockLeads";

// In-memory storage for leads (this will reset when server restarts)
let leads = [...mockLeads];

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;
    const leadId = params.id;

    leads = leads.map((lead) =>
      lead.id === leadId ? { ...lead, status } : lead
    );

    const updatedLead = leads.find((lead) => lead.id === leadId);

    if (!updatedLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json(updatedLead);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 400 }
    );
  }
}
