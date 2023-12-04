'use client'
import { UserProvider } from "@/context/VirtualContext"

export const Provider = ({children}:{children: React.ReactNode}) => {
    return(
        <>
            {/* <VirtualProvider>
                {children}
            </VirtualProvider>  */}
            <UserProvider>
                {children}
            </UserProvider>
        </>
    )
}