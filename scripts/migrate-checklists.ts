import { readChecklists, writeChecklists } from '../lib/db';

/**
 * This script adds a userId field to all existing checklists that don't have one
 * Run this script once to migrate your database
 */
async function migrateChecklists() {
  try {
    // Read current checklists
    const db = await readChecklists();
    
    // Default user ID to assign to orphaned checklists
    const defaultUserId = 'default-admin-user';
    
    // Flag to track if any changes were made
    let changesMade = false;
    
    // Add userId to any checklist that doesn't have one
    for (const key in db.checklists) {
      if (!db.checklists[key].userId) {
        db.checklists[key].userId = defaultUserId;
        changesMade = true;
      }
    }
    
    // If changes were made, write back to database
    if (changesMade) {
      await writeChecklists(db);
      console.log('Successfully added userId to all checklists');
    } else {
      console.log('No changes needed, all checklists already have a userId');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Execute the migration
migrateChecklists();