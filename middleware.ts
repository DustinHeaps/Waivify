import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/waiver", "/api/uploadthing"], // everything else is protected
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // match all routes except static assets
};
