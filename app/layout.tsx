import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import Link from 'next/link';
import { cn } from '@/components/ui/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import ThemeProvider from '@/components/ThemeToggle/theme-provider';
import ThemeToggle from '@/components/ThemeToggle/theme-toggle';

export const metadata: Metadata = {
  title: 'LOG410',
  description: 'LOG410 - Laboratoire'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const nav = [
    { name: 'Dashboard', href: '#' },
    { name: 'Primes', href: '#' },
    { name: 'Badge', href: '#', isActive: true },
    { name: 'Profiles', href: '#' }
  ];

  return (
    <html
      lang="en"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body className={'h-screen w-screen overflow-hidden bg-background'}>
          <NextTopLoader showSpinner={false} />
          <Toaster />

          <div className="h-16 border-b border-border bg-card text-foreground">
            <div className="mx-auto flex h-full w-full max-w-4xl items-center justify-between px-4">
              <div>
                <h1 className="text-2xl font-bold">LOG410</h1>
              </div>

              <div className="flex items-center justify-center gap-8">
                {nav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'font-medium text-foreground',
                      item.isActive && 'font-bold text-primary'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Select value="EN">
                  <SelectTrigger className="flex-1">
                    <SelectValue defaultValue={'EN'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FR">
                      <span>Français</span>
                    </SelectItem>
                    <SelectItem value="EN">
                      <span>Anglais</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
