"use client"

//Image
import perfil from 'public/perfil.png'

//Css
import "./FormGrup.css"

//Components
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

const FormGrup = () => {

  const [imgGrup, setImgGrup] = useState<File|null>(null)
  const [imgGrupUrl, setImgGrupUrl] = useState("")

  return (
    <main>
        <Image
            src={imgGrupUrl}
            alt="example"
            className="img_example"
            width={400}
            height={400}
        />

       <form onSubmit={async (e) => {
          e.preventDefault()

          const formData = new FormData()
          if (imgGrup) {
            formData.append('image', imgGrup);
          } else {
            console.error('imgGrup é nulo. Não é possível anexar ao FormData.');
            return;
          }

          const response = await fetch('/api/upload',{
            method: 'POST',
            body: formData
          })
          const data = await response.json()
          console.log(data)
          setImgGrupUrl(data.url)
       }}>
          <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>)=>{
              const files = e.target.files && e.target.files[0];
              if (files) {
                setImgGrup(files);
                setImgGrupUrl(URL.createObjectURL(files));
              }
          }}/>
          <button>Enviar</button>
       </form>
    </main>
  )
}

export default FormGrup