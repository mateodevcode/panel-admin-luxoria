// proxy.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Proxy function para proteger rutas de administración
 * Renombrado de middleware a proxy según las nuevas convenciones de Next.js
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Obtener el token de autenticación
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Si está autenticado e intenta acceder a la raíz, redirigir a /admin
  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Rutas públicas que no requieren autenticación
  const isPublicRoute = pathname === "/" || pathname.startsWith("/api/auth");

  // Si es una ruta pública, permitir acceso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Si intenta acceder a rutas /admin/* sin estar autenticado
  if (pathname.startsWith("/admin")) {
    if (!token) {
      // Redirigir al login si no está autenticado
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verificar que el usuario tenga rol de Admin (case-insensitive)
    const userRole = token.role?.toLowerCase();
    if (userRole !== "admin") {
      // Usuario autenticado pero sin permisos de administrador
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      loginUrl.searchParams.set(
        "message",
        "No tienes permisos de administrador"
      );
      return NextResponse.redirect(loginUrl);
    }

    // Usuario autenticado con rol de Admin, permitir acceso
    return NextResponse.next();
  }

  // Para cualquier otra ruta, permitir acceso
  return NextResponse.next();
}

/**
 * Configuración del matcher para optimizar el rendimiento
 * Solo ejecuta el proxy en las rutas especificadas
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
