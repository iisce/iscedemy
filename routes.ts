/**
 * These routes doesn't require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/about",
    "/contact",
    "/courses",
    "/register"
]


/**
 * These are array of routes that requires authentication
 * These routes wil redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/sign-up",
    "/error"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/courses"