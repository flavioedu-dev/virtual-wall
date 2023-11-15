"use client";

// CSS
import styles from "./menu.module.css";

// Images
import profileImg from "public/perfil.png";
import leafImg from "public/postagens.png";
import outImg from "public/sair.png";
import home from "public/botao-home.png"
import group from "public/grupoA.png"

// Hooks ans types
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/VirtualContext";

type MenuProps = {
  closeMenu: () => void;
  imgGroup?: string
};

const Menu = ({ closeMenu, imgGroup }: MenuProps) => {
  const router = useRouter();

  const {handleNameChange, infor} = useUserContext()
  // const [namewall, setNameWall] = useState()

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
      img: home,
      alt: "Home-icon",
      title: "Home",
      path: "/user/home"
    },
    {
      id: 2,
      img: profileImg,
      alt: "profile-icon",
      title: "Perfil",
      path: "/user/profile"
    },
    {
      id: 3,
      img: group,
      alt: "group-icon",
      title: "Groups",
      path: "/user/home-Group"
    },
    {
      id: 4,
      img: leafImg,
      alt: "leaf-icon",
      title: "Posts",
      path: "/user/wall"
    },
    {
      id: 5,
      img: outImg,
      alt: "out-icon",
      title: "Exit",
      path: "/auth/login"
    }
  ];

  return (
    <aside className={styles.menu}>
      <div className={styles.inner_container}>
        <section className={styles.profile_container}>
          <Image src={infor?.imgUser || infor?.group?.imageGroup! || profileImg} alt="profile-linkedin" className="profile-per" width={200} height={200} />
          <h2>{infor?.name}</h2>
          <p>@{infor?.name.toUpperCase()}</p>
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
