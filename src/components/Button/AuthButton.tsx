"use client";

import React, { FormEventHandler }  from 'react'

import styles from "./authButton-styles.module.css";

type AuthButtonProps = {
  children: string;
  authentication: () => void;
}

export const AuthButton = ({ children, authentication } : AuthButtonProps) => {

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={authentication}
    >
      {children}
    </button>
  )
}