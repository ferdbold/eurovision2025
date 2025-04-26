import React from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "En attendant l'Eurovision"
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="fr">
      <body className="font-regular antialiased">
        {children}
      </body>
    </html>
  );
}
