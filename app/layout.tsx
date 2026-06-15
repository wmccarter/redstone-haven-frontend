import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redstone Haven LLC",
  description: "Embark on the Frontier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: '#020617' }}>
      <body 
        style={{ 
          backgroundColor: '#020617', 
          color: '#e2e8f0', 
          margin: 0, 
          fontFamily: 'monospace' 
        }} 
        className="antialiased min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
