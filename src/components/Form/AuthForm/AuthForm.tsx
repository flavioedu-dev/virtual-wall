import styles from "./authForm-styles.module.css"
import React, { FormEvent } from 'react'

interface AuthFormProps {
  children: React.ReactNode;
  onSubmit: () => Promise<void>;
}

const AuthForm = ({ children, onSubmit }: AuthFormProps) => {
  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  )
}

export default AuthForm