import React from 'react'

import "./auth-styles.css";

type AuthLayoutProps = {
  children: React.ReactNode;
}

const layout = ({children} : AuthLayoutProps) => {
  return (
    <body>
      {children}
    </body>
  )
}

export default layout