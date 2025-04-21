import { readChecklists, writeChecklists } from '../lib/db';

/**
 * This script assigns all checklists to a specific user ID
 */
async function assignChecklists(specificUserId: string) {
  try {
    // Read current checklists
    const db = await readChecklists();
    
    // Flag to track if any changes were made
    let changesMade = false;
    let count = 0;
    
    // Assign all checklists to the specified user
    for (const key in db.checklists) {
      db.checklists[key].userId = specificUserId;
      changesMade = true;
      count++;
    }
    
    // If changes were made, write back to database
    if (changesMade) {
      await writeChecklists(db);
      console.log(`Successfully assigned ${count} checklists to user ID: ${specificUserId}`);
    } else {
      console.log('No checklists found to assign');
    }
  } catch (error) {
    console.error('Assignment failed:', error);
  }
}

// Provide a specific user ID as argument
// Usage: npx ts-node --project tsconfig.json scripts/assign-checklists.ts USER_ID_HERE
const userId = process.argv[2];
if (!userId) {
  console.error('Please provide a user ID as argument');
  process.exit(1);
}

assignChecklists(userId);