import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { readChecklists, createChecklist, ChecklistData } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Get user's email
  const userEmail = session.user.email;
  console.log("Current user email:", userEmail); // Debug info
  
  const allChecklists = await readChecklists();
  
  // Filter checklists to only show those belonging to the current user email
  const userChecklists = {
    checklists: Object.fromEntries(
      Object.entries(allChecklists.checklists).filter(
        ([_, checklist]) => !checklist.userEmail || checklist.userEmail === userEmail
      )
    )
  };
  
  console.log(`Filtered ${Object.keys(allChecklists.checklists).length} checklists down to ${Object.keys(userChecklists.checklists).length} for user ${userEmail}`); // Debug info
  
  return NextResponse.json(userChecklists);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const data: ChecklistData = await req.json();
    const userEmail = session.user.email;
    
    // Add userEmail to the checklist data
    const checklistWithUser: ChecklistData = {
      ...data,
      userEmail,
    };
    
    // Save the checklist to the database
    const newChecklist = await createChecklist(checklistWithUser);
    
    return NextResponse.json(newChecklist);
  } catch (error) {
    console.error('Error creating checklist:', error);
    return NextResponse.json(
      { error: 'Failed to create checklist' },
      { status: 500 }
    );
  }
}