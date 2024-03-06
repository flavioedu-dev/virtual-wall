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
import { useInforMembers } from "@/hooks/useInforMember";
import { useInforMural } from "@/hooks/useInforMural";


interface ShowPostProps{
    name: string;
    img: string;
    idwall: number;
    idUser: user;
    idmember: string;
    functionTrue?: (value: boolean) => void;
}

const CreatePost = ({name, img, idwall, idUser, idmember, functionTrue}:ShowPostProps) =>{

    const [arqfileImg, setArqFileImg] = useState<File[]>([])
    const [arqfileDoc, setArqFileDoc] = useState<File[]>([])
    const [arqfileVid, setArqFileVid] = useState<File[]>([])
    const [text, setText] = useState("")
    const [see, setSee] = useState(false)
    const dataMember = useInforMembers({load:true})
    const dataMural = useInforMural({load:true})

    //list arq
    const [arqfileImgList, setArqFileImgList] = useState<string[]>([])
    const [arqfileDocList, setArqFileDocList] = useState<string[]>([])
    const [arqfileVidList, setArqFileVidList] = useState<string[]>([])

    //User verification
    const [postPubli, setPostPubli] = useState(false)

    //rotas
    const router = useRouter()

    useEffect(()=>{
        
        if(idmember && dataMember.data.length !== 0){
            const listMember = []
            //const memb = dataMember.data.find((value)=> value.id == idmember)
            for (let i = 0; i < dataMember.data.length; i++){
                
                if(dataMember.data[i].userId == idmember){
                    listMember.push(dataMember.data[i])
                }
            }
            const mural = dataMural.data.find((value)=> value.id == idwall)
            
            for (let j = 0; listMember.length > j; j++){
                if(listMember[j].category == mural?.category){
                    setPostPubli(true)
                }
            }

        }


        //Teste
        if(arqfileDoc || arqfileImg || arqfileVid){
            
            if(arqfileDoc.length !== 0 && arqfileImg.length !== 0){
                
                if(arqfileDocList.length == arqfileDoc.length && arqfileImgList.length == arqfileImg.length){
                    addpost(idUser?.id!, text, arqfileDocList, arqfileImgList, arqfileVidList,idwall)
                }
            }else if(arqfileDoc.length !== 0 && arqfileVid.length !== 0){
                
                if(arqfileDocList.length == arqfileDoc.length && arqfileVidList.length == arqfileVid.length){
                    addpost(idUser?.id!, text, arqfileDocList, arqfileImgList, arqfileVidList,idwall)
                    
                }

            }else if(arqfileImg.length !== 0 && arqfileVid.length !== 0){
               
                if(arqfileImgList.length == arqfileImg.length && arqfileVidList.length == arqfileVid.length){
                    addpost(idUser?.id!, text, arqfileDocList, arqfileImgList, arqfileVidList,idwall)
                    
                    
                }
            }else if(arqfileImg.length !== 0 && arqfileVid.length !== 0 && arqfileVid.length !== 0){
                
                if(arqfileDocList.length == arqfileDoc.length && arqfileImgList.length == arqfileImg.length && arqfileVidList.length == arqfileVid.length){
                    addpost(idUser?.id!, text, arqfileDocList, arqfileImgList, arqfileVidList,idwall)
                    
                }
            }else{
                
                if(arqfileDoc.length !== 0){
                    if(arqfileDocList.length == arqfileDoc.length){
                    addpost(idUser?.id!, text, arqfileDocList, arqfileImgList, arqfileVidList,idwall)
                        
                }
                }else if(arqfileImg.length !== 0){
                    if(arqfileImgList.length == arqfileImg.length){
                    addpost(idUser?.id!, text, arqfileDocList, arqfileImgList, arqfileVidList,idwall)
                        
                        }
                }else if(arqfileVid.length !==0){
                    if(arqfileVidList.length == arqfileVid.length){
                    addpost(idUser?.id!, text, arqfileDocList, arqfileImgList, arqfileVidList,idwall)
                        
                        }
                }
            }
        }
        
        
    },[arqfileDocList, arqfileImgList, arqfileVidList, arqfileDoc, arqfileImg, arqfileVid, dataMember.data, dataMural.data])

    //Pesq
    const [valuePesq, setValuePesq] = useState(true)

    //Lupa
    const [uplupa, setUpLupa] = useState(true)

    //addPost
    const addpost = async (idUser:string, text:string, doc:string[], image:string[], video:string[],  idwall:number) => {

        const media: any[] = []

        for(let i = 0; i < image.length; i++){
            media.push("img")
            media.push(image[i])
        }
        for(let j = 0; j < video.length; j++){
            media.push("video")
            media.push(video[j])
        }
        for(let k = 0; k < doc.length; k++){
            media.push("doc")
            media.push(doc[k])
        }
        

        try {
          const response = await fetch('https://projeto-web-full-stack-pm-devs-production-727d.up.railway.app/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: 1,
              media,
              muralId: idwall,
              memberId: idUser,
              content: text
            }),
          });
      
          if (response.ok) {
            const newWall = await response.json();
            if(functionTrue){
                functionTrue(true)
            }
            
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
      };

    const handleChanges = {
        handleText: (e: ChangeEvent<HTMLTextAreaElement>) => {
          setText(e.currentTarget.value);
        },
    }

    const inputEle = document.getElementById('enter')
    inputEle?.addEventListener("keydown", function (event){
        if (event.key === "Enter") {
            
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
        if(arqfileDoc.length !== 0 || arqfileImg.length !== 0 || arqfileVid.length !== 0){
           
            
        }else{
            
            addpost(idUser?.id!, text, arqfileDocList, arqfileImgList, arqfileVidList,idwall)
            
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
                   
                    setArqFileDocList((prevFiles) => [...(prevFiles || []), data.url]);
                } catch (error) {
                    console.error('Erro ao processar a resposta JSON:', error);
                }
                })
        }

        add()

    }


    return(
        <main className="all-PubliPost">
            <form className="formpost" onSubmit={(e) => {e.preventDefault()}}>
            {(valuePesq)?(

                <div className="forPesq">
                    <input type="text" className="pesq" placeholder="Pesquisa" id="enter" onClick={changeLupa} onBlur={changeLupaBlur}/>
                    {/* {(uplupa)?(
                        <Image
                        src={lupa}
                        alt="Logo-pesq"
                        className="img-pesq"
                        id="lupa"
                        width={20}
                    />
                    ):(
                        <p></p>
                    )} */}
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
            {(see == true)?(
                <>
                    <Posts name={name || "Usuário teste"} img={img} text={text} doc={arqfileDoc} imgPost={arqfileImg} video={arqfileVid} />
                </>
            ):null}
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