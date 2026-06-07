import { auth } from "@/auth";

export default auth((req) => {
  const reqUrl = new URL(req.url);
  const isAuthenticated = !!req.auth;

  // Protect backoffice route of Exercici 3
  if (reqUrl.pathname.startsWith("/exercici3/backoffice")) {
    if (!isAuthenticated) {
      return Response.redirect(new URL("/exercici3/auth/login", req.url));
    }
    
    const role = (req.auth?.user as any)?.role;
    if (role !== "EDITOR" && role !== "ADMIN") {
      return Response.redirect(new URL("/exercici3?error=AccesDenegat", req.url));
    }
  }
});

export const config = {
  matcher: ["/exercici3/backoffice/:path*"],
};
