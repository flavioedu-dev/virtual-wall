"use client"
import Image, { StaticImageData } from "next/image";
import perfil from "public/perfil.png"
import "./showPost.css"
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

interface ShowPostProps{
    name: string;
    img: string;
    funct?: (nameWall:string) => void
    text: string;
    doc?: string[];
    imgPost?: string[];
    video?: string[];
}

const ShowPosts= ({name, img, funct, text, doc, imgPost, video}: ShowPostProps) => {
    
    const handleWall = () =>{
        if(funct){
         funct(name)
        }
    }

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
      ).toString();

        console.log(imgPost)

      if(Array.isArray(doc) || Array.isArray(video) || Array.isArray(imgPost)){
        console.log("Um deles são")
      }

    return(
        <main className='allshowPost'>
            <div className='postshow' onClick={handleWall}>
                <div className="elem-edit-show">
                    <Image
                        src={img || perfil}
                        alt="example"
                        className="img_example-showPost"
                        width={400}
                        height={400}
                    />
                    <div className='infor-text-p'>
                        <h2>{name}</h2>
                        <p>{"@" + name.toLowerCase()}</p>
                        <br />
                        <p className="textshow">{text}</p>
                    </div>
                </div>

                {(imgPost?.length !== 0)?(

                    <div className="midiashow">
                        {imgPost !== undefined && doc !== null ? (
                            <Image
                            src={imgPost[0]}
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
                        {(video?.length !== 0 && video)?(
                            <div className="midiashowvideo">
                                {doc !== undefined && doc !== null? (
                                    <video src={video[0]} className="video-showPost" controls></video>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        ):(
                            <div className="midiashow">
                                {doc !== undefined && doc !== null ? (
                                    <Document file={doc[0]}>
                                        <Page pageNumber={1} scale={1.0} height={100} />
                                    </Document>
                                ) : (
                                    <p></p>
                                ) }
                            </div>
                        )}
                    </>
                )}

            </div>

        </main>

            )

        }

export default ShowPosts