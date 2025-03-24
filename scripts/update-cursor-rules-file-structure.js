// scripts/update-cursor-rules-file-structure.js
// This script updates the file structure documentation in .cursorrules
// It runs the tree command and replaces the relevant section in the rules file

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the rules file
const rulesFilePath = path.join(__dirname, '..', '.cursorrules');

try {
  // Run tree command with limited depth and increased buffer size
  // -L 3 limits depth to 3 levels (adjust as needed)
  const treeOutput = execSync(
    'tree -a -L 3 -I "node_modules|.git|.expo|.DS_Store|*.lock|dist|build|coverage"',
    { maxBuffer: 10 * 1024 * 1024 }, // 10MB buffer
  ).toString();

  // Read the current rules file
  const rulesContent = fs.readFileSync(rulesFilePath, 'utf8');

  // Replace the file structure section
  const newRulesContent = rulesContent.replace(/# CURRENT FILE STRUCTURE[\s\S]*?----/, `# CURRENT FILE STRUCTURE\n${treeOutput}\n----`);

  // Write the updated content back
  fs.writeFileSync(rulesFilePath, newRulesContent);

  console.log('✅ File structure updated successfully!');
} catch (error) {
  console.error('❌ Error updating file structure:', error.message);
  process.exit(1);
}
