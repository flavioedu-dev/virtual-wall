import React from 'react'

import "./auth-styles.css";

type AuthLayoutProps = {
  children: React.ReactNode;
}

const layout = ({children} : AuthLayoutProps) => {
  return (
    <body className='body-auth'>
        {children}
    </body>
  )
}

export default layout