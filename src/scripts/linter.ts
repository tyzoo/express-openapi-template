import { ESLint } from 'eslint';
import path from 'path';

async function runLinter() {
	// Initialize ESLint with the desired configuration
	const eslint = new ESLint({
		overrideConfigFile: path.resolve(__dirname, "..", '.eslintrc.js'), // Path to your ESLint configuration file
		extensions: ['.ts'],
	});

	// Get all files that should be linted
	const files = await eslint.lintFiles(['./src']); // Update the path to your TypeScript files

	// Log the linting results
	files.forEach(file => {
		console.log(`File:`, file.filePath);
		file.messages.forEach(message => {
			console.log(`Message: `, message);
		});
	});

	// Check for errors and warnings
	const errorCount = files.reduce((sum, file) => sum + file.errorCount, 0);
	const warningCount = files.reduce((sum, file) => sum + file.warningCount, 0);

	// Print summary
	console.log(`\n${errorCount} errors and ${warningCount} warnings found.`);

	// Exit with an error code if there are any errors
	if (errorCount > 0) {
		process.exit(1);
	}
}

runLinter().catch((error) => {
	console.error('Error running ESLint:', error);
	process.exit(1);
});
