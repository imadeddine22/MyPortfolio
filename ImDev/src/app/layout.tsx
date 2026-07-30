import "../styles/index.scss";
import ThemeProvider from "@/components/provider/ThemeProvider";
import type { Metadata } from "next";

const SITE_URL = "https://imadeddine.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Imad Eddine - Full Stack Developer",
    template: "%s | Imad Eddine",
  },
  description:
    "Full Stack Web Developer | Building modern, responsive, and dynamic web applications with React, Next.js & Node.js",
  metadataBase: new URL(SITE_URL),

  // Open Graph (Facebook, LinkedIn, Discord, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Imad Eddine - Portfolio",
    title: "Imad Eddine - Full Stack Developer",
    description:
      "Full Stack Web Developer | Building modern, responsive, and dynamic web applications",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imad Eddine - Full Stack Developer",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Imad Eddine - Full Stack Developer",
    description:
      "Full Stack Web Developer | Building modern, responsive, and dynamic web applications",
    images: ["/og-image.png"],
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=DM+Sans:wght@400;500;700&family=EB+Garamond:wght@400;500;600;700;800&family=Kufam:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;900&display=swap"
        />
      </head>
      <body suppressHydrationWarning={true} className="scroll-smooth">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
