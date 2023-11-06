import { GeistSans } from 'geist/font';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { ConvexClientProvider } from '@/components/providers/convex-provider';
import { ModalProvider } from '@/components/providers/model-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Zotion',
  description: 'The connected workspace where magic happens',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ConvexClientProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange storageKey='zotion-theme'>
            <Toaster />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
