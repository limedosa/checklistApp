export async function createChecklist(data: any) {
  // Get session from client-side
  const { data: session } = useSession();
  
  // Make sure email is included
  if (session?.user?.email) {
    data.userEmail = session.user.email;
  }
  
  const response = await fetch('/api/checklists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create checklist');
  }
  
  return response.json();
}