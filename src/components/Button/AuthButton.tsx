"use client";

import React, { ButtonHTMLAttributes, DetailedHTMLProps, FormEventHandler }  from 'react'

import styles from "./authButton-styles.module.css";

type AuthButtonProps = {
  children: string;
  authentication: () => void;
  id?: string;
  type?:"button" | "submit" | "reset" | undefined;
}

export const AuthButton = ({ children, authentication, id, type } : AuthButtonProps) => {

  return (
    <button
      type={type}
      className={styles.btn}
      onClick={authentication}
      id={id}
    >
      {children}
    </button>
  )
}