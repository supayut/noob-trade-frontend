import Layout from "@/components/Layout";
import './global.scss'

type Props = {
  children: React.ReactNode
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Noob Trader',
  description: 'This project is designed to provide stock traders in Thailand\'s SET market with a suite of tools to help them make more informed trading decisions',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <title>Noob Trader</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="Noob Trader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
