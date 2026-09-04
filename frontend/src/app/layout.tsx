import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/QueryProvider";
import { AuthProvider } from "@/features/auth/components/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "TechYad - Online Education",
  description: "Learn with the best online courses and classes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
