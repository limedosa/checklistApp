import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'backend', 'db', 'localChecklist.json');

// Updated type definitions
export type ChecklistItem = {
  id: string;
  name: string;
  files: any[];
};

export type Category = {
  id: string;
  name: string;
  items: ChecklistItem[];
};

export type ChecklistData = {
  name: string;
  categories: Category[];
  isCloned?: boolean | null;
  clonedFrom?: string | null;
  id?: string;
  userEmail?: string; // Changed from userId to userEmail
  created_at?: string;
  updated_at?: string;
};

export type ChecklistsDB = {
  checklists: {
    [key: string]: ChecklistData;
  };
};

// Read all checklists from the JSON file
export async function readChecklists(): Promise<ChecklistsDB> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading checklists from database:', error);
    // Return empty structure if file doesn't exist
    return { checklists: {} };
  }
}

// Write checklists to the JSON file
export async function writeChecklists(data: ChecklistsDB): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing checklists to database:', error);
    throw error;
  }
}

// Get a single checklist by ID
export async function getChecklistById(id: string): Promise<ChecklistData | null> {
  const db = await readChecklists();
  return db.checklists[id] || null;
}

// Create a new checklist
export async function createChecklist(checklist: ChecklistData): Promise<ChecklistData> {
  const db = await readChecklists();
  
  // Generate a new ID (simple incremental ID based on number of entries)
  const newId = Object.keys(db.checklists).length > 0 
    ? (Math.max(...Object.keys(db.checklists).map(Number)) + 1).toString()
    : '1';
  
  const timestamp = new Date().toISOString();
  
  // Create the new checklist with metadata
  const newChecklist: ChecklistData = {
    ...checklist,
    id: newId,
    created_at: timestamp,
    updated_at: timestamp
  };
  
  // Add to database
  db.checklists[newId] = newChecklist;
  
  // Write updated data back to file
  await writeChecklists(db);
  
  return newChecklist;
}

// Update an existing checklist
export async function updateChecklist(id: string, checklist: Partial<ChecklistData>): Promise<ChecklistData | null> {
  const db = await readChecklists();
  
  if (!db.checklists[id]) {
    return null;
  }
  
  // Update the checklist with new data, preserving existing fields
  db.checklists[id] = {
    ...db.checklists[id],
    ...checklist,
    updated_at: new Date().toISOString()
  };
  
  // Write updated data back to file
  await writeChecklists(db);
  
  return db.checklists[id];
}

// Delete a checklist
export async function deleteChecklist(id: string): Promise<boolean> {
  const db = await readChecklists();
  
  if (!db.checklists[id]) {
    return false;
  }
  
  // Remove the checklist
  delete db.checklists[id];
  
  // Write updated data back to file
  await writeChecklists(db);
  
  return true;
}