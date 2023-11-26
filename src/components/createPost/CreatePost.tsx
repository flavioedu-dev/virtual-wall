import "./CreatePost.css"

import Image from "next/image";
import ClickImage from '@/components/clickImage/ClickImage';
import lupa from "public/lupa.png";
import buttonPost from "public/1682023337196.png";
import arq from "public/anexo.png";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Posts from "../Posts/Posts";
import { namewall, user } from "@/context/VirtualContext";
import { useRouter } from "next/navigation";


interface ShowPostProps{
    name: string;
    img: string;
    idwall: string;
    idUserGroup: string;
    idUser: user;
    codGroup: string;
    nameWall: string
}

const CreatePost = ({name, img, idwall, idUserGroup, idUser, codGroup, nameWall}:ShowPostProps) =>{

    const [arqfileImg, setArqFileImg] = useState<File[]>([])
    const [arqfileDoc, setArqFileDoc] = useState<File[]>([])
    const [arqfileVid, setArqFileVid] = useState<File[]>([])
    const [text, setText] = useState("")
    const [see, setSee] = useState(false)

    //list arq
    const [arqfileImgList, setArqFileImgList] = useState<string[]>([])
    const [arqfileDocList, setArqFileDocList] = useState<string[]>([])
    const [arqfileVidList, setArqFileVidList] = useState<string[]>([])

    //User verification
    const [postPubli, setPostPubli] = useState(false)

    //rotas
    const router = useRouter()

    useEffect(()=>{
        
        if(idUser){
            
            idUser.nameWall?.map((item)=>{
                
                if(item.codGroup == codGroup){
                    
                    if(nameWall == item.namewall || idUser.isAdmin == true){
                        
                        setPostPubli(true)
                    }
                }
            })
        }


        //Teste
        if(arqfileDoc || arqfileImg || arqfileVid){
            console.log("Entrou em todos")
            if(arqfileDoc.length !== 0 && arqfileImg.length !== 0){
                console.log(1)
                if(arqfileDocList.length == arqfileDoc.length && arqfileImgList.length == arqfileImg.length){
                    addpost(idUserGroup, text, arqfileDocList, arqfileImgList, arqfileVidList, idUser.id!, idwall )
                }
            }else if(arqfileDoc.length !== 0 && arqfileVid.length !== 0){
                console.log(2)
                if(arqfileDocList.length == arqfileDoc.length && arqfileVidList.length == arqfileVid.length){
                    addpost(idUserGroup, text, arqfileDocList, arqfileImgList, arqfileVidList, idUser.id!, idwall )
                }

            }else if(arqfileImg.length !== 0 && arqfileVid.length !== 0){
                console.log(3)
                if(arqfileImgList.length == arqfileImg.length && arqfileVidList.length == arqfileVid.length){
                    addpost(idUserGroup, text, arqfileDocList, arqfileImgList, arqfileVidList, idUser.id!, idwall )
                    
                }
            }else if(arqfileImg.length !== 0 && arqfileVid.length !== 0 && arqfileVid.length !== 0){
                console.log(4)
                if(arqfileDocList.length == arqfileDoc.length && arqfileImgList.length == arqfileImg.length && arqfileVidList.length == arqfileVid.length){
                    addpost(idUserGroup, text, arqfileDocList, arqfileImgList, arqfileVidList, idUser.id!, idwall )
                }
            }else{
                console.log("Passou no só")
                if(arqfileDoc.length !== 0){
                    if(arqfileDocList.length == arqfileDoc.length){
                    addpost(idUserGroup, text, arqfileDocList, arqfileImgList, arqfileVidList, idUser.id!, idwall )
                }
                }else if(arqfileImg.length !== 0){
                    if(arqfileImgList.length == arqfileImg.length){
                        addpost(idUserGroup, text, arqfileDocList, arqfileImgList, arqfileVidList, idUser.id!, idwall )
                        }
                }else if(arqfileVid.length !==0){
                    if(arqfileVidList.length == arqfileVid.length){
                        addpost(idUserGroup, text, arqfileDocList, arqfileImgList, arqfileVidList, idUser.id!, idwall )
                        }
                }
            }
        }
        

        
    },[codGroup, idUser, nameWall, arqfileDocList, arqfileImgList, arqfileVidList])

    //Pesq
    const [valuePesq, setValuePesq] = useState(true)

    //Lupa
    const [uplupa, setUpLupa] = useState(true)

    //addPost
    const addpost = async (idUser:string, text:string, doc:string[], image:string[], video:string[], idUserP:string, idwall:string) => {
        try {
          const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idUser,
              text,
              doc,
              video,
              image,
              idUserP,
              idwall
            }),
          });
      
          if (response.ok) {
            const newWall = await response.json();
            console.log(newWall)
          } else {
            
            console.error('Erro ao adicionar wall:', response.status);
          }
        } catch (error) {
          console.error('Erro de rede:', error);
        }
        setText("")
        setArqFileVid([])
        setArqFileImg([])
        setArqFileDoc([])
        setArqFileVidList([])
        setArqFileImgList([])
        setArqFileDocList([])
        router.refresh()
      };

    const handleChanges = {
        handleText: (e: ChangeEvent<HTMLTextAreaElement>) => {
          setText(e.currentTarget.value);
        },
    }

    const inputEle = document.getElementById('enter')
    inputEle?.addEventListener("keydown", function (event){
        if (event.key === "Enter") {
            console.log("Chama")
        }
    })

    const changeLupa = () =>{
        setUpLupa(false)
    }

    const changeLupaBlur = () =>{
        setTimeout(() => {
            setUpLupa(true)
        }, 1000);
    }


    const handleImageSelect = (File: File) => {
        console.log(File.type)
        if (File.type === 'image/png' || File.type === 'image/jpeg' || File.type === 'image/web' || File.type === 'image/avif') {
            setArqFileImg((prevFiles) => [...(prevFiles || []), File]);
            
        } else if (File.type === 'application/pdf') {
            setArqFileDoc((prevFiles) => [...(prevFiles || []), File]);
            
        } else if (File.type === 'video/mp4') {
            setArqFileVid((prevFiles) => [...(prevFiles || []), File]);
            
        }
    };

    const add = () =>{
        //Criar postagens
        if(arqfileDoc || arqfileImg || arqfileVid){
            console.log("Aguarde")
            
        }else{
            console.log("Saiu")
            addpost(idUserGroup, text, arqfileDocList, arqfileImgList, arqfileVidList, idUser.id!, idwall )
        }
    }

    const handlePesq = () =>{
        setValuePesq(!valuePesq)
    }


    const handlePost  = async () =>{

            if(arqfileImg.length !== 0){
                arqfileImg.map(async (item)=>{
            
                    const formData = new FormData();
                    if (item) {
                        formData.append('file', item);
                    
                    } else {
                        console.error('imgGrup é nulo. Não é possível anexar ao FormData.');
                        return;
                    }

                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    });
                    
                    if (!response.ok) {
                        console.error('Erro durante a requisição:', response.statusText);
                        return;
                    }
                    
                    try {
                        const data = await response.json();
                        console.log('Valor:', data.url);
                        setArqFileImgList((prevFiles) => [...(prevFiles || []), data.url]);
                    } catch (error) {
                        console.error('Erro ao processar a resposta JSON:', error);
                    }
                    })
        }

        if(arqfileVid.length !== 0){
            arqfileVid.map(async (item)=>{
        
                const formData = new FormData();
                if (item) {
                    formData.append('file', item);
                
                } else {
                    console.error('imgGrup é nulo. Não é possível anexar ao FormData.');
                    return;
                }

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    console.error('Erro durante a requisição:', response.statusText);
                    return;
                }
                
                try {
                    const data = await response.json();
                    console.log('Valor:', data.url);
                    setArqFileVidList((prevFiles) => [...(prevFiles || []), data.url]);
                } catch (error) {
                    console.error('Erro ao processar a resposta JSON:', error);
                }
                })
        }

        if(arqfileDoc.length !== 0){
            arqfileDoc.map(async (item)=>{
        
                const formData = new FormData();
                if (item) {
                    formData.append('file', item);
                
                } else {
                    console.error('imgGrup é nulo. Não é possível anexar ao FormData.');
                    return;
                }

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    console.error('Erro durante a requisição:', response.statusText);
                    return;
                }
                
                try {
                    const data = await response.json();
                    console.log('Valor:', data.url);
                    setArqFileDocList((prevFiles) => [...(prevFiles || []), data.url]);
                } catch (error) {
                    console.error('Erro ao processar a resposta JSON:', error);
                }
                })
        }
        console.log("Antes de add")

        add()

    }


    return(
        <main className="all-PubliPost">
            <form className="formpost" onSubmit={(e) => {e.preventDefault()}}>
            {(valuePesq)?(

                <div className="forPesq">
                    <input type="text" className="pesq" placeholder="Pesquisa" id="enter" onClick={changeLupa} onBlur={changeLupaBlur}/>
                    {(uplupa)?(
                        <Image
                        src={lupa}
                        alt="Logo-pesq"
                        className="img-pesq"
                        id="lupa"
                        width={20}
                    />
                    ):(
                        <p></p>
                    )}
                </div>

            ):(
                <>
                    <div className="forPost">
                <textarea name="post" id="post" className="post-cre" onChange={handleChanges.handleText}>
                </textarea>
                <div className="funcPost">
            <ClickImage onImageSelect={handleImageSelect} img={arq} id='came_arq'/>
                    <div>
                        <button className="butt-post" onClick={()=>{
                            setText("")
                            setArqFileVid([])
                            setArqFileImg([])
                            setArqFileDoc([])
                        }}>Cancelar</button>
                        <button className="butt-post" onClick={()=>{setSee(!see)}}>Visualizar</button>
                        <button className="butt-post" onClick={handlePost}>Publicar</button>
                    </div>
                </div>
                 
            </div> 
            <div className="exe-Post">
            {(see == true)?(<Posts name={name || "Usuário teste"} img={img} text={text} doc={arqfileDoc} imgPost={arqfileImg} video={arqfileVid} />):(<p></p>)}
            </div>
                </>

            )}
            
            </form>

            {(postPubli === true || idUser?.isAdmin == true)?(

                <div className="clickPost">
                <Image
                src={buttonPost}
                alt="Botão para mudar forma de barra"
                className="changePost"
                id="changePost"
                width={400}
                height={400}
                onClick={handlePesq}
                />
                </div>

            ):null}

        </main>
    )
}

export default CreatePost