import React from 'react'
import Menu from '../../components/Menu/Menu'
import { VirtualProvider } from "@/context/VirtualContext"
type UserLayoutProps = {
  children: React.ReactNode;
}

const layout = ({children} : UserLayoutProps) => {
  return (
    <>
      {/* <Menu /> */}
      <VirtualProvider>
        {children}
      </VirtualProvider>
    </>
  )
}

export default layout