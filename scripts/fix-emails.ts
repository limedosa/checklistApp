import fs from 'fs';
import path from 'path';

// Get the email from command line arguments or use default
const userEmail = process.argv[2] || 'ld104@wellesley.edu';
const dbPath = path.join(process.cwd(), 'backend', 'db', 'localChecklist.json');

try {
  // Read the current database
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  let updatedCount = 0;
  
  // Update anonymous emails
  Object.keys(data.checklists).forEach(id => {
    if (data.checklists[id].userEmail === 'anonymous@example.com') {
      data.checklists[id].userEmail = userEmail;
      updatedCount++;
    }
  });
  
  // Write the updated data back
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  
  console.log(`Updated ${updatedCount} checklists with email: ${userEmail}`);
} catch (error) {
  console.error('Failed to update emails:', error);
}