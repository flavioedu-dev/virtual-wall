"use client";

// CSS
import styles from "./menu.module.css";

// Images
import profileLinkedin from "public/Perfil LinkedIn.png";
import profileImg from "public/perfil.png";
import leafImg from "public/postagens.png";
import configImg from "public/configuracoes.png";
import outImg from "public/sair.png";

// Hooks ans types
import React, { useEffect } from "react";
import Image from "next/image";

type MenuProps = {
  closeMenu: () => void;
};

const Menu = ({ closeMenu }: MenuProps) => {

  useEffect(() => {
    const menu = document.querySelector("aside");
    const menuImg = document.querySelector("nav")?.querySelector("img");

    function closingMenu(e: Event) {
      const targetElement = e.target as Node;
      if (!menu?.contains(targetElement) && !menuImg?.contains(targetElement)) {
        closeMenu();
      }
    }

    document.addEventListener("click", (event) => closingMenu(event));
  }, []);

  const options = [
    {
      id: 1,
      img: profileImg,
      alt: "profile-icon",
      title: "Perfil",
    },
    {
      id: 2,
      img: leafImg,
      alt: "leaf-icon",
      title: "Postagens",
    },
    {
      id: 3,
      img: configImg,
      alt: "config-icon",
      title: "Configurações",
    },
    {
      id: 4,
      img: outImg,
      alt: "out-icon",
      title: "Sair",
    },
  ];

  return (
    <aside className={styles.menu}>
      <div className={styles.inner_container}>
        <section className={styles.profile_container}>
          <Image src={profileLinkedin} alt="profile-linkedin" />
          <h2>Flávio Eduardo</h2>
          <p>@aluno</p>
        </section>

        <section className={styles.options}>
          {options.map((opt) => (
            <div key={opt.id}>
              <Image src={opt.img} alt={opt.alt} />
              <h1>{opt.title}</h1>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
};

export default Menu;
