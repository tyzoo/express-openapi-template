import fs from "fs";
import path from "path";

/**
 * Recursive function to load controllers from a directory and its subdirectories.
 * @param {string} dir - Directory to load controllers from.
 * @returns {number} - Number of controllers loaded.
 */
function loadControllersFromDir(dir: string): number {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let count = 0;
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			count += loadControllersFromDir(fullPath);
		} else if (
			(entry.name.endsWith(".ts") || entry.name.endsWith(".js")) &&
			entry.name.includes("Controller") &&
			!entry.name.endsWith(".d.ts")
		) {
			require(fullPath);
			count++;
		}
	}
	return count;
}

/**
 * Load controllers
 * @returns {number} - Number of controllers loaded.
 */
export function controllerLoader(): number {
	const controllersDir = path.join(__dirname, "..", "..", "controllers");
	return loadControllersFromDir(controllersDir);
}
