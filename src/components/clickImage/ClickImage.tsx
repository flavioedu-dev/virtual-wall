import { ChangeEvent, useRef, useState } from 'react'
import Image, { StaticImageData } from "next/image";
  
  interface ClickImageProps {
    onImageSelect: (imageInfo: File) => void;
    img: StaticImageData|string;
    id: string
  }

const ClickImage:React.FC<ClickImageProps>= ({onImageSelect, img, id}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleImageClick = () =>{
        if(inputRef.current){
            inputRef.current.click()
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files && e.target.files[0];
        if (files) {
        onImageSelect(files)
        }
    }

  return (
    <main>
        <Image
            src={img}
            alt="img icon"
            className="img_icon"
            onClick={handleImageClick}
            style={{cursor:'pointer'}}
            id={id}
            width={50}
            height={50}
        />
        <input type="file" onChange={handleImageChange} ref={inputRef} style={{display:'none'}}/>
        
    </main>
  )
}

export default ClickImage

function onImageSelect(list: { image: File | null; imageUrl: string; }) {
    throw new Error('Function not implemented.');
}
