import React from 'react'

import styles from "./navbar.module.css"

import menuImg from "public/menu.png";
import boardLogoImg from "public/board-logo.png";

import Image from 'next/image'

const Nav = () => {
  return (
    <nav className={styles.nav_container}>
      <Image
        src={menuImg}
        alt="menu-ico"
        style={{objectFit: "contain"}}
      />

      <Image
        src={boardLogoImg}
        alt="board-logo"
      />
    </nav>
  )
}

export default Nav