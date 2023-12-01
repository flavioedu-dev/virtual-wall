"use client"
import Image from "next/image";
import perfil from "public/perfil.png";
import pointe from "public/cardapio.png";
import "./showPost.css";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useEffect, useState } from "react";
import SeePost from "../SeePost/SeePost";
import { useInforPost } from "@/hooks/useInforPost";
import { posts } from "@/context/VirtualContext";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface ShowPostProps {
    name: string;
    img: string;
    funct?: (id: string) => void;
    text: string;
    media?: string[];
    id: string;
    onDelete?:(postId: string) => void 
}

const ShowPosts= ({name, img, funct, text, media, id, onDelete}: ShowPostProps) => {
    
    const [exclu, setExclu] = useState(false);
    const [vide, setVide] = useState<string[]>([]);
    const [image, setImage] = useState<string[]>([]);
    const [docum, setDocum] = useState<string[]>([]);
    const [excluOption, setExcluOption] = useState(false)
    const [seePost, setSeePost] = useState(false)
    const [post, setPost] = useState<posts>()
    const dataPost = useInforPost()

    const handleExclu = () => {
        setExclu(!exclu);
    };

    const handleFunct = () => {
        if(funct){
            funct(id)
        }
    }


    useEffect(() => {
        
        if(media ){

            for(let i = 0; i < media.length; i++){
                if(media[i] == "img"){
                    setImage(prevList => [...prevList, media[i+1]])
                }else if(media[i] == "video"){
                    setVide(prevList => [...prevList, media[i+1]])
                }else if(media[i] == "doc"){
                    setDocum(prevList => [...prevList, media[i+1]])
                }
            }
        }

        // if(id && dataPost.data.length !== 0){
        //     const postFound = dataPost.data.find((value)=> value.id == id)
        //     if(postFound !== undefined && postFound){
        //         setPost(postFound)
        //     }
        // }

        

    }, [dataPost.data, id, media]);

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
      ).toString();

       

      const excluPost = async () => {

        try {
            const response = await fetch('https://projeto-web-full-stack-pm-devs-production.up.railway.app/posts/'+id, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                
              }),
            });
        
            if (response.ok) {
              const newWall = await response.json();
              console.log(newWall)
              if(onDelete){
                console.log("Tem")
                onDelete(id)
              }
             
            } else {
              console.error('Erro ao adicionar wall:', response.status);
            }
          } catch (error) {
            console.error('Erro de rede:', error);
          }
    
      }

    return(
        
        <>

        
        
        <main className='allshowPost'>

            

            <div className='postshow' >

                    {(excluOption)?(
                    <div className='elementExcluP'>
                    <p>Você realmente deseja excluir este post?</p>
                        <button onClick={excluPost}>Sim</button>
                        <button onClick={()=>{
                        setExclu(false)
                        setExcluOption(false)
                        }}>Não</button>
                    </div>
                ):null}

                    {(exclu)?(
                        <div className="exclu" onClick={()=>{setExcluOption(true)}}>
                        <p>Excluir</p>
                        </div>
                    ):null}
                    <Image
                        src={pointe}
                        alt="example"
                        className="img_home"
                        width={20}
                        height={20}
                        onClick={handleExclu}
                    />

                    

                <div className="elem-edit-show" onClick={handleFunct}>
                    <Image
                        src={img || perfil}
                        alt="example"
                        className="img_example-showPost"
                        width={400}
                        height={400}
                    />
                    <div className='infor-text-p'>
                        <h2>{name}</h2>
                        <p>{"@" + name?.toLowerCase()}</p>
                        <br />
                        <p className="textshow">{text}</p>
                    </div>
                    
                </div>


                {(image?.length !== 0)?(

                    <div className="midiashow" onClick={handleFunct}>
                        {image !== undefined && image!== null ? (
                            <Image
                            src={image[0]}
                            alt="Logo-pesq"
                            className="document-showPost"
                            id="img"
                            width={600}
                            height={600}
                        />
                        ) : (
                            <p></p>
                        ) }
                    </div>
                    
                ):(
                    <>
                        {(vide?.length !== 0 && vide)?(
                            <div className="midiashowvideo" onClick={handleFunct}>
                                {vide !== undefined && vide !== null? (
                                    <video src={vide[0]} className="video-showPost" controls></video>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        ):(
                            <>
                            
                            {(docum?.length !== 0)?(
                                <div className="document-showPost-pdf" onClick={handleFunct}>
                                {docum !== undefined && docum !== null ? (
                                    <Document file={docum[0]}>
                                        <Page pageNumber={1} scale={1.0} height={100} />
                                    </Document>
                                ) : (
                                    <p></p>
                                ) }
                                </div>
                            ):(
                                <p></p>
                            )}

                            </>
                        )}
                    </>
                )}

                

            </div>

        </main>

        </>

            )

        }

export default ShowPosts