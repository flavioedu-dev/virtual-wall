"use client";

import React, { FormEventHandler }  from 'react'

import styles from "./authButton-styles.module.css";

type AuthButtonProps = {
  children: string;
  authentication: () => void;
  id?: string;
}

export const AuthButton = ({ children, authentication, id } : AuthButtonProps) => {

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={authentication}
      id={id}
    >
      {children}
    </button>
  )
}