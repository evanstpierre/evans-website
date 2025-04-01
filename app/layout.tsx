import type { Metadata } from "next";
import { Anton, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font Configurations
const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  variable: '--font-anton',
  display: "swap",
});

const oswald = Oswald({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: '--font-oswald',
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: '--font-jetbrainsmono',
  display: "swap",
  style: ["normal", "italic"],
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
    <html lang="en" className={`${anton.variable} ${oswald.variable} ${jetBrainsMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}