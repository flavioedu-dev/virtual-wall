import React from 'react'

import "./auth-styles.css";
import { VirtualProvider } from "@/context/VirtualContext"

type AuthLayoutProps = {
  children: React.ReactNode;
}

const layout = ({children} : AuthLayoutProps) => {
  return (
    <body className='body-auth'>
      <VirtualProvider>
        {children}
      </VirtualProvider>
    </body>
  )
}

export default layout