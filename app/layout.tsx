import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { LeadsProvider } from "./context/LeadsContext";
import { AuthProvider } from "./context/AuthContext";
import StyledComponentsRegistry from "./lib/registry";
import "./lib/disableDevTools";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <LeadsProvider>{children}</LeadsProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
