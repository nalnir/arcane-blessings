const fs = require('fs');

// Read the TypeScript file
const filePath = 'src/blessings.ts'; // Replace with your file path
const fileContent = fs.readFileSync(filePath, 'utf8');

// Regular expression to match export statements
const exportRegex = /export\s+(class|function|const|let|var)\s+(\w+)/g;

// Extract and sort export statements
const sortedExports = fileContent.match(exportRegex).sort();

// Replace the original export statements with sorted exports
const sortedFileContent = fileContent.replace(exportRegex, () => sortedExports.shift());

// Write the sorted content back to the file
fs.writeFileSync(filePath, sortedFileContent);

console.log('Exports sorted alphabetically.');