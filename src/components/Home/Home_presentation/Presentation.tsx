import "./presentation.css"
import frame from "public/frame.png"
import Image from "next/image";

const presentation = () => {
  return (
    <main className="all-home">
        <div className="text">
            <h2>Olá, somos o Mural Virtual! Iremos melhorar sua forma de informar e de se informar!</h2>

            <p>Aqui você pode cadastrar seu grupo e assim fazer com que seus integrantes entre nele.</p>
        </div>
        <Image 
          src={frame}
          alt="frame"
          className="frame"
          style={{ objectFit: "contain" }}/>
    </main>
  )
}

export default presentation