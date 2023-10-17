'use client'
import { VirtualProvider } from "@/context/VirtualContext"

export const Provider = ({children}:{children: React.ReactNode}) => {
    return(
        <>
            <VirtualProvider>
                {children}
            </VirtualProvider> 
        </>
    )
}