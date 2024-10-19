import { PropsWithChildren } from "react";
import { Metadata, Viewport } from "next";
import {
  SITE_DESCRIPTION,
  SITE_DOMAIN,
  SITE_NAME,
  SITE_URL,
  SOCIAL_TWITTER,
} from "@/utils/site";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import PlausibleProvider from "next-plausible";
import "@/assets/globals.css";

export const metadata: Metadata = {
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  metadataBase: new URL(SITE_URL),
  description: SITE_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    title: SITE_NAME,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: "/opengraph-image",
  },
  twitter: {
    card: "summary_large_image",
    site: SOCIAL_TWITTER,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: "/opengraph-image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1.0,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function Layout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain={SITE_DOMAIN} />
        <link rel="icon" href="favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/icons/apple-touch-icon.png"
          type="image/png"
          sizes="any"
        />
      </head>
      <body>
        <main className="container mx-auto flex flex-col min-h-screen items-center">
          <Navbar />

          <div className="mb-auto">{props.children}</div>

          <Footer className="my-4" />
        </main>
      </body>
    </html>
  );
}
