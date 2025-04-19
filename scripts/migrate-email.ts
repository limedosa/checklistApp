import { readChecklists, writeChecklists } from '../lib/db';

/**
 * This script adds a userEmail field to all existing checklists
 */
async function migrateToEmailOwnership(defaultEmail: string) {
  try {
    // Read current checklists
    const db = await readChecklists();
    
    // Flag to track if any changes were made
    let changesMade = false;
    let count = 0;
    
    // Add userEmail to any checklist that doesn't have one
    for (const key in db.checklists) {
      if (!db.checklists[key].userEmail) {
        db.checklists[key].userEmail = defaultEmail;
        changesMade = true;
        count++;
      }
      
      // Remove any userId fields that might exist from previous migrations
      if ('userId' in db.checklists[key]) {
        delete db.checklists[key].userId;
        changesMade = true;
      }
    }
    
    // If changes were made, write back to database
    if (changesMade) {
      await writeChecklists(db);
      console.log(`Successfully added userEmail to ${count} checklists using: ${defaultEmail}`);
    } else {
      console.log('No changes needed, all checklists already have a userEmail');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Provide a specific email as argument
// Usage: npx ts-node --project tsconfig.json scripts/migrate-email.ts user@example.com
const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address as argument');
  process.exit(1);
}

migrateToEmailOwnership(email);