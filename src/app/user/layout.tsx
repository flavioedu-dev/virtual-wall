import React from 'react'
import Menu from '../../components/Menu/Menu'
type UserLayoutProps = {
  children: React.ReactNode;
}

const layout = ({children} : UserLayoutProps) => {
  return (
    <>
      {/* <Menu /> */}
      {children}
    </>
  )
}

export default layout