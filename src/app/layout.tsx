import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./myComponents/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "./myComponents/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Management app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Toaster
        position="top-center"
        reverseOrder={false}
        />
        <Navbar/>
        {children}
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
