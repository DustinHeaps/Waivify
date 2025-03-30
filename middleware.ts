import { authMiddleware, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/waiver", "/home", "/onboarding", "/api/uploadthing"],
  async afterAuth(auth, req, evt) {
    // const userId = auth.userId;

    // if (!userId) return;

    // const user = await clerkClient.users.getUser(userId);
    // const metadata = user.publicMetadata;

    // if (
    //   req.nextUrl.pathname !== "/onboarding" &&
    //   !metadata?.onboardingComplete
    // ) {
    //   const onboardingUrl = new URL("/onboarding", req.url);
    //   return NextResponse.redirect(onboardingUrl);
    // }

    // if (req.nextUrl.pathname.startsWith("/admin")) {
    //   const role = auth.user?.publicMetadata?.role;
    //   if (role !== "admin") {
    //     return NextResponse.redirect(new URL("/home", req.url));
    //   }
    // }
  },
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // match all routes except static assets
};
