"use client"
//Importação
import { CldImage } from 'next-cloudinary';

//Image
import perfil from 'public/perfil.png'

//Css
import "./FormGrup.css"

//Components
import Image from "next/image";
import AuthForm from "@/components/Form/AuthForm/AuthForm";
import { AuthInput } from "@/components/Input/AuthInput";
import { ChangeEvent, useState } from "react";

const FormGrup = () => {

    const [nameGrup, setNameGrup] = useState("")
    const [imgGrup, setImgGrup] = useState("")
    const [nameWall, setNameWall] = useState("")

    const handleChanges = {
        handleNameGrup: (e: ChangeEvent<HTMLInputElement>) => {
          setNameGrup(e.currentTarget.value);
        },
        handleNameWall: (e: ChangeEvent<HTMLInputElement>) => {
            setNameWall(e.currentTarget.value);
          },
        handleImgGrup: (e: ChangeEvent<HTMLInputElement>) => {
          setImgGrup(e.currentTarget.value);
        },
      };

      console.log(imgGrup)

  return (
    <main>
        <CldImage
        width="400"
        height="400"
        src={perfil.src}
        alt="Description of my image"
      />
        <AuthForm onSubmit={handle}>
            <div>
            <AuthInput
            type="file"
            name="imgGrup"
            id="imgGrup"
            placeholder=""
            value={imgGrup}
            onchange={handleChanges.handleImgGrup}
            required
          />
            <AuthInput
            type="text"
            name="nameGrup"
            id="nameGrup"
            placeholder="Nome do Grupo"
            value={nameGrup}
            onchange={handleChanges.handleNameGrup}
            required
          />
            </div>
        </AuthForm>
    </main>
  )
}

export default FormGrup