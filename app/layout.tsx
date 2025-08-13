import '@/app/globals.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import { Header }  from '@/components/Header/Header';
import { Footer }  from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Manage you personal notes',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ 
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />
          {modal}
          <main>
            {children}
          </main>
          <Footer />
        </TanStackProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}