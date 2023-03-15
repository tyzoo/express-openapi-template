export function requiredEnv(envVars: string[]): void {
    const undefinedVars: string[] = [];
    const emptyVars: string[] = [];
    for (const envVar of envVars) {
        if (!(envVar in process.env)) {
            undefinedVars.push(envVar);
        } else if (process.env[envVar] === '') {
            emptyVars.push(envVar);
        }
    }
    if (undefinedVars.length > 0 || emptyVars.length > 0) {
        let errorMessage = '';
        if (undefinedVars.length > 0) {
            errorMessage += `The following environment variables are not defined: ${undefinedVars.join(', ')}.\n`;
        }
        if (emptyVars.length > 0) {
            errorMessage += `The following environment variables are empty: ${emptyVars.join(', ')}.`;
        }
        throw new Error(errorMessage);
    }
}