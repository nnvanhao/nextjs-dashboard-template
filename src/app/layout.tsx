"use client";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

// export const metadata: Metadata = {
//   metadataBase: new URL(
//     process.env.APP_URL
//       ? `${process.env.APP_URL}`
//       : process.env.VERCEL_URL
//       ? `https://${process.env.VERCEL_URL}`
//       : `http://localhost:${process.env.PORT || 3000}`
//   ),
//   title: "shadcn/ui sidebar",
//   description:
//     "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
//   alternates: {
//     canonical: "/"
//   },
//   openGraph: {
//     url: "/",
//     title: "shadcn/ui sidebar",
//     description:
//       "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
//     type: "website"
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "shadcn/ui sidebar",
//     description:
//       "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness."
//   }
// };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current pathname

  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {isAuthRoute ? (
            <div className="h-screen w-full">{children}</div>
          ) : (
            <AdminPanelLayout>{children}</AdminPanelLayout>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
