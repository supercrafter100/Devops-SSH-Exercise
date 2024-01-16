import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/providers/SessionProvider';

const lato = Lato({ subsets: ['latin'], weight: '400', style: 'normal' });

export const metadata: Metadata = {
    title: 'Devops Exercise',
    description: 'Exercise adding public key to machine',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <html lang='en'>
            <body className={lato.className}>
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
