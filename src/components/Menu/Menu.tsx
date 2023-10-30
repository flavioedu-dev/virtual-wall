"use client";

// CSS
import styles from "./menu.module.css";

// Images
import profileLinkedin from "public/perfil.png";
import profileImg from "public/perfil.png";
import leafImg from "public/postagens.png";
import configImg from "public/configuracoes.png";
import outImg from "public/sair.png";

// Hooks ans types
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type MenuProps = {
  closeMenu: () => void;
  imgGroup?: string
};

const Menu = ({ closeMenu, imgGroup }: MenuProps) => {
  const router = useRouter();

  const redirectToPath = (path: string) => {
    router.push(`${path}`)
  }

  useEffect(() => {
    function closingMenu(e: Event) {
      const menu = document.querySelector("aside");
      const menuImg = document.querySelector("nav")?.querySelector("img");
      const targetElement = e.target as Node;

      if (!menu?.contains(targetElement) && !menuImg?.contains(targetElement)) {
        closeMenu();
      }
    }

    document.addEventListener("click", (event) => closingMenu(event));

    return () => {
      document.removeEventListener("click", closingMenu);
    };
  }, []);

  const options = [
    {
      id: 1,
      img: profileImg,
      alt: "profile-icon",
      title: "Perfil",
      path: "/user/profile"
    },
    {
      id: 2,
      img: leafImg,
      alt: "leaf-icon",
      title: "Postagens",
      path: "/user/wall"
    },
    {
      id: 3,
      img: configImg,
      alt: "config-icon",
      title: "Configurações",
      path: "/user/configuration"
    },
    {
      id: 4,
      img: outImg,
      alt: "out-icon",
      title: "Sair",
      path: "/auth/login"
    },
  ];

  return (
    <aside className={styles.menu}>
      <div className={styles.inner_container}>
        <section className={styles.profile_container}>
          <Image src={imgGroup||profileLinkedin.src} alt="profile-linkedin" className="profile-per" width={200} height={200} />
          <h2>Flávio Eduardo</h2>
          <p>@aluno</p>
        </section>

        <section className={styles.options}>
          {options.map((opt) => (
            <div key={opt.id} onClick={() => redirectToPath(opt.path)}>
              <Image src={opt.img} alt={opt.alt}/>
              <h1>{opt.title}</h1>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
};

export default Menu;
