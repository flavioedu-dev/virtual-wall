import './globals.css'
import type { Metadata } from 'next';
import { Provider } from '@/providers';

export const metadata: Metadata = {
  title: "Mural Virtual",
  description: 'Virtual Wall',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
  )
}
