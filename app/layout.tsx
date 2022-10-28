/* eslint-disable @next/next/no-head-element */

import Header from "src/components/Header";
import SEO from "src/components/SEO";
import { EditorProvider } from "src/contexts/EditorContext";
import SupportDialogProvider from "src/contexts/SupportDialogContext";
import { GA_TRACKING_ID } from "src/lib/gtag";
import "styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>CodeToImg</title>

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
