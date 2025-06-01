import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Vercel Jobs - Find Your Next Opportunity",
  description:
    "Explore the latest job listings powered by Vercel and Next.js, tailored for developers and tech professionals.",
  openGraph: {
    title: "Vercel Jobs - Find Your Next Opportunity",
    description:
      "Explore the latest job listings powered by Vercel and Next.js, tailored for developers and tech professionals.",
    url: "https://yourdomain.com", // Replace with your site URL
    siteName: "Vercel Jobs",
    images: [
      {
        url: "https://yourdomain.com/og-image.png", // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: "Vercel Jobs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercel Jobs - Find Your Next Opportunity",
    description:
      "Explore the latest job listings powered by Vercel and Next.js, tailored for developers and tech professionals.",
    images: ["https://yourdomain.com/twitter-image.png"], // Replace with your Twitter card image URL
    creator: "@yourTwitterHandle", // Optional: your Twitter handle
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Header />
        <Toaster position="top-right" reverseOrder={false} />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
