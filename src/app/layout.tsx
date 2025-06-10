"use client";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // @ts-expect-error this is expected because we are waiting for the browser
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
