import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistPoppins = Geist({
  variable: "--font-geist-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMontserrat = Geist({
  variable: "--font-geist-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Panel de administración - Luxoria",
  description: "Panel de administración - Luxoria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistMontserrat.variable} ${geistPoppins.variable} antialiased bg-black font-poppins`}
      >
        <AuthProvider>
          <AppProvider>{children}</AppProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
