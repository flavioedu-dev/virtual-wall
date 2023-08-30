import styles from "./authForm-styles.module.css"
import React from 'react'

type AuthFormProps = {
  children: React.ReactNode
}

const AuthForm = ({ children }: AuthFormProps) => {
  return (
    <div className={styles.form_container}>
      <form className={styles.form}>
        {children}
      </form>
    </div>
  )
}

export default AuthForm