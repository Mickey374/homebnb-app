import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homebnb",
  description: "Airbnb Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Modal actionLabel="Submit" title="Hello Mike" isOpen/>
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
