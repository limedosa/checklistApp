import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getChecklistById, updateChecklist, deleteChecklist } from '@/lib/db';

// Helper function to check ownership
async function checkOwnership(checklistId: string, userEmail: string) {
  const checklist = await getChecklistById(checklistId);
  
  if (!checklist) {
    return { owned: false, exists: false };
  }
  
  // If the checklist has no userEmail, or the emails match
  return { 
    owned: !checklist.userEmail || checklist.userEmail === userEmail, 
    exists: true, 
    checklist 
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { id } = params;
  const { owned, exists, checklist } = await checkOwnership(id, session.user.email);
  
  if (!exists) {
    return NextResponse.json({ error: 'Checklist not found' }, { status: 404 });
  }
  
  if (!owned) {
    return NextResponse.json({ error: 'You do not have permission to view this checklist' }, { status: 403 });
  }
  
  return NextResponse.json(checklist);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { id } = params;
  const { owned, exists } = await checkOwnership(id, session.user.email);
  
  if (!exists) {
    return NextResponse.json({ error: 'Checklist not found' }, { status: 404 });
  }
  
  if (!owned) {
    return NextResponse.json({ error: 'You do not have permission to update this checklist' }, { status: 403 });
  }
  
  try {
    const data = await req.json();
    const updated = await updateChecklist(id, data);
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating checklist:', error);
    return NextResponse.json(
      { error: 'Failed to update checklist' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { id } = params;
  const { owned, exists } = await checkOwnership(id, session.user.email);
  
  if (!exists) {
    return NextResponse.json({ error: 'Checklist not found' }, { status: 404 });
  }
  
  if (!owned) {
    return NextResponse.json({ error: 'You do not have permission to delete this checklist' }, { status: 403 });
  }
  
  try {
    const success = await deleteChecklist(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete checklist' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting checklist:', error);
    return NextResponse.json(
      { error: 'Failed to delete checklist' },
      { status: 500 }
    );
  }
}