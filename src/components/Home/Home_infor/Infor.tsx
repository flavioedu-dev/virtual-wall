import "./Infor.css"
import group from "public/example.png";
import Image from "next/image";
const Infor = () => {
  return (
    <main className="all-info-I">
        <div className="text-in">
            <h2>Entre no seu mural e informe seus companheiros.</h2>
            <p>Você pode criar um grupo geral, mas também pode entrar em um grupo já feito</p>
            <p>Lembre-se de entrar no seu mural, para que seus companheiros fiquem informados.</p>
            <p>Grupo é todo geral, mas os murais são as categorias dentro do grupo.</p>
            <p>Não esqueça de repassar o código do seu grupo!</p>
        </div>
        <Image
            src={group}
            alt="example"
            className="img_example-I"
            style={{ objectFit: "contain" }}
            />
    </main>
  )
}

export default Infor