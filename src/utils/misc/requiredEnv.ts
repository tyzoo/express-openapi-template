import dotenv from "dotenv";
dotenv.config();

/**
 * Checks if a list of ENV vars are included, or throws an error
 * @param envVars 
 */
export function requiredEnv(envVars: string[]): void {
    const undefinedVars: string[] = [];
    const emptyVars: string[] = [];
    for (const envVar of envVars) {
        const [,env] = envVar.split(":");
        if(env && env === process.env.NODE_ENV){
            if (!(envVar in process.env)) {
                undefinedVars.push(envVar);
            } else if (process.env[envVar] === '') {
                emptyVars.push(envVar);
            }
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

/**
 * Check required ENV vars for this app
 */
export function checkEnv() {
    requiredEnv([
        "NODE_ENV",
        "PORT:development",
        "APP_NAME",
        "APP_DESCRIPTION",
        "APP_BASE_URL",
        "APP_BASE_PATH",
        "MONGO_URI",
        "REDIS_URI",
        "SECRET_COOKIE_PASSWORD",
        "TESTS_ENABLED",
    ]);
}