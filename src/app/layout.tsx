'use client'

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import { MyContextProvider } from '../server/MyContext.js'
import { FirebaseProvider } from '../server/MyFirebaseContext.js'



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({


  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <FirebaseProvider>
        <body className={inter.className}>{children}</body>
      </FirebaseProvider>
    </html>
  );
}
