"use client";

// CSS
import styles from "./navbar.module.css";

// Images
import menuImg from "public/menu.png";
import boardLogoImg from "public/board-logo.png";
import Image from "next/image";
import Menu from "../Menu/Menu";

// Hooks and types
import React, { FormEvent, useEffect, useState } from "react";

//type
type NavProps = {
  ImageGroup: string;
}

const Nav = ({ImageGroup}:NavProps) => {
  const [stateMenu, setStateMenu] = useState<boolean>(false);
  const [size, setSize] = useState<number>(600);
  const [imgGroup, setImgGroup] = useState()

  const openMenu = () => {
    setStateMenu(true);
  };

  const closeMenu = () => {
    setStateMenu(false);
  };



  useEffect(() => {
    function resizing() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", resizing);

    resizing();

    return () => {
      window.removeEventListener("resize", resizing);
    };
  }, []);

  return (
    <header>
      <nav className={styles.nav_container}>
      <Image
          src={menuImg}
          alt="menu-ico"
          style={{ objectFit: "contain" }}
          onClick={openMenu}
        />

      <Image src={boardLogoImg} alt="board-logo" />

        {stateMenu === true || size >= 700 ? (
          <Menu closeMenu={closeMenu} imgGroup={ImageGroup}/>
        ) : null}
      </nav>
    </header>
  );
};

export default Nav;
