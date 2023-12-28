"use client"

import { group, posts, user } from "@/context/VirtualContext"
import perfil from "public/perfil.png";
import "./SeePost.css"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useInforGroups } from "@/hooks/useInforGroups";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { isGeneratorFunction } from "util/types";
import Link from "next/link";

interface seepost {
    post: posts;
}

const SeePost = ({post}:seepost) => {

    const dataUser = useLogin()
    const dataGroup = useInforGroups()
    const [usePost, setUsePost] = useState<user>()
    const [useGroup, setUseGroup] = useState<group>()
    const [vide, setVide] = useState<string[]>([]);
    const [image, setImage] = useState<string[]>([]);
    const [docum, setDocum] = useState<string[]>([]);
    const moment = require('moment');
    const [dataPost, setDataPost] = useState("")

    useEffect(()=>{

        if(dataUser.data.length !== 0){
            const use = dataUser.data.find((value)=>value.id === post.memberId)
            setUsePost(use)
            if(usePost?.isAdmin === true && use && use !== undefined){
                if(dataGroup.data.length !== 0){
                    const group = dataGroup.data.find((value)=> value.userId == use?.id)
                    setUseGroup(group)
                }
            }
        }

        if (post?.media) {
            const newImages: string[] = [];
            const newVideos: string[] = [];
            const newDocuments: string[] = [];
        
            for (let i = 0; i < post.media.length; i += 2) {
              const mediaType = post.media[i];
              const mediaValue = post.media[i + 1];
        
              if (mediaType === "img" && !newImages.includes(mediaValue)) {
                newImages.push(mediaValue);
              } else if (mediaType === "video" && !newVideos.includes(mediaValue)) {
                newVideos.push(mediaValue);
              } else if (mediaType === "doc" && !newDocuments.includes(mediaValue)) {
                newDocuments.push(mediaValue);
              }
            }
        
            setImage(newImages);
            setVide(newVideos);
            setDocum(newDocuments);
          }

          if(image.length !== 0){
            console.log(image)
          }
          if(vide.length !== 0){
            console.log(vide)
          }
          if(docum.length !== 0){
            console.log(docum)
          }

        if(post?.created_at){
            const value = formatarData(post?.created_at)
            setDataPost(value)
        }
        
    },[dataGroup.data, dataUser.data])

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
      ).toString();

      const formatarData = (data: string) => {
        const agora = moment();
        const dataRecebida = moment(data);
      
        const diffHoras = agora.diff(dataRecebida, 'hours');
        const diffDias = agora.diff(dataRecebida, 'days');
        const diffSemanas = agora.diff(dataRecebida, 'weeks');
        const diffMeses = agora.diff(dataRecebida, 'months');
        const diffAnos = agora.diff(dataRecebida, 'years');
      
        if (diffHoras < 24) {
          return `${diffHoras} h`;
        } else if (diffDias < 7) {
          return `${diffDias} dias e (${diffSemanas} semanas)`;
        } else if (diffMeses < 1) {
          return `${diffDias} dias`;
        } else if (diffAnos < 1) {
          return `${diffDias} dias e (${diffMeses} meses)`;
        } else {
          return `${diffDias} dias e (${diffAnos} anos)`;
        }
      }
    
    return (
        <main className="all-seepost">
            <section className="seepost">
                <section className="seepost-infor">
                    <div className="infor-Post-Use">
                    {(usePost?.isAdmin == true)?(
                        <>
                        
                        <Image
                        src={useGroup?.imgGroup!}
                        alt="example"
                        className="img-use-post"
                        width={50}
                        height={50}
                        unoptimized
                        />

                        <strong><p>{useGroup?.name!}</p></strong>

                        </>
                        
                    ):(
                        <>
                            <Image
                            src={usePost?.profile_image || perfil.src}
                            alt="example"
                            className="img-use-post"
                            width={50}
                            height={50}
                            unoptimized
                            />
                            <strong><p>{usePost?.name}</p></strong>
                        </>
                    )}
                    </div>

                    <p className="date">{dataPost!}</p>
                    
                </section>
                <section className="post-media">
                        <p className="text-post">{post?.content}</p>
                        <div className="media-container">
                           <div className="image-container">
                           {(image.length !== 0) ? (
                                image.map((item) => (
                                    <>
                                        <Link href={item}>
                                        <Image
                                        key={item}
                                        src={item}
                                        alt="example"
                                        className="img-Post"
                                        width={300}
                                        height={300}
                                        priority
                                    />
                                        </Link>
                                    </>
                                ))
                            ) : null}
                           </div>
                            <div className="video-container">
                            {(vide.length !== 0) ? (
                                vide.map((item) => (
                                    <video key={item} src={item} className="video-post" controls></video>
                                ))
                            ) : null}
                            </div>
                            <div className="doc-container">
                            {(docum.length !== 0) ? (
                                docum.map((item) => (
                                    <>
                                        <Link href={item}>
                                            <Document key={item} file={item}>
                                                <Page pageNumber={1} scale={1.0} height={300} />
                                            </Document>
                                        </Link>
                                    </>
                                ))
                            ) : null}
                            </div>
                        </div>
                </section>  
            </section>
        </main>
    )

}

export default SeePost

