"use client";

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Quicksand } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COOKIE } from "@/constants/common";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";

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
//👇 Configure our font object
const openSans = Quicksand({
  subsets: ["vietnamese"],
  display: "swap"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();

  const isAuthRoute = pathname.startsWith("/auth");
  // Create a client
  const queryClient = new QueryClient();

  const token = Cookies.get(COOKIE.TOKEN);

  useEffect(() => {
    const unProtectedRouters = [
      "/",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/otp"
    ];

    if (!token && !unProtectedRouters.includes(pathname)) {
      router.push("/auth/login");
    }
    setIsLoading(false);
  }, [pathname, router, token]);

  if (isLoading) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={openSans.className}>
          <div className="w-full h-screen flex items-center justify-center">
            <LoaderIcon className="animate-spin" />
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <QueryClientProvider client={queryClient}>
            {isAuthRoute ? (
              <div className="h-screen w-full">{children}</div>
            ) : token ? (
              <AdminPanelLayout>{children}</AdminPanelLayout>
            ) : (
              children
            )}
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
