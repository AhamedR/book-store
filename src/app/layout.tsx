import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import "@mantine/notifications/styles.css";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/Cart";
import { BookStoreProvider } from "@/providers/bookStoreProvider";
import { Notifications } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Store",
  description: "Discover Your Next Great Read",
  authors: [
    { name: "Ahamed R", url: "https://www.linkedin.com/in/ahamed-rasheed/" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <BookStoreProvider>
          <MantineProvider>
            <Notifications />
            <CartDrawer />
            <NavBar />
            <main>{children}</main>
            <Footer />
          </MantineProvider>
        </BookStoreProvider>
      </body>
    </html>
  );
}
