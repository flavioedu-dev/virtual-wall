"use client"

import './globals.css'
// import type { Metadata } from 'next';
// import { Provider } from '@/providers';
import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/functions/check-is-public-route';
import {PrivateRoute} from '@/components/PrivateRoute'
import { VirtualProvider } from "@/context/VirtualContext"

// export const metadata: Metadata = {
//   title: "Mural Virtual",
//   description: 'Virtual Wall',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isPublicPage = checkIsPublicRoute(pathname!)

  return (
    <html lang="pt-br">
      <body>
        
        {isPublicPage && (
          <>
            <VirtualProvider>
              {children}
            </VirtualProvider>
          </>
          )}
        {!isPublicPage && (
          <>
            <PrivateRoute>
              {children}
            </PrivateRoute>
            
          </>
        )}
      </body>
    </html>
  )
}
