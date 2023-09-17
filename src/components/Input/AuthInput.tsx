"use client"
import styles from "./authInput-styles.module.css";

import React, { ChangeEvent } from "react";

type AuthInputProps = {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
};

export const AuthInput = ({
  type,
  name,
  id,
  placeholder,
  value,
  onchange,
  required
}: AuthInputProps) => {
  return (
    <input
      className={styles.auth_input}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onchange}
      required = {required}
    />
  );
};
