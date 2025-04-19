import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { readChecklists } from '@/lib/db';

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

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const data = await request.json();
  
  // Add user email to the request data
  const userEmail = session?.user?.email || "anonymous@example.com";
  data.userEmail = userEmail;
  
  console.log("Creating checklist with email:", userEmail);
  
  // Rest of your code
  // ...
}