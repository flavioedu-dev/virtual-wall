"use client";

// CSS
import styles from "./navbar.module.css"

// Images
import menuImg from "public/menu.png";
import boardLogoImg from "public/board-logo.png";
import Image from 'next/image'
import Menu from '../Menu/Menu';

// Hooks and types
import React, { useState } from 'react'

const Nav = () => {

  const [stateMenu, setStateMenu] = useState<boolean>(false);

  const openMenu = () => {
    setStateMenu(true);
  }

  const closeMenu = () => {
    setStateMenu(false);
  }

  return (
    <nav className={styles.nav_container} >
      <Image
        src={menuImg}
        alt="menu-ico"
        style={{objectFit: "contain"}}
        onClick={openMenu}
      />

      <Image
        src={boardLogoImg}
        alt="board-logo"
      />

      {stateMenu && <Menu closeMenu={closeMenu} />}
    </nav>
  )
}

export default Nav