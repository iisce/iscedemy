import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const isCourseRoute = nextUrl.pathname.startsWith('/courses')

    if (isApiAuthRoutes) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoutes && !isCourseRoute) {
        let callBackUrl = nextUrl.pathname
        if (nextUrl.search) {
            callBackUrl += nextUrl.search
        }

        const encodedCallBackUrl = encodeURIComponent(callBackUrl)
        return Response.redirect(new URL(`/login?callBackUrl=${encodedCallBackUrl}`, nextUrl));
    }

    return;
}) 



export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

