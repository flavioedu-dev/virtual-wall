import React, { ReactNode } from 'react'
import Image, { StaticImageData } from "next/image";

interface ShowWallProps{
    name: string;
    img: string | StaticImageData
}

const ShowWall = ({name, img}: ShowWallProps) => {
  return (
    <main>
        <Image
            src={img}
            alt="example"
            className="img_example"
            width={400}
            height={400}
        />
        <h2>{name}</h2>
        <p>{"@"+name.toLowerCase()}</p>
    </main>
  )
}

export default ShowWall