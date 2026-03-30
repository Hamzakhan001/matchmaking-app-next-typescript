import { auth } from "@/match-app/lib/auth";
import { authRoutes, publicRoutes } from "@/match-app/lib/routes";
import { NextResponse } from "next/server";

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isPublicRoute) {
        return NextResponse.next();
    }
    if(isAuthRoute) {
        if(isLoggedIn) {
            return NextResponse.redirect(new URL('/members', nextUrl));
        }
        return NextResponse.next();
    }

    if(!isPublicRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
       '/((?!api|_next/static|favicon.ico).*)' 
    ]
}