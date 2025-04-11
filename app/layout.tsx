import type { Metadata } from "next";
import { Anton, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font Configurations

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-oswald',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-jetbrainsmono',
});
export const metadata: Metadata = {
  title: "Evan St Pierre",
  description: "Built By Evan St Pierre",
  icons: {
    icon: 'icons/my-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${oswald.variable} ${jetbrains.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="font-[var(--font-oswald)]">
        {children}
      </body>
    </html>
  );
}