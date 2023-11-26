"use client"
import Image, { StaticImageData } from "next/image";
import perfil from "public/perfil.png"
import "./Posts.css"
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

interface ShowPostProps{
    name: string;
    img: string;
    funct?: (nameWall:string) => void
    text: string;
    doc?: File[]|null|string;
    imgPost?: File[]|null|string;
    video?: File[]|null|string;
}

const Posts= ({name, img, funct, text, doc, imgPost, video}: ShowPostProps) => {
    
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
        <main className='allPost'>
            <div className='post' onClick={handleWall}>
                <div className="elem-edit">
                    <Image
                        src={img || perfil}
                        alt="example"
                        className="img_example-Post"
                        width={400}
                        height={400}
                    />
                    <div className='infor-text-p'>
                        <h2>{name}</h2>
                        <p>{"@" + name.toLowerCase()}</p>
                        <br />
                        <p className="text">{text}</p>
                    </div>
                </div>
                {/*Document..................... */}
                    
                {Array.isArray(doc) ? (
                    doc.map((item, index) => (
                        <div key={index} className="midia">
                            {item !== undefined && item !== null && typeof item === 'string' ? (
                                <Document file={item}>
                                    <Page pageNumber={1} scale={1.0} height={100} />
                                </Document>
                            ) : item !== undefined && item !== null ? (
                                <Document file={URL.createObjectURL(item)}>
                                    <Page pageNumber={1} scale={1.0} height={100} />
                                </Document>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div className="midia">
                        {doc !== undefined && doc !== null && typeof doc === 'string' ? (
                            <Document file={doc}>
                                <Page pageNumber={1} scale={1.0} height={100} />
                            </Document>
                        ) : doc !== undefined && doc !== null ? (
                            <p></p>
                        ) : null}
                    </div>
                )}

                {/*Image..................... */}
                {Array.isArray(imgPost) ? (
                    imgPost.map((item, index) => (
                        <div key={index} className="midia">
                            {item !== undefined && item !== null && typeof item === 'string' ? (
                                <Image
                                src={item}
                                alt="Logo-pesq"
                                className="document-Post"
                                id="img"
                                width={20}
                                height={20}
                            />
                            ) : item !== undefined && item !== null ? (
                                <Image
                                src={URL.createObjectURL(item)}
                                alt="Logo-pesq"
                                className="document-Post"
                                id="img"
                                width={20}
                                height={20}
                            />
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div className="midia">
                        {img !== undefined && doc !== null && typeof imgPost === 'string' ? (
                            <Image
                            src={imgPost}
                            alt="Logo-pesq"
                            className="document-Post"
                            id="img"
                            width={20}
                            height={20}
                        />
                        ) : doc !== undefined && doc !== null ? (
                            <p></p>
                        ) : null}
                    </div>
                )}
                
            {/*video..................... */}
            <div className="midia">

            {Array.isArray(video) ? (
                    video.map((item, index) => (
                        <div key={index} className="midia">
                            {item !== undefined && item !== null && typeof item === 'string' ? (
                                <video src={item} className="document-Post" controls></video>
                            ) : item !== undefined && item !== null ? (
                                <video src={URL.createObjectURL(item)} className="document-Post" controls></video>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div className="midia">
                        {doc !== undefined && doc !== null && typeof video === 'string' ? (
                            <video src={video} className="document-Post" controls></video>
                        ) : doc !== undefined && doc !== null ? (
                            <p></p>
                        ) : null}
                    </div>
                )}
                
            </div>
            </div>
            

        </main>

            )

        }

export default Posts